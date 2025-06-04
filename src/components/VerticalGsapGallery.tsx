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

function splitIntoColumns(arr: string[], numCols: number) {
  const cols: string[][] = Array.from({ length: numCols }, () => []);
  arr.forEach((img, i) => {
    cols[i % numCols].push(img);
  });
  return cols;
}

export default function VerticalGsapGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const colRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const columns = splitIntoColumns(images, 2);
  // For each column, create an array of refs for the images (doubled for looping)
  const imageRefs = columns.map(col =>
    Array.from({ length: col.length * 2 }, () => useRef<HTMLDivElement>(null))
  );

  useEffect(() => {
    if (!sectionRef.current) return;
    const additionalY = { val: 0 };
    let additionalYAnim: gsap.core.Tween | undefined;
    let offset = 0;
    columns.forEach((col, colIdx) => {
      // Calculate total height of all images in the column (including duplicates)
      const getTotalHeight = () => {
        return imageRefs[colIdx].reduce((sum, ref) => sum + (ref.current?.offsetHeight || 0), 0) / 2;
      };
      const totalColumnHeight = getTotalHeight();
      imageRefs[colIdx].forEach((ref, i) => {
        if (!ref.current) return;
        const direction = colIdx === 0 ? -1 : 1; // First col up, second col down
        const duration = 20;
        gsap.fromTo(
          ref.current,
          { y: 0 },
          {
            y: direction * totalColumnHeight,
            duration,
            repeat: -1,
            ease: "none",
            modifiers: {
              y: gsap.utils.unitize((y) => {
                if (direction === 1) {
                  offset += additionalY.val;
                  y = (parseFloat(y) - offset) % (totalColumnHeight * 2);
                } else {
                  offset += additionalY.val;
                  y = (parseFloat(y) + offset) % -(totalColumnHeight * 2);
                }
                return y;
              })
            }
          }
        );
      });
    });

    const imagesScrollerTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      end: "bottom 50%",
      onUpdate: function (self) {
        const velocity = self.getVelocity();
        if (velocity > 0) {
          if (additionalYAnim) additionalYAnim.kill();
          additionalY.val = -velocity / 2000;
          additionalYAnim = gsap.to(additionalY, { val: 0 });
        }
        if (velocity < 0) {
          if (additionalYAnim) additionalYAnim.kill();
          additionalY.val = -velocity / 3000;
          additionalYAnim = gsap.to(additionalY, { val: 0 });
        }
      }
    });
    return () => {
      imagesScrollerTrigger.kill();
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center pt-[2vw] pb-[2vw]">
      <div className="gallery flex flex-row gap-[2vw] min-h-[80vh] items-start justify-center absolute">
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            ref={colRefs[colIdx]}
            className="col flex flex-col gap-[2vw] w-[50%] min-w-[200px] max-w-[350px]"
          >
            {[...col, ...col].map((src, i) => (
              <div
                key={src + i}
                ref={imageRefs[colIdx][i]}
                className="rounded-[1vw] overflow-hidden shadow-lg bg-white"
                style={{ width: '100%' }}
              >
                <Image
                  src={`/${src}`}
                  alt={src.replace(/[-.]/g, " ")}
                  width={800}
                  height={500}
                  style={{ width: "100%", height: "auto", objectFit: "cover", display: "block", margin: 0 }}
                  {...(i === 0 && colIdx === 0 ? { priority: true } : { loading: "lazy" })}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
