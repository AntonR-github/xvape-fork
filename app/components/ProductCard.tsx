import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "../lib/medusa";
import AddToCartButton from "./AddToCartButton";

// Re-export StoreProduct as Product so other files keep working
export type Product = StoreProduct;

// Fallback mock data (used by Compare page and anywhere not yet wired to Medusa)
export const products: Product[] = [
 
  {
    id: "prod_lanza",
    handle: "lanza",
    name: "Lanza",
    badge: "Best Value",
    material: "אלומיניום",
    price: 299,
    variantId: "",
    thumbnail: null,
    images: [],
    description: "המכשיר שמשנה את חוקי המשחק",
    features: ["למתחילים" ,"למתחילים", "המכשיר שמשנה את חוקי המשחק", "פשטות ונוחות יזמינות", "פשטות ונוחות יזמינות", "פשטות ונוחות יזמינות", "פשטות ונוחות יזמינות"],
    variants: [],
  },
  {
    id: "prod_aria",
    handle: "aria",
    name: "Aria+",
    badge: "Most Popular",
    material: "אלומיניום",
    price: 499,
    variantId: "",
    thumbnail: null,
    images: [],
    description: "ביצועי פרמיום בהישג יד",
    features: ["פייה זכוכית מובנית", "חיסום מהיר ואחיד", "ביצועי פרמיום בהישג יד", "ביצועי פרמיום בהישג יד", "ביצועי פרמיום בהישג יד", "ביצועי פרמיום בהישג יד"],
    variants: [],
  },
  {
    id: "prod_fog_pro",
    handle: "fog-pro",
    name: "Fog Pro",
    badge: "Pro Choice",
    material: "אלומיניום",
    price: 549,
    variantId: "",
    thumbnail: null,
    images: [],
    description: "הד ליון חזק בביצועים. מדויק בטעם.",
    features: ["מצב טורבו עוצמתי", "טולה נשלפת ונוחה", "חימום מהיר תוך 20 שניות"],
    variants: [],
  },
  {
    id: "prod_roffu",
    handle: "roffu",
    name: "Roffu",
    badge: "Most Popular",
    material: "אלומיניום",
    price: 649,
    variantId: "",
    thumbnail: null,
    images: [],
    description: "פסגת האידוי. טכנולוגיית חיסום חכמה.",
    features: ["קירור ספירלה מובנה", "אפליקציית שליטה מלאה", "מסך OLED צבעוני", "מסך OLED צבעוני", "מסך OLED צבעוני"],
    variants: [],
  },
];

const FALLBACK_IMG = "/assets/img/product-test-img.jpeg";


export default function ProductCard({ product }: { product: Product }) {
  const slug = product.handle || product.id;
  const imgSrc = product.thumbnail ?? product.images?.[0] ?? FALLBACK_IMG;

  return (
    <div
      className="relative rounded-3xl flex flex-col overflow-hidden"
      style={{ background: "#f2f2f2" }}
    >
      {/* Product image + badge + name — clickable */}
      <Link href={`/shop/${slug}`} className="relative overflow-hidden rounded-3xl m-3 block" style={{ background: "#ffffff", height: "340px" }}>
        {product.badge && (
          <span
            className="absolute top-3 inset-s-3 text-lg font-medium text-white px-3 py-1 rounded-lg z-10"
            style={{ background: "#1a1a1a" }}
          >
            {product.badge}
          </span>
        )}
        <Image
          src={imgSrc}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-full object-contain p-4"
        />
        <h3 className="absolute bottom-3 inset-s-4 text-4xl font-light text-black">{product.name}</h3>
      </Link>

      {/* Info — clickable */}
      <Link href={`/shop/${slug}`} className="flex flex-col gap-2 px-5 pb-5 flex-1 text-start text-black">
        <p className="text-2xl sm:text-xl leading-tight font-light">
          {product.description}
        </p>
        {product.material && (
          <span
            className="inline-flex self-start px-3 py-1 rounded-full text-base font-medium"
            style={{ background: "var(--color-accent)", color: "#1a1a1a" }}
          >
            {product.material}
          </span>
        )}

        {/* Variant colors */}
        {product.variants.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {product.variants.map((v) => (
              <span
                key={v.id}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium border"
                style={{ borderColor: "#d0d0d0", color: "#555" }}
              >
                {v.title}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="text-4xl font-normal text-black">₪{product.price}</span>
        </div>
      </Link>

      {/* Add button */}
      <div className="absolute bottom-5 inset-e-5">
        <AddToCartButton
          id={product.variantId || product.id}
          name={product.name}
          price={product.price}
          variantId={product.variantId}
          image={product.thumbnail ?? product.images?.[0] ?? undefined}
        />
      </div>
    </div>
  );
}
