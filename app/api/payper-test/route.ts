import { NextResponse } from "next/server";

const API_KEY  = process.env.PAYPER_API_KEY ?? "";
const API_USER = process.env.PAYPER_ACCOUNT ?? "";
const CATEGORY = "מכשירי אידוי Xvape";

export async function GET() {
  try {
    const items = [];
    let page = 1;
    let totalPages = 1;

    do {
      const res = await fetch("https://app.payper.co.il/api/get_inventories", {
        method: "POST",
        headers: { "Content-Type": "application/json", "API_KEY": API_KEY },
        body: JSON.stringify({ api_user: API_USER, page }),
        cache: "no-store",
      });
      const data = await res.json();
      totalPages = data.total_pages ?? 1;
      const filtered = (data.inventories ?? []).filter(
        (item: { category_name?: string }) => item.category_name === CATEGORY
      );
      items.push(...filtered);
      page++;
    } while (page <= totalPages);

    return NextResponse.json({ total: items.length, items });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
