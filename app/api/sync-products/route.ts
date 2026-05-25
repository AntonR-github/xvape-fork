import { NextResponse } from "next/server";

const PAYPER_API_KEY  = process.env.PAYPER_API_KEY ?? "";
const PAYPER_API_USER = process.env.PAYPER_ACCOUNT ?? "";
const MEDUSA_URL      = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "";

const XVAPE_CATEGORY  = "מכשירי אידוי Xvape";

interface PayperItem {
  item_id: number;
  catalog_item_id: string;
  name: string;
  quantity: string;
  is_active: boolean;
  is_package: boolean;
  category_name: string;
}

async function fetchPayperXvapeProducts(): Promise<PayperItem[]> {
  const items: PayperItem[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const res = await fetch("https://app.payper.co.il/api/get_inventories", {
      method: "POST",
      headers: { "Content-Type": "application/json", "API_KEY": PAYPER_API_KEY },
      body: JSON.stringify({ api_user: PAYPER_API_USER, page }),
      cache: "no-store",
    });
    const data = await res.json();
    totalPages = data.total_pages ?? 1;
    const filtered = (data.inventories ?? []).filter(
      (i: PayperItem) => i.category_name === XVAPE_CATEGORY
    );
    items.push(...filtered);
    page++;
  } while (page <= totalPages);

  return items;
}

const MEDUSA_API_KEY = process.env.MEDUSA_ADMIN_API_KEY ?? "";

async function medusaAdminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${MEDUSA_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${MEDUSA_API_KEY}`,
      ...(options.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Medusa ${res.status} ${path}: ${text}`);
  }
  return res.json();
}

export async function GET() {
  // Step 1: test Medusa auth
  try {
    const test = await medusaAdminFetch<{ products: unknown[] }>("/admin/products?limit=1");
    const payperItems = await fetchPayperXvapeProducts();

    const created: string[] = [];
    const errors: string[] = [];

    // Get existing products to check for duplicates
    const existing = await medusaAdminFetch<{ products: { id: string; metadata: Record<string, unknown> | null }[] }>(
      "/admin/products?limit=500&fields=id,metadata"
    );

    const medusaBySku = new Map<string, string>();
    for (const p of existing.products) {
      const sku = p.metadata?.payper_sku as string | undefined;
      if (sku) medusaBySku.set(sku, p.id);
    }

    for (const item of payperItems) {
      const sku = item.catalog_item_id;
      const existingId = medusaBySku.get(sku);

      try {
        if (existingId) {
          await medusaAdminFetch(`/admin/products/${existingId}`, {
            method: "POST",
            body: JSON.stringify({
              status: item.is_active ? "published" : "draft",
              metadata: { payper_sku: sku, payper_stock: parseFloat(item.quantity) },
            }),
          });
        } else {
          await medusaAdminFetch("/admin/products", {
            method: "POST",
            body: JSON.stringify({
              title: item.name,
              status: item.is_active ? "published" : "draft",
              metadata: { payper_sku: sku, payper_stock: parseFloat(item.quantity) },
              variants: [{ title: "Default", sku, manage_inventory: true, prices: [] }],
            }),
          });
          created.push(item.name);
        }
      } catch (e) {
        errors.push(`${item.name}: ${String(e)}`);
      }
    }

    return NextResponse.json({
      medusa_auth: "ok",
      medusa_existing_products: test.products.length,
      payper_xvape_items: payperItems.length,
      created: created.length,
      created_products: created,
      errors,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
