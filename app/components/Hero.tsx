import Link from "next/link";
import Image from "next/image";

function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-black overflow-hidden">
        <div className="site-container px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] items-start mt-10">
            {/* Text */}
            <div className="order-2 lg:order-1 flex flex-col items-start text-start justify-start pt-4 pb-10 lg:pt-2 lg:pb-24">
              <h1 className="title-h1 mb-5 text-4xl sm:text-5xl lg:text-[clamp(2.25rem,6vw,4.5rem)]">
                הפתרון המתקדם
                <br />
                לבערה הישירה
              </h1>
              <p className="mb-10 max-w-none lg:whitespace-nowrap subtitle">
                טכנולוגיית אידוי חכמה שמוציאה יותר בכל שאיפה
              </p>
              <div className="flex items-center gap-3 flex-nowrap justify-start w-full">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 px-5 py-3 sm:px-8 sm:py-4 rounded-full font-regular text-black text-base sm:text-xl transition-opacity hover:opacity-85"
                  style={{ background: "var(--color-accent-gradient)" }}
                >
                  כנס לחנות
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center px-5 py-3 sm:px-8 sm:py-4 rounded-full font-regular text-base sm:text-xl transition-opacity hover:opacity-85"
                  style={{
                    border: "2px solid transparent",
                    background:
                      "linear-gradient(#000, #000) padding-box, var(--color-accent-gradient) border-box",
                  }}
                >
                  <span
                    style={{
                      background: "var(--color-accent-gradient)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    השוואת מודלים
                  </span>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 relative flex items-end justify-center overflow-hidden">
              <Sparkle className="absolute top-20 end-8 w-5 h-5 text-white opacity-60" />
              <Sparkle className="absolute top-1/3 start-6 w-3.5 h-3.5 text-white opacity-35" />
              <Sparkle className="absolute bottom-1/3 end-16 w-2.5 h-2.5 text-white opacity-25" />
              <Sparkle className="absolute bottom-16 start-1/3 w-4 h-4 text-white opacity-40" />

              <Image
                src="/assets/img/hprod.jpg"
                alt="מכשיר וייפינג"
                width={800}
                height={1000}
                className="relative z-10 drop-shadow-2xl object-contain object-bottom product-image
                  w-[70vw]      max-h-[80vw]
                  sm:w-[55vw]   sm:max-h-[65vw]
                  md:w-[45vw]   md:max-h-[55vw]
                  lg:w-[420px]  lg:max-h-[72vh]
                  xl:w-[500px]  xl:max-h-[78vh]
                  2xl:w-[580px] 2xl:max-h-[84vh]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech section ── */}
      <section
        className="py-10 mb-16"
      >
        <div className="site-container  px-6 lg:px-12">
          <h2 className="title-h2 sm:text-4xl text-start mb-4">
            הטכנולוגיה שמשנה את הצריכה
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="gradient-border rounded-2xl p-7 flex flex-col items-center text-center">
              <div className="mb-6">
                <Image
                  src="/assets/icn/vape-icon.png"
                  alt="vape icon"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="title-h3 mb-4">מה זה וופרייזר</h3>
              <p className="paragraph mb-4">
                וופוריזר הוא מכשיר שמחמם צמח קנאביס לטמפרטורה מדויקת - מספיק חם
                כדי לשחרר את החומרים הפעילים, אבל לא מספיק כדי לשרוף. התוצאה היא
                אד נקי במקום עשן.
              </p>
            </div>

            {/* Card 2 */}
            <div className="gradient-border rounded-2xl p-7 flex flex-col items-center text-center">
              <div className="mb-6">
                <Image
                  src="/assets/icn/vaping-icon.png"
                  alt="vape icon"
                  width={64}
                  height={64}
                />
              </div>
              <h3 className="title-h3 mb-4">למה לדאות ולא לשרוף?</h3>
              <p className="paragraph mb-4">
                שריפה מגיעה ל-900 מעלות ומשמידה חלק גדול מהחומרים הפעילים -
                ומייצרת עשן בדרך. אידוי עובד בין 170 ל 220- מעלות - משחרר יותר
                פעילים בכל שאיפה, בלי עשן, בלי בערה.
              </p>
            </div>

            {/* Card 3 */}
            <div className="gradient-border rounded-2xl p-7 flex flex-col items-center text-center">
              <div className="mb-6">
                <Image
                  src="/assets/icn/coil-icon.png"
                  alt="vape icon"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="title-h3 mb-4">סוגי אידוי</h3>
              <p className="paragraph mb-4">
                הולכת חום - המכשיר מחמם את הצמח ישירות דרך מגע. חימום מהיר,
                פשוט לשימוש. +Lanza · Aria קונבינציה - אוויר חם עובר דרך הצמח
                ומחמם אותו בצורה אחידה. תוצאה עמוקה יותר, טעם מלא יותר. Fog Pro
                · Roffu
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
