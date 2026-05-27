"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "../components/ProductCard";

const maxFeatures = Math.max(...products.map((p) => p.features.length));

// Map product IDs to their correct shop URLs
const productUrlMap: Record<string, string> = {
  prod_fog_pro: "/shop/fog-pro",
  prod_roffu: "/shop/xvape-roffu",
  prod_aria: "/shop/aria-plus",
  prod_lanza: "/shop/lanza",
};

// ─── Mobile rows renderer ───────────────────────────────────────────────────

function TableRows({
  displayProducts,
  selectedId,
  colClass,
  onSelect,
}: {
  displayProducts: typeof products;
  selectedId: string;
  colClass: "grid-cols-2" | "grid-cols-4";
  onSelect: (id: string) => void;
}) {
  // Guard: never render with undefined items (defensive against bad state)
  const safeProducts = displayProducts.filter(Boolean);
  if (safeProducts.length === 0) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      {/* Product cards: image + name/price + select */}
      <div className={`grid ${colClass} gap-6`}>
        {safeProducts.map((product, index) => {
          const isSelected = product.id === selectedId;
          return (
            <div
              key={product.id}
              className="flex flex-col border rounded-xl p-4"
              style={{
                borderColor: isSelected
                  ? "#c6a87a"
                  : "rgba(255,255,255,0.07)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Right border for all but last */}
              {index < safeProducts.length - 1 && (
                <div
                  className="absolute top-0 bottom-0 right-0 w-px"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
              )}

              {/* Image */}
              <div className="relative w-full rounded-xl overflow-hidden h-[200px] sm:h-[160px] lg:h-[280px] mx-2 sm:mx-3 mt-2">
                <Image
                  src={product.thumbnail ?? product.images?.[0] ?? "/assets/img/product-test-img.jpeg"}
                  alt={product.name}
                  fill
                  className="object-contain p-1"
                />
              </div>

              {/* Name + price */}
              <div className="px-3 sm:px-4 pt-1 pb-0.5 text-start">
                <span
                  className="font-light text-xl sm:text-2xl lg:text-3xl leading-snug"
                  style={{ color: isSelected ? "#c6a87a" : "#ffffff" }}
                >
                  {product.name}
                </span>

                <span className="block font-light text-4xl sm:text-4xl lg:text-4xl text-white">
                  ₪{product.price}
                </span>
              </div>

              {/* Select button */}
              <div className="px-3 sm:px-12 py-2 mt-auto flex justify-center">
                <button
                  onClick={() => onSelect(product.id)}
                  className="w-full max-w-[120px] sm:max-w-none sm:px-4 lg:px-6 py-1 rounded-full text-lg font-regular border transition-colors"
                  style={
                    isSelected
                      ? {
                        background: "var(--color-gold)",
                        color: "#000000",
                        borderColor: "transparent",
                      }
                      : {
                        background: "transparent",
                        borderColor: "rgba(255,255,255,0.2)",
                        color: "#eeeeee",
                      }
                  }
                >
                  {isSelected ? "✓ נבחר" : "בחר מוצר"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature rows */}
      <div className="mt-8">
        {Array.from({ length: maxFeatures }, (_, fi) => (
          <div
            key={fi}
            className={`grid ${colClass} border-b last:border-b-0`}
            style={{
              borderColor: "rgba(255,255,255,0.05)",
              background: fi % 2 === 0 ? "#0d0d0d" : "#111111",
            }}
          >
            {safeProducts.map((product, index) => {
              const isSelected = product.id === selectedId;
              return (
                <div
                  key={product.id}
                  className="px-3 sm:px-4 py-2 text-center text-xl sm:text-xl relative"
                  style={{
                    borderColor: "rgba(255,255,255,0.05)",
                    color: "#eeeeee",
                    opacity: isSelected ? 1 : 0.6,
                    fontWeight: isSelected ? 400 : 300,
                    background: isSelected ? "rgba(198,168,122,0.04)" : "transparent",
                  }}
                >
                  {/* Right border for all but last */}
                  {index < safeProducts.length - 1 && (
                    <div
                      className="absolute top-0 bottom-0 right-0 w-px"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                  )}
                  {product.features[fi] ?? "—"}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────

// Feature labels for compare table
const featureLabels = [
  "מחיר",
  "שיטת חימום",
  "סוג שימוש",
  "סוללה",
  "תצוגה",
  "אחריות",
];

export default function CompareClient() {
  // ✅ Init from the actual first product instead of a hardcoded id string,
  //    so it can never mismatch what's in the products array.
  const [selectedId, setSelectedId] = useState<string>(products[2]?.id ?? "");
  const [mobileOtherOffset, setMobileOtherOffset] = useState(0);

  // ✅ Safe lookup — falls back to index 0 if id isn't found
  const selectedIndex = useMemo(() => {
    const idx = products.findIndex((p) => p.id === selectedId);
    return idx === -1 ? 0 : idx;
  }, [selectedId]);

  // Products that aren't the selected one
  const otherProducts = useMemo(
    () => products.filter((_, i) => i !== selectedIndex),
    [selectedIndex]
  );

  // ✅ Safe offset — guarded against empty otherProducts
  const safeOffset =
    otherProducts.length > 0 ? mobileOtherOffset % otherProducts.length : 0;

  // ✅ Both slots guaranteed to be defined before building the array
  const selectedProduct = products[selectedIndex];
  const mobileOtherProduct = otherProducts[safeOffset];

  const mobileDisplayProducts = useMemo(() => {
    if (!selectedProduct || !mobileOtherProduct) return products.slice(0, 2);
    return [selectedProduct, mobileOtherProduct];
  }, [selectedProduct, mobileOtherProduct]);

  function handleSelect(id: string) {
    setSelectedId(id);
    setMobileOtherOffset(0);
  }

  function cyclePrev() {
    if (otherProducts.length === 0) return;
    setMobileOtherOffset((o) => (o - 1 + otherProducts.length) % otherProducts.length);
  }
  function cycleNext() {
    if (otherProducts.length === 0) return;
    setMobileOtherOffset((o) => (o + 1) % otherProducts.length);
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="site-container">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="title-h2 mb-4">השוואת דגמים</h1>
          <p className="paragraph">
            השוואה ממוקדת של מאידים מובילים כדי לעזור לך לבחור את המוצר המתאים עבורך
          </p>
        </div>

        {/* ── Mobile: 2-column table + cycle controls ── */}
        <div className="lg:hidden">
          {otherProducts.length > 1 && (
            <>
              {/* Cycle header */}
              <div className="flex items-center justify-center mb-3 px-1">

                <div className="flex gap-2">
                  <button
                    onClick={cycleNext}
                    className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:border-white/30"
                    style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgb(255,255,255)" }}
                    aria-label="דגם הבא"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="text-base flex items-center justify-center text-center" style={{ color: "rgb(255,255,255)" }}>
                    השוואה {safeOffset + 1} מתוך {otherProducts.length}
                  </span>
                  <button
                    onClick={cyclePrev}
                    className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors hover:border-white/30"
                    style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgb(255,255,255)" }}
                    aria-label="דגם קודם"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>

                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-1.5 mb-4">
                {otherProducts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setMobileOtherOffset(i)}
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{ background: i === safeOffset ? "#c6a87a" : "rgba(255,255,255,0.2)" }}
                    aria-label={`דגם ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          <TableRows
            displayProducts={mobileDisplayProducts}
            selectedId={selectedId}
            colClass="grid-cols-2"
            onSelect={handleSelect}
          />
        </div>

        {/* ── Desktop: feature comparison table ── */}
        <div className="hidden lg:block">
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {/* Product cards: image + name/price + select */}
            <div className="grid grid-cols-5 gap-6">
              {/* Empty spacer cell for feature label column */}
              <div></div>
              
              {products.map((product, index) => {
                const isSelected = product.id === selectedId;
                return (
                  <div
                    key={product.id}
                    className="flex flex-col border rounded-xl p-4"
                    style={{
                      borderColor: isSelected
                        ? "#c6a87a"
                        : "rgba(255,255,255,0.07)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Right border for all but last */}
                    {index < products.length - 1 && (
                      <div
                        className="absolute top-0 bottom-0 right-0 w-px"
                        style={{ background: "rgba(255,255,255,0.07)" }}
                      />
                    )}

                    {/* Image */}
                    <div className="relative w-full rounded-xl overflow-hidden h-[280px] mx-2 sm:mx-3 mt-2">
                      <Image
                        src={product.thumbnail ?? product.images?.[0] ?? "/assets/img/product-test-img.jpeg"}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Name + price */}
                    <div className="px-3 sm:px-4 pt-1 pb-0.5 text-start">
                      <span
                        className="font-light text-xl sm:text-2xl lg:text-3xl leading-snug"
                        style={{ color: isSelected ? "#c6a87a" : "#ffffff" }}
                      >
                        {product.name}
                      </span>

                      <span className="block font-light text-4xl sm:text-4xl lg:text-4xl text-white">
                        ₪{product.price}
                      </span>
                    </div>

                    {/* Select button */}
                    <div className="px-3 sm:px-12 py-2 mt-auto flex justify-center">
                      <button
                        onClick={() => handleSelect(product.id)}
                        className="w-full max-w-[120px] sm:max-w-none sm:px-4 lg:px-6 py-1 rounded-full text-lg font-regular border transition-colors"
                        style={
                          isSelected
                            ? {
                              background: "var(--color-gold)",
                              color: "#000000",
                              borderColor: "transparent",
                            }
                            : {
                              background: "transparent",
                              borderColor: "rgba(255,255,255,0.2)",
                              color: "#eeeeee",
                            }
                        }
                      >
                        {isSelected ? "✓ נבחר" : "בחר מוצר"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feature rows with labels - all in one table */}
            <div className="mt-8">
              {/* Features header row */}
              <div
                className="grid grid-cols-5 border-b"
                style={{
                  borderColor: "rgba(255,255,255,0.05)",
                  background: "#0d0d0d",
                }}
              >
                <div className="px-3 sm:px-4 py-2 flex items-center text-xl font-semibold" style={{ color: "#c6a87a" }}>
                  תכונות
                </div>
                {/* Empty cells for the 4 product columns to maintain grid alignment */}
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="py-2"></div>
                ))}
              </div>

              {Array.from({ length: maxFeatures }, (_, fi) => (
                <div
                  key={fi}
                  className="grid grid-cols-5 border-b last:border-b-0"
                  style={{
                    borderColor: "rgba(255,255,255,0.05)",
                    background: fi % 2 === 0 ? "#0d0d0d" : "#111111",
                  }}
                >
                  {/* Feature label - first column */}
                  <div
                    className="px-3 sm:px-4 py-2 text-start text-xl sm:text-xl font-medium relative"
                    style={{
                      borderColor: "rgba(255,255,255,0.05)",
                      color: "#eeeeee",
                    }}
                  >
                    {/* Right border */}
                    <div
                      className="absolute top-0 bottom-0 right-0 w-px"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    />
                    {featureLabels[fi] ?? "—"}
                  </div>

                  {/* Feature values - remaining 4 columns */}
                  {products.map((product, index) => {
                    const isSelected = product.id === selectedId;
                    return (
                      <div
                        key={product.id}
                        className="px-3 sm:px-4 py-2 text-center text-xl sm:text-xl relative"
                        style={{
                          borderColor: "rgba(255,255,255,0.05)",
                          color: "#eeeeee",
                          opacity: isSelected ? 1 : 0.6,
                          fontWeight: isSelected ? 400 : 300,
                          background: isSelected ? "rgba(198,168,122,0.04)" : "transparent",
                        }}
                      >
                        {/* Right border for all but last */}
                        {index < products.length - 1 && (
                          <div
                            className="absolute top-0 bottom-0 right-0 w-px"
                            style={{ background: "rgba(255,255,255,0.05)" }}
                          />
                        )}
                        {product.features[fi] ?? "—"}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <Link
            href={productUrlMap[selectedId] || "/shop"}
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold transition-opacity hover:opacity-85 text-black"
            style={{ background: "#c6a87a" }}
          >
            עבור לדף המוצר הנבחר
          </Link>
        </div>

      </div>
    </section>
  );
}