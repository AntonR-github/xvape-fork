"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { StoreProduct as Product } from "../../lib/medusa";
import { useCart } from "../../context/CartContext";

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
  );
}

const FALLBACK_IMG = "/assets/img/product-test-img.jpeg";

export default function ProductDetail({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const { addItem } = useCart();
  const router = useRouter();

  const hasVariants = product.variants.length > 1;
  const activeVariant = product.variants[selectedVariantIdx] ?? { id: product.variantId, title: "", price: product.price };
  const activePrice = activeVariant.price || product.price;
  const activeVariantId = activeVariant.id || product.variantId;

  // Build image list: all product images, or fallback
  const allImages = product.images?.length
    ? product.images
    : product.thumbnail
    ? [product.thumbnail]
    : [FALLBACK_IMG];
  const activeImg = allImages[selectedThumb] ?? FALLBACK_IMG;

  return (
    <section className="py-16 px-6 lg:px-12 bg-white">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Image gallery — first in DOM = right side in RTL ── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div
              className="rounded-3xl overflow-hidden flex items-center justify-center"
              style={{ aspectRatio: "1 / 1", maxHeight: "460px" }}
            >
              <Image
                src={activeImg}
                alt={product.name}
                width={700}
                height={700}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 justify-center">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedThumb(i)}
                    className="rounded-xl border-2 overflow-hidden transition-all"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderColor: selectedThumb === i ? "#c6a87a" : "#e0e0e0",
                      background: "#111111",
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info — second in DOM = left side in RTL ── */}
          <div className="flex flex-col items-start text-start gap-2">

            {/* Badge */}
            <span
              className="text-sm font-semibold text-white px-4 py-1.5 rounded-full"
              style={{ background: "#1a1a1a" }}
            >
              {product.badge}
            </span>

            {/* Name */}
            <h1 className="text-5xl font-regular text-black leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-4xl font-regular text-black">
              ₪{activePrice}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-xl font-regular text-black leading-tight mt-3">
                {product.description}
              </p>
            )}

            {/* Attributes */}
            {product.material && (
              <div className="flex flex-col items-start gap-2 w-full mt-4">
                <span
                  className="inline-flex self-start px-4 py-1.5 rounded-full text-base font-semibold"
                  style={{ background: "#c6a87a", color: "#1a1a1a" }}
                >
                  {product.material}
                </span>
              </div>
            )}

            {/* Variant selector */}
            {hasVariants && (
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-lg font-medium text-black">
                  צבע: {activeVariant.title}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors"
                      style={{
                        borderColor: idx === selectedVariantIdx ? "#c6a87a" : "#d0d0d0",
                        background: idx === selectedVariantIdx ? "#c6a87a" : "transparent",
                        color: idx === selectedVariantIdx ? "#000" : "#555",
                      }}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feature list */}
            <ul className="flex flex-col gap-3 w-full mt-6">
              {product.features.map((f) => (
                <li key={f} className="flex items-center justify-start gap-2 text-xl font-regular text-black tracking-wider">
                   <span style={{ color: "#c6a87a" }}>
                    <CheckIcon />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* Quantity */}
            <div className="flex flex-col items-start gap-2 w-full mt-10 mb-6">
              <span className="text-xl font-regular text-black">כמות:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 rounded-xl border flex items-center justify-center text-lg font-semibold text-black hover:opacity-60 transition-opacity"
                  style={{ borderColor: "#d0d0d0" }}
                >+</button>
                <span
                  className="w-11 h-11 rounded-xl border flex items-center justify-center text-base font-semibold text-black"
                  style={{ borderColor: "#d0d0d0" }}
                >{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 rounded-xl border flex items-center justify-center text-lg font-semibold text-black hover:opacity-60 transition-opacity"
                  style={{ borderColor: "#d0d0d0" }}
                >−</button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col-2 gap-3 items-start w-full">
              <button
                className="px-8 py-4 rounded-full font-regular text-white text-lg tracking-[0.07em] bg-[#1a1a1a] border border-[#1a1a1a] transition-colors hover:bg-white hover:text-black"
                onClick={() => addItem({
                  id: activeVariantId,
                  name: `${product.name}${hasVariants ? ` - ${activeVariant.title}` : ""}`,
                  price: activePrice,
                  variantId: activeVariantId,
                  description: product.description,
                  material: product.material,
                }, qty)}
              >
                הוסף לעגלה — ₪{activePrice * qty}
              </button>
              <button
                className="px-8 py-4 rounded-full font-regular text-lg bg-white border border-[#1a1a1a] text-[#1a1a1a] tracking-[0.07em] transition-colors hover:bg-black hover:text-white"
                onClick={() => {
                  addItem({
                    id: activeVariantId,
                    name: `${product.name}${hasVariants ? ` - ${activeVariant.title}` : ""}`,
                    price: activePrice,
                    variantId: activeVariantId,
                    description: product.description,
                    material: product.material,
                  }, qty);
                  router.push("/checkout");
                }}
              >
                קנה עכשיו
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
