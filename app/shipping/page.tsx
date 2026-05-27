import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import HeroBar from "../components/HeroBar";

const trustBadges = [
  { icon: "/assets/icn/delivery.png", label: "משלוח מהיר", sub: "עד 5 ימי עסקים" },
  { icon: "/assets/icn/headset.png", label: "שירות לקוחות", sub: "058-799-1234" },
  { icon: "/assets/icn/shield.png", label: "רכישה מאובטחת", sub: "תשלום מאובן ומאובטח" },
];

export default function ShippingPage() {
  return (
    <>
      <Navbar />

      {/* Hero Bar */}
      <HeroBar
        title="מדיניות משלוחים ואספקה"
        subtitle="ביטובי מרקט לעסקים"
        imageSrc="/assets/img/hprod.jpg"
      />

      <main className="flex-1 bg-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="site-container max-w-4xl mx-auto">
          <div className="privacy-content space-y-8">

            <div>
              <h2 className="title-h2 mb-4">מהירות הטיפול בהזמנה 🚀</h2>
              <p className="subtitle text-lg">
                הזמנות עד השעה 14:00: כל הזמנה שתתקבל עד השעה 14:00 ביום עסקים רגיל (א'-ה'), תארז ותימסר באותו היום לחברת השליחויות ותיקלט במחסן ההפצה שלה.
              </p>
              <p className="subtitle text-lg mt-4">
                מעקב אחר משלוח: ברגע שהחבילה נקלטת אצל חברת השליחויות, תקבלו הודעת SMS למספר הטלפון שהזנתם, עם קישור למעקב בזמן אמת אחר מיקום המשלוח.
              </p>
            </div>

            <div>
              <h2 className="title-h2 mb-4">זמני אספקה 🚛</h2>
              <p className="subtitle text-lg">
                השאיפה שלנו: ברוב המקרים, המשלוח ייצא עוד באותו הערב לאזור החלוקה הקרוב אליכם ויימסר לכם כבר ביום העסקים למחרת.
              </p>
              <p className="subtitle text-lg mt-4">
                התחייבות: אנו מתחייבים לאספקת המוצרים עד 3 ימי עסקים (ימי עסקים אינם כוללים את יום ההזמנה, ימי שישי, שבת, ערבי חג וחג).
              </p>
            </div>

            <div>
              <h2 className="title-h2 mb-4">שירות ובירורים 📞</h2>
              <p className="subtitle text-lg">
                במידה וההזמנה לא הגיעה אליכם בתוך 3 ימי עסקים, או אם יש לכם שאלה בנוגע למשלוח, צוות שירות הלקוחות שלנו זמין עבורכם:
              </p>
              <ul className="list-disc list-inside space-y-2 pr-4 mt-4">
                <li className="text-white/80 text-xl">טלפון/וואטסאפ: 054-719-9390</li>
                <li className="text-white/80 text-xl">שעות פעילות: א'-ה' בין השעות 9:00-15:00</li>
              </ul>
              <p className="subtitle text-lg mt-4">
                לישובים מרוחקים (רמת הגולן, אילת, יישובי הערבה ומעבר לקו הירוק), ייתכנו עיכובים קלים מעבר ל-3 ימי עסקים.
              </p>
            </div>

            {/* Branding element */}
            <div className="text-center mt-16 pt-8 border-t border-white/10">
              <p className="text-white/70 text-base mb-2">B2B MARKET LTD</p>
              <p className="text-white font-bold text-2xl sm:text-3xl mb-2">יבואנית בלעדית של</p>
              <div className="flex items-center justify-center gap-2">
                <img
                  src="/assets/logo.svg"
                  alt="לוגו"
                  className="h-6 sm:h-6 w-auto"
                />
                <p className="text-white font-bold text-2xl sm:text-3xl">בישראל</p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Trust badges */}
      <div className="border-t py-14 px-4 bg-[white]">
        <div className="flex flex-col sm:flex-row justify-center text-center items-center gap-8 sm:gap-52">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-2 w-50">
              <Image src={badge.icon} alt={badge.label} width={62} height={62} className="w-12 h-12 sm:w-16 sm:h-16" />
              <span className="text-lg sm:text-2xl font-semibold text-black">{badge.label}</span>
              <span className="text-base sm:text-2xl font-light text-black">{badge.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}