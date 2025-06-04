"use client";
import { useRef, useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function GsapImage(props: ImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    let observer: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(node);
    } else {
      // Fallback: just show
      setIsVisible(true);
    }
    return () => observer?.disconnect();
  }, []);

  useGSAP(() => {
    if (hasLoaded && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, { dependencies: [hasLoaded], scope: containerRef });

  // Ensure alt is always a string (default to empty string if missing)
  const { alt = "", ...rest } = props;

  return (
    <div
      ref={containerRef}
      style={{
        opacity: 0,
        transition: "opacity 0.5s",
        willChange: "opacity",
      }}
    >
      {isVisible && (
        <Image
          {...rest}
          alt={alt}
          onLoad={() => setHasLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
