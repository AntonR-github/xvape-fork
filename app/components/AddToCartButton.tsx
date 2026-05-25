"use client";

import { useCart } from "../context/CartContext";

interface Props {
  id: string;
  name: string;
  price: number;
  variantId: string;
  image?: string;
}

export default function AddToCartButton({ id, name, price, variantId, image }: Props) {
  const { addItem } = useCart();

  return (
    <button
      className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 transition-opacity hover:opacity-80"
      style={{ background: "#1a1a1a" }}
      aria-label={`הוסף ${name} לעגלה`}
      onClick={(e) => {
        e.preventDefault();
        addItem({ id, name, price, variantId, image });
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  );
}
