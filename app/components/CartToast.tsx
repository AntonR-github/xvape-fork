"use client";

import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function CartToast() {
  const { showToast, toastMessage, hideToast } = useCart();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast, hideToast]);

  if (!showToast) return null;

  return (
    <div className="fixed bottom-20 left-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
      {toastMessage}
    </div>
  );
}