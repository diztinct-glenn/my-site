"use client";
import { useRef, useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import gsap from "gsap";

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

  useEffect(() => {
    if (hasLoaded && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [hasLoaded]);

  // Ensure alt is always a string (default to empty string if missing)
  const { alt = "", ...rest } = props;

  return (
    <div
      ref={containerRef}
      style={{
        opacity: 0,
        transform: "translateY(40px)",
        transition: "opacity 0.3s, transform 0.3s",
        willChange: "opacity, transform",
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
