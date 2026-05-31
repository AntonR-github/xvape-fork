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
    <div className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 animate-toast-enter transform -translate-y-1/2">
      <div className="relative overflow-hidden rounded-3xl px-8 py-5 backdrop-blur-xl bg-black/80 border border-white/10 shadow-2xl min-w-[360px] max-w-[90vw]">
        {/* Gold accent border */}
        <div className="absolute inset-0 rounded-3xl border border-transparent" 
             style={{ background: 'linear-gradient(#121212, #121212) padding-box, var(--color-accent-gradient) border-box' }} />
        
        <div className="relative flex items-center gap-5">
          {/* Gold checkmark badge */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6" style={{ color: 'var(--color-gold)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          
          <div className="flex flex-col">
            <span className="text-base font-light" style={{ color: 'var(--color-accent)' }}>
              נוסף בהצלחה
            </span>
            <span className="text-lg font-medium text-white">
              {toastMessage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}