export default async function MedusaTestPage() {
  const BASE = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "";
  const KEY  = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? "";
  const headers = { "Content-Type": "application/json", "x-publishable-api-key": KEY };

  const results: Record<string, unknown> = {};

  const regRes = await fetch(`${BASE}/store/regions`, { cache: "no-store", headers });
  const regData = await regRes.json();
  const regionId = regData.regions?.[0]?.id ?? "";

  for (const path of ["/health", "/store/regions", `/store/products?limit=20&region_id=${regionId}&fields=*variants.calculated_price`]) {
    try {
      const res = await fetch(`${BASE}${path}`, { cache: "no-store", headers });
      const text = await res.text();
      try { results[path] = { status: res.status, body: JSON.parse(text) }; }
      catch { results[path] = { status: res.status, body: text }; }
    } catch (e: unknown) {
      results[path] = { error: String(e) };
    }
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "monospace", background: "#111", color: "#eee", minHeight: "100vh" }}>
      <h1>Medusa Connection Test</h1>
      <p>Backend: {BASE}</p>
      <p>Key: {KEY.slice(0, 10)}...</p>
      <pre style={{ fontSize: "13px", whiteSpace: "pre-wrap", marginTop: "1rem" }}>
        {JSON.stringify(results, null, 2)}
      </pre>
    </main>
  );
}
