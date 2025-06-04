"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const images = [
  "/glenn-utah.jpg",
  "/glenn-norway-2.jpeg",
  "/glenn-norway-3.jpeg",
  "/glenn-norway-4.jpeg",
  "/glenn-norway-5.jpeg",
  "/glenn-norway-6.jpeg",
  "/glenn-fam.jpeg",
  "/glenn-mexico.jpeg",
  "/glenn-norway.jpeg",
  "/glenn-ski.jpeg",
  "/glenn-betty.jpeg",
  "/glenn.jpg"
];

export default function RandomGsapGallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [forceLoaded, setForceLoaded] = useState(false);
  const allLoaded = loadedCount === images.length || forceLoaded;

  // Fallback: force allLoaded after 1s
  useEffect(() => {
    if (allLoaded) return;
    const timeout = setTimeout(() => setForceLoaded(true), 1000);
    return () => clearTimeout(timeout);
  }, [allLoaded]);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !allLoaded) return;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    const randomImageSize = gsap.utils.random(120, 260, true);

    imageRefs.current.forEach((image) => {
      if (!image) return;
      let imgWidth: number;
      if (containerWidth < 800) {
        imgWidth = Math.round(randomImageSize() / 3);
        image.style.width = imgWidth + "px";
      } else {
        imgWidth = Math.round(randomImageSize());
        image.style.width = imgWidth + "px";
      }
      const maxLeft = Math.max(0, containerWidth - imgWidth);
      const randomLeft = Math.round(gsap.utils.random(0, maxLeft, 1, true)());
      image.style.left = randomLeft + "px";
      image.style.top = Math.round(containerHeight) + "px";
      image.style.zIndex = String(Math.round(imgWidth / 40));
      image.style.position = "absolute";
      image.style.filter = "saturate(0)";
      image.style.opacity = "1";
    });

    gsap.to(imageRefs.current, {
      y: (index: number, target: Element) => {
        return -Math.round((target as HTMLDivElement).offsetHeight + containerHeight) + "px";
      },
      ease: "none",
      duration: (index: number, target: Element) => {
        return 10000 / Number((target as HTMLDivElement).style.width.replace("px", ""));
      },
      stagger: {
        amount: 3,
        repeat: -1
      }
    }).progress(0.5);
  }, [allLoaded]);

  return (
    <div ref={containerRef} className="gallery z-[1] pointer-events-none select-none absolute inset-0 w-full h-full">
      {images.map((src, i) => (
        <div
          key={src}
          className={`image pointer-events-auto transition-all duration-300 max-w-[260px] ${allLoaded ? "opacity-100" : "opacity-0"}`}
          ref={el => { imageRefs.current[i] = el; }}
          style={{}}
        >
          <img
            src={src}
            alt="Random gallery"
            className="rounded-lg shadow-xl w-full h-auto transition-transform duration-300 hover:scale-105 hover:rotate-2"
            draggable={false}
            style={{ userSelect: "none" }}
            onLoad={() => setLoadedCount(count => count + 1)}
          />
        </div>
      ))}
    </div>
  );
}
