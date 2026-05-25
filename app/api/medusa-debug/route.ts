import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "";
const PUB_KEY  = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? "";

async function fetchProducts(regionId: string, fields: string) {
  const res = await fetch(
    `${BASE_URL}/store/products?limit=1&region_id=${regionId}&${fields}`,
    { headers: { "x-publishable-api-key": PUB_KEY }, cache: "no-store" }
  );
  const data = await res.json();
  const variant = data.products?.[0]?.variants?.[0];
  return { calculated_price: variant?.calculated_price ?? null, variant_id: variant?.id ?? null };
}

export async function GET() {
  const regRes = await fetch(`${BASE_URL}/store/regions`, {
    headers: { "x-publishable-api-key": PUB_KEY },
    cache: "no-store",
  });
  const regData = await regRes.json();
  const ilsRegion = regData.regions?.find((r: { currency_code: string }) => r.currency_code === "ils");
  const regionId  = ilsRegion?.id ?? regData.regions?.[0]?.id;

  const [a, b, c, d] = await Promise.all([
    fetchProducts(regionId, "fields=*variants.calculated_price"),
    fetchProducts(regionId, "fields=+variants.calculated_price"),
    fetchProducts(regionId, "fields=*variants,*variants.calculated_price"),
    fetchProducts(regionId, "expand=variants"),
  ]);

  return NextResponse.json({
    region_used: regionId,
    ils_region: ilsRegion ?? null,
    "fields=*variants.calculated_price": a,
    "fields=+variants.calculated_price": b,
    "fields=*variants,*variants.calculated_price": c,
    "expand=variants": d,
  });
}
