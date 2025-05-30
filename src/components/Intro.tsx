"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Intro() {
  const pathname = usePathname();
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    if (pRef.current) {
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
  }, [pathname]);

  if (pathname !== "/") return null;
  return (
    <div
      className="intro relative z-[52] bg-[#283618] text-white font-sans tracking-normal leading-[1.36364] text-[1.375rem] p-6 h-[calc(100vh-80px)] md:h-[calc(100vh-100px)]"
    >
      <div className="inview--visible md:max-w-[75%] text-[#DDA15E] text-[30px] md:text-[52px]" data-inview="">
        <p ref={pRef}>Part designer, part engineer. All about making the internet a more beautiful place. I build fast, accessible, and delightful web experiences. I sweat the small stuff so you don't have to. Thoughtful work, built to be felt.</p>
      </div>
    </div>
  );
}
