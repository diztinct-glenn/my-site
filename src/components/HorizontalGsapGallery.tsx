"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const images = [
  "glenn-betty.jpeg",
  "glenn-fam.jpeg",
  "glenn-mexico.jpeg",
  "glenn-norway-2.jpeg",
  "glenn-norway-3.jpeg",
  "glenn-norway-4.jpeg",
  "glenn-norway-5.jpeg",
  "glenn-norway-6.jpeg",
  "glenn-norway.jpeg",
  "glenn-ski.jpeg",
  "glenn-utah.jpg",
  "glenn.jpg",
];

export default function HorizontalGsapGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Double the images for seamless looping
  const imageRefs = Array.from({ length: images.length * 2 }, () => useRef<HTMLDivElement>(null));

  useEffect(() => {
    if (!sectionRef.current) return;
    const additionalX = { val: 0 };
    let additionalXAnim: gsap.core.Tween | undefined;
    let offset = 0;

    // Calculate total width of all images (including duplicates)
    const getTotalWidth = () => {
      return imageRefs.slice(0, images.length).reduce((sum, ref) => sum + (ref.current?.offsetWidth || 0), 0);
    };
    const totalRowWidth = getTotalWidth();

    imageRefs.forEach((ref, i) => {
      if (!ref.current) return;
      const duration = 20;
      gsap.fromTo(
        ref.current,
        { x: 0 },
        {
          x: -totalRowWidth,
          duration,
          repeat: -1,
          ease: "none",
          modifiers: {
            x: gsap.utils.unitize((x) => {
              offset += additionalX.val;
              x = (parseFloat(x) - offset) % (-totalRowWidth * 2);
              return x;
            })
          }
        }
      );
    });

    const imagesScrollerTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      end: "bottom 50%",
      onUpdate: function (self) {
        const velocity = self.getVelocity();
        if (velocity > 0) {
          if (additionalXAnim) additionalXAnim.kill();
          additionalX.val = -velocity / 2000;
          additionalXAnim = gsap.to(additionalX, { val: 0 });
        }
        if (velocity < 0) {
          if (additionalXAnim) additionalXAnim.kill();
          additionalX.val = -velocity / 3000;
          additionalXAnim = gsap.to(additionalX, { val: 0 });
        }
      }
    });
    return () => {
      imagesScrollerTrigger.kill();
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-[60vh] flex items-center justify-center pt-[2vw] pb-[2vw]">
      <div className="gallery flex flex-row gap-[2vw] min-w-full items-center justify-start relative overflow-x-hidden">
        {[...images, ...images].map((src, i) => (
          <div
            key={src + i}
            ref={imageRefs[i]}
            className="rounded-[1vw] overflow-hidden shadow-lg bg-white min-w-[250px] max-w-[400px]"
            style={{ height: '350px', flex: '0 0 auto' }}
          >
            <Image
              src={`/${src}`}
              alt={src.replace(/[-.]/g, " ")}
              width={800}
              height={500}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", margin: 0 }}
              {...(i === 0 ? { priority: true } : { loading: "lazy" })}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
