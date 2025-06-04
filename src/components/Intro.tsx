"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import BlobCanvas from "./BlobCanvas";

gsap.registerPlugin(SplitText, useGSAP);

export default function Intro() {
  const pathname = usePathname();
  const pRef = useRef<HTMLParagraphElement>(null);
  const [ready, setReady] = useState(false);

  useGSAP(() => {
    if (pathname !== "/") return;
    if (pRef.current) {
      setReady(true);
      const split = new SplitText(pRef.current as HTMLElement, { type: "words" });
      gsap.from(split.words, {
        opacity: 0,
        y: 40,
        stagger: 0.07,
        duration: 1,
        ease: "power3.out",
      });
      return () => split.revert();
    }
  }, { dependencies: [pathname], scope: pRef });

  if (pathname !== "/") return null;
  return (
    <div className="intro relative z-[52] bg-[#283618] text-white font-sans tracking-normal leading-[1.36364] text-[1.375rem] p-6 h-[calc(100vh-80px)] md:h-[calc(100vh-100px)]"
    >
      <p ref={pRef} className="intro-text md:max-w-[75%] text-[#DDA15E] text-[30px] md:text-[52px] md:sticky md:top-0" style={{ opacity: ready ? 1 : 0 }}>
        Part designer, part engineer. All about making the internet a more beautiful place. I build fast, accessible, and delightful web experiences. I sweat the small stuff so you don&apos;t have to. Thoughtful work, built to be felt.
      </p>
      <div
        className="absolute bottom-[10px] right-[10px] md:w-[25%] md:bottom-[20px] md:right-[20px] z-[53] select-none"
        style={{ aspectRatio: '1 / 1' }}
      >
        <div className="w-[150px] h-[150px] md:w-full md:h-auto aspect-square">
          <BlobCanvas imageSrc="/glenn.jpg" centerOffsetX={0.24} centerOffsetY={0.02} zoom={0.8} />
        </div>
      </div>
    </div>
  );
}
