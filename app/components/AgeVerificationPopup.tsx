"use client";

import { useState, useEffect } from "react";

const AGE_VERIFIED_KEY = "xvape_age_verified";

type AgeStatus = "under-18" | "over-18" | null;

export default function AgeVerificationPopup({ children }: { children: React.ReactNode }) {
  const [ageStatus, setAgeStatus] = useState<AgeStatus>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const verified = localStorage.getItem(AGE_VERIFIED_KEY);
    if (verified === "over-18" || verified === "under-18") {
      setAgeStatus(verified);
    }
  }, []);

  const handleVerify = (status: AgeStatus) => {
    if (status) {
      localStorage.setItem(AGE_VERIFIED_KEY, status);
      setAgeStatus(status);
    }
  };

  // Under 18 - redirect away
  if (hasMounted && ageStatus === "under-18") {
    if (typeof window !== "undefined") {
      const referrer = document.referrer;
      if (referrer) {
        window.location.href = referrer;
      } else {
        window.location.href = "https://www.google.com";
      }
    }
    return null;
  }

  // Over 18 - show children
  if (ageStatus === "over-18") {
    return <>{children}</>;
  }

  // Show nothing during hydration
  if (!hasMounted) {
    return null;
  }

  // Show popup for unverified users
  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121212] rounded-2xl p-8 max-w-md w-full border" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <h2 className="text-2xl font-medium text-center mb-6 text-white">
          האם את/ה בן/בת 18 או יותר?
        </h2>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleVerify("over-18")}
            className="w-full px-6 py-4 rounded-full text-3xl font-medium border transition-all duration-200 hover:opacity-85 hover:bg-white/10 cursor-pointer text-center"
            style={{ color: "#c6a87a", borderColor: "#c6a87a" }}
          >
            אני מעל 18
          </button>

          <button
            onClick={() => handleVerify("under-18")}
            className="w-full px-6 py-4 rounded-full text-3xl font-medium transition-all duration-200 hover:opacity-85 hover:scale-105 cursor-pointer text-center"
            style={{ background: "var(--color-accent-gradient)", color: "#1a1a1a" }}
          >
            אני מתחת ל-18
          </button>
        </div>
      </div>
    </div>
  );
}

export function useAgeVerification() {
  return { showProducts: true };
}