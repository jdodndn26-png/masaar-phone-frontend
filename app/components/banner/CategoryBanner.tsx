"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CategoryBanner({ category, images }: { category: string; images?: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images]);

  if (!images?.length) return null;

  return (
    <div className="px-1 sm:px-5 lg:px-8 py-2">
      <section
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "20px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="transition-opacity duration-700"
            style={{
              opacity: i === current ? 1 : 0,
              position: i === 0 ? "relative" : "absolute",
              inset: i === 0 ? undefined : 0,
              zIndex: i === current ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt={`${category} بانر ${i + 1}`}
              width={1600}
              height={900}
              className="w-full h-auto block"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1400px"
              priority={i === 0}
            />
          </div>
        ))}

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? "20px" : "8px",
                  height: "8px",
                  background: i === current ? "#0B43FD" : "rgba(255,255,255,0.6)",
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
