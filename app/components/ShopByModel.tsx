"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { FiShoppingBag } from "react-icons/fi";
import Link from "next/link";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

/* ─── Types & Data ──────────────────────────────────────────────────────── */

interface ColorVariant {
  name: string;
  value: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  subtitle: string;
  colors: ColorVariant[];
  storage: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "17-pro-max",
    name: "آيفون 17 برو ماكس",
    subtitle: "iPhone 17 Pro Max",
    colors: [
      { name: "برتقالي", value: "#F07B2C", image: "/iphone-17-promax/iphone17promax-org.webp" },
      { name: "سيلفر", value: "#F5F5F5", image: "/iphone-17-promax/iphone-17promax-silver.webp" },
      { name: "أزرق", value: "#32374A", image: "/iphone-17-promax/iphone1-promax-blu.webp" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    id: "17-pro",
    name: "آيفون 17 برو",
    subtitle: "iPhone 17 Pro",
    colors: [
      { name: "سيلفر", value: "#F5F5F5", image: "/iphone-17-promax/iphone-17promax-silver.webp" },
      { name: "برتقالي", value: "#F07B2C", image: "/iphone-17-promax/iphone17promax-org.webp" },
      { name: "أزرق", value: "#32374A", image: "/iphone-17-promax/iphone1-promax-blu.webp" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    id: "17-air",
    name: "آيفون 17 إير",
    subtitle: "iPhone 17 Air",
    colors: [
      { name: "أبيض", value: "#FFFFFF", image: "/iphone-17-air/i-white.webp" },
      { name: "أسود", value: "#000000", image: "/iphone-17-air/i-black.webp" },
      { name: "ذهبي", value: "#e4a017", image: "/iphone-17-air/i-gold.webp" },
      { name: "سماوي", value: "#96AED1F", image: "/iphone-17-air/i-blue.webp" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    id: "17",
    name: "آيفون 17",
    subtitle: "iPhone 17",
    colors: [
      { name: "وردي", value: "#C9ADDC", image: "/iphone-17/i-pink.webp" },
      { name: "أخضر", value: "#A6B286", image: "/iphone-17/i-green.webp" },
      { name: "أبيض", value: "#FFFFFF", image: "/iphone-17/i-white.webp" },
      { name: "أسود", value: "#000000", image: "/iphone-17/i-black.webp" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    id: "16-pro-max",
    name: "آيفون 16 برو ماكس",
    subtitle: "iPhone 16 Pro Max",
    colors: [
      { name: "تيتانيوم صحراوي", value: "#C8A77A", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788637968/1ad27298-5aa7-4ebf-8335-4b2a106c8442.webp" },
      { name: "تيتانيوم طبيعي", value: "#9A9A9A", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788637034/4b33df43-b486-4c3a-9b2e-8f7970925505.webp" },
      { name: "تيتانيوم أبيض", value: "#E5E5E0", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788636870/16aee900-ceb3-48e3-b3e9-119a44739507.webp" },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    id: "16-pro",
    name: "آيفون 16 برو",
    subtitle: "iPhone 16 Pro",
    colors: [
      { name: "تيتانيوم صحراوي", value: "#C8A77A", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788637968/1ad27298-5aa7-4ebf-8335-4b2a106c8442.webp" },
      { name: "تيتانيوم طبيعي", value: "#9A9A9A", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788637034/4b33df43-b486-4c3a-9b2e-8f7970925505.webp" },
      { name: "تيتانيوم أبيض", value: "#E5E5E0", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788636870/16aee900-ceb3-48e3-b3e9-119a44739507.webp" },
    ],
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    id: "16-plus",
    name: "آيفون 16 بلس",
    subtitle: "iPhone 16 Plus",
    colors: [
      { name: "أسود", value: "#1D1D1F", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788643537/c3022b9b-9702-4421-85d1-0861710a3fee.webp" },
      { name: "أبيض", value: "#F5F5F0", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788643538/d55b764c-e695-428a-99c9-a0768cd173e7.webp" },
      { name: "وردي", value: "#F2C6D2", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788643539/7bba49c7-f75e-4a42-a2cf-bff4ce3f6f9e.webp" },
      { name: "أخضر مزرق", value: "#4D8B87", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788643537/e5241fbd-5d6a-4011-a5d7-8dda50c6e722.webp" },
      { name: "أزرق فوق بحري", value: "#243C7A", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788643540/251e0223-4981-4028-b0b6-6b966832abce.webp" },
    ],
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    id: "16",
    name: "آيفون 16",
    subtitle: "iPhone 16",
    colors: [
      { name: "أسود", value: "#1D1D1F", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788643537/c3022b9b-9702-4421-85d1-0861710a3fee.webp" },
      { name: "أبيض", value: "#F5F5F0", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788643538/d55b764c-e695-428a-99c9-a0768cd173e7.webp" },
      { name: "وردي", value: "#F2C6D2", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788643539/7bba49c7-f75e-4a42-a2cf-bff4ce3f6f9e.webp" },
      { name: "أخضر مزرق", value: "#4D8B87", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788643537/e5241fbd-5d6a-4011-a5d7-8dda50c6e722.webp" },
      { name: "أزرق فوق بحري", value: "#243C7A", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788643540/251e0223-4981-4028-b0b6-6b966832abce.webp" },
    ],
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    id: "15-pro-max",
    name: "آيفون 15 برو ماكس",
    subtitle: "iPhone 15 Pro Max",
    colors: [
      { name: "تيتانيوم أبيض", value: "#E5E5E0", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788649290/d7b5e81a-a3de-42fd-b73e-0df0c2b4cb11.jpg" },
      { name: "تيتانيوم أزرق", value: "#394C63", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788649290/768732fa-f71e-47f6-a9cb-a8578dd4bff0.jpg" },
      { name: "تيتانيوم طبيعي", value: "#9A9A9A", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788649290/c15ecd7e-91da-43e0-8514-28ad02053504.jpg" },
    ],
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    id: "15-pro",
    name: "آيفون 15 برو",
    subtitle: "iPhone 15 Pro",
    colors: [
      { name: "تيتانيوم أبيض", value: "#E5E5E0", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788649290/d7b5e81a-a3de-42fd-b73e-0df0c2b4cb11.jpg" },
      { name: "تيتانيوم أزرق", value: "#394C63", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788649290/768732fa-f71e-47f6-a9cb-a8578dd4bff0.jpg" },
      { name: "تيتانيوم طبيعي", value: "#9A9A9A", image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788649290/c15ecd7e-91da-43e0-8514-28ad02053504.jpg" },
    ],
    storage: ["128GB", "256GB", "512GB"],
  },
  {
    id: "galaxy-s26-ultra",
    name: "سامسونج جالاكسي اس 26 الترا",
    subtitle: "Samsung Galaxy S26 Ultra",
    colors: [
      {
        name: "بنفسجي غامق",
        value: "#6B6D83",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788911908/3b7297c9-185d-4ca0-9f97-d85508a3e583.webp"
      },
      {
        name: "أسود",
        value: "#4A4D53",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788911908/ab056765-541c-4e76-90e5-6d7713242337.webp"
      },
      {
        name: "أزرق سماوي",
        value: "#B0C9D9",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788911908/10f7850b-be18-47c3-b5f6-819e4ea40d6a.webp"
      },
      {
        name: "أبيض",
        value: "#F4F6F7",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788911907/4a7d79ac-e15b-4867-9935-42b875857452.webp"
      },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    id: "galaxy-s26-plus",
    name: "سامسونج جالاكسي اس 26 بلس",
    subtitle: "Samsung Galaxy S26+",
    colors: [
      {
        name: "بنفسجي غامق",
        value: "#6B6D83",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914599/ecbbc1a9-042c-4237-b19c-4d5ee549e4ea.jpg"
      },
      {
        name: "أسود",
        value: "#4A4D53",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914599/c26f2256-2559-4cad-ba65-8bd6f14f654e.jpg"
      },
      {
        name: "أزرق سماوي",
        value: "#B0C9D9",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914599/002fd360-d09f-4bb8-b4ec-609790ab6800.jpg"
      },
      {
        name: "أبيض",
        value: "#F4F6F7",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914598/052030c1-d4f5-4865-928f-7667dfddf640.jpg"
      },
    ],
    storage: ["256GB", "512GB"],
  },
  {
    id: "galaxy-s26",
    name: "سامسونج جالاكسي اس 26",
    subtitle: "Samsung Galaxy S26",
    colors: [
      {
        name: "بنفسجي غامق",
        value: "#6B6D83",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914599/ecbbc1a9-042c-4237-b19c-4d5ee549e4ea.jpg"
      },
      {
        name: "أسود",
        value: "#4A4D53",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914599/c26f2256-2559-4cad-ba65-8bd6f14f654e.jpg"
      },
      {
        name: "أزرق سماوي",
        value: "#B0C9D9",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914599/002fd360-d09f-4bb8-b4ec-609790ab6800.jpg"
      },
      {
        name: "أبيض",
        value: "#F4F6F7",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914598/052030c1-d4f5-4865-928f-7667dfddf640.jpg"
      },
    ],
    storage: ["256GB", "512GB"],
  },
  {
    id: "galaxy-s25-ultra",
    name: "سامسونج جالاكسي اس 25 الترا",
    subtitle: "Samsung Galaxy S25 Ultra",
    colors: [
      {
        name: "تيتانيوم أسود",
        value: "#3A3A3A",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788911908/ab056765-541c-4e76-90e5-6d7713242337.webp"
      },
      {
        name: "تيتانيوم فضي",
        value: "#C0C0C0",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788911907/4a7d79ac-e15b-4867-9935-42b875857452.webp"
      },
      {
        name: "تيتانيوم أزرق",
        value: "#6B8CAE",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788911908/10f7850b-be18-47c3-b5f6-819e4ea40d6a.webp"
      },
    ],
    storage: ["256GB", "512GB", "1TB"],
  },
  {
    id: "galaxy-s25-plus",
    name: "سامسونج جالاكسي اس 25 بلس",
    subtitle: "Samsung Galaxy S25+",
    colors: [
      {
        name: "أسود",
        value: "#4A4D53",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914599/c26f2256-2559-4cad-ba65-8bd6f14f654e.jpg"
      },
      {
        name: "أبيض",
        value: "#F4F6F7",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914598/052030c1-d4f5-4865-928f-7667dfddf640.jpg"
      },
      {
        name: "أزرق سماوي",
        value: "#B0C9D9",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914599/002fd360-d09f-4bb8-b4ec-609790ab6800.jpg"
      },
    ],
    storage: ["256GB", "512GB"],
  },
  {
    id: "galaxy-s25",
    name: "سامسونج جالاكسي اس 25",
    subtitle: "Samsung Galaxy S25",
    colors: [
      {
        name: "أسود",
        value: "#4A4D53",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914599/c26f2256-2559-4cad-ba65-8bd6f14f654e.jpg"
      },
      {
        name: "أبيض",
        value: "#F4F6F7",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914598/052030c1-d4f5-4865-928f-7667dfddf640.jpg"
      },
      {
        name: "أزرق سماوي",
        value: "#B0C9D9",
        image: "https://res.cloudinary.com/bzwltpqf/image/upload/v1788914599/002fd360-d09f-4bb8-b4ec-609790ab6800.jpg"
      },
    ],
    storage: ["256GB", "512GB"],
  },
];

/* ─── ProductCard ───────────────────────────────────────────────────────── */

function ProductCard({ product }: { product: Product }) {
  const [activeColor, setActiveColor] = useState(0);
  const imgSwiperRef = useRef<SwiperType | null>(null);
  const color = product.colors[activeColor];

  function handleColorChange(i: number) {
    setActiveColor(i);
    imgSwiperRef.current?.slideTo(i);
  }

  return (
    <article className="group relative flex flex-col bg-white rounded-[28px] overflow-hidden border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(11,67,253,0.13),0_4px_16px_rgba(0,0,0,0.07)] hover:-translate-y-1 h-full">

      {/* ── Image area ── */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2.8" }}>
        <div
          className="absolute inset-0 transition-colors duration-500 z-0"
          style={{ background: "#ffffff" }}
        />
        <Swiper
          modules={[EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          allowTouchMove={false}
          onSwiper={(s) => { imgSwiperRef.current = s; }}
          className="absolute inset-0 z-10 w-full h-full group-hover:[&_.swiper-slide-active_img]:scale-[1.04]"
        >
          {product.colors.map((c) => (
            <SwiperSlide key={c.image}>
              <div className="relative w-full h-full">
                <Image
                  src={c.image}
                  alt={`${product.name} - ${c.name}`}
                  fill
                  sizes="(max-width: 400px) 80vw, (max-width: 640px) 90vw, (max-width: 1100px) 45vw, 23vw"
                  className="object-contain p-3 xs:p-5 transition-transform duration-500"
                  priority={product.id === "17-pro-max"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col p-3 xs:p-4 gap-2">

        {/* Name */}
        <h3 className="text-[0.82rem] xs:text-[1rem] font-black text-[#0a0a0a] leading-snug tracking-tight">
          {product.name}
        </h3>

        {/* Swatches */}
        <div className="flex items-center gap-2">
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              onClick={() => handleColorChange(i)}
              aria-label={`اللون ${c.name}`}
              aria-pressed={activeColor === i}
              className={`rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B43FD] focus-visible:ring-offset-2 ${activeColor === i
                ? "w-4 h-4 xs:w-5 xs:h-5 ring-2 ring-[#0B43FD] ring-offset-2 scale-110"
                : "w-3.5 h-3.5 xs:w-4 xs:h-4 hover:scale-110 hover:ring-2 hover:ring-[#0B43FD]/30 hover:ring-offset-1"
                }`}
              style={{ backgroundColor: c.value, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)" }}
            />
          ))}
        </div>

        {/* Storage */}
        <div className="flex gap-1.5">
          {product.storage.map((s) => (
            <span key={s} className="px-1.5 xs:px-2.5 py-0.5 xs:py-1 rounded-lg text-[0.6rem] xs:text-[0.68rem] font-semibold bg-[#f4f6ff] text-[#6b7280] border border-[#e8edf5] select-none">
              {s}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 w-full">
          <Link
            href={`/shop/${product.id}`}
            className="flex-1 flex items-center justify-center gap-1 py-2 xs:py-2.5 rounded-[10px] xs:rounded-[12px] bg-[#0B43FD] text-white text-[0.72rem] xs:text-[0.8rem] font-bold shadow-[0_4px_16px_rgba(11,67,253,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(11,67,253,0.5)] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B43FD] focus-visible:ring-offset-2"
          >
            <FiShoppingBag size={11} />
            تسوق الآن
          </Link>
        </div>

      </div>
    </article>
  );
}

/* ─── ShopByModel ───────────────────────────────────────────────────────── */

export default function ShopByModel() {
  return (
    <section
      dir="rtl"
      className="w-full py-14 sm:py-20 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 60% 0%, #dde6ff 0%, #eef1ff 30%, #f5f7ff 60%, #ffffff 100%)" }}
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#0B43FD]/8 text-[#0B43FD] text-[0.72rem] font-bold px-3 py-1.5 rounded-full mb-3 border border-[#0B43FD]/12 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B43FD]" />
              أحدث الموديلات
            </div>
            <h2 className="text-[clamp(1.4rem,5vw,3rem)] font-black text-[#0a0a0a] leading-[1.1] tracking-tight">
              تسوّق حسب{" "}
              <span className="bg-gradient-to-l from-[#0B43FD] to-[#4f8bff] bg-clip-text text-transparent">
                الجهاز
              </span>
            </h2>
          </div>

          {/* Nav arrows — desktop only */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              className="swiper-models-prev w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-sm flex items-center justify-center text-[#374151] transition-all duration-200 hover:bg-[#0B43FD] hover:text-white hover:border-[#0B43FD] hover:shadow-[0_4px_14px_rgba(11,67,253,0.3)] disabled:opacity-30"
              aria-label="السابق"
            >
              <HiArrowRight size={16} />
            </button>
            <button
              className="swiper-models-next w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-sm flex items-center justify-center text-[#374151] transition-all duration-200 hover:bg-[#0B43FD] hover:text-white hover:border-[#0B43FD] hover:shadow-[0_4px_14px_rgba(11,67,253,0.3)] disabled:opacity-30"
              aria-label="التالي"
            >
              <HiArrowLeft size={16} />
            </button>
          </div>
        </div>

        {/* ── Swiper ── */}
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          dir="rtl"
          navigation={{
            prevEl: ".swiper-models-prev",
            nextEl: ".swiper-models-next",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-models-dots",
            bulletClass: "swiper-models-bullet",
            bulletActiveClass: "swiper-models-bullet-active",
          }}
          grabCursor
          slidesPerView={1.2}
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 1.5, spaceBetween: 10 },
            350: { slidesPerView: 1.65, spaceBetween: 10 },
            400: { slidesPerView: 1.85, spaceBetween: 12 },
            480: { slidesPerView: 2.2, spaceBetween: 14 },
            640: { slidesPerView: 2.7, spaceBetween: 18 },
            900: { slidesPerView: 3.2, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 22 },
          }}
          className="!overflow-visible"
        >
          {PRODUCTS.map((p) => (
            <SwiperSlide key={p.id} className="!h-auto">
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dots */}
        <div className="swiper-models-dots flex justify-center gap-2 mt-8" />

      </div>

      {/* Dot styles */}
      <style>{`
        .swiper-models-bullet {
          display: inline-block;
          width: 8px; height: 8px;
          border-radius: 9999px;
          background: #0B43FD;
          opacity: 0.2;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-models-bullet-active {
          opacity: 1;
          width: 22px;
          background: #0B43FD;
        }
      `}</style>
    </section>
  );
}
