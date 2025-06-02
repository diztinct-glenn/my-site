"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import DrawUnderlineLink from "./DrawUnderlineLink";

gsap.registerPlugin(SplitText, useGSAP);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const aRef = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = pRef.current;
    if (!node) return;
    let observer: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer?.disconnect();
          }
        },
        { threshold: 1.0 }
      );
      observer.observe(node);
    } else {
      setInView(true);
    }
    return () => observer?.disconnect();
  }, []);

  useGSAP(
    () => {
      if (inView) {
        setReady(true);
        let splitP: SplitText | undefined;
        let splitA: SplitText | undefined;
        if (pRef.current) {
          splitP = new SplitText(pRef.current, { type: "words" });
          gsap.from(splitP.words, {
            opacity: 0,
            y: 40,
            stagger: 0.07,
            duration: 1,
            ease: "power3.out",
          });
        }
        if (aRef.current) {
          splitA = new SplitText(aRef.current, { type: "words", wordsClass: "split-word" });
          gsap.from(splitA.words, {
            opacity: 0,
            y: 40,
            stagger: 0.07,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
          });
        }
        return () => {
          splitP?.revert();
          splitA?.revert();
        };
      }
    },
    { dependencies: [inView], scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="flex flex-col justify-end items-start transition-all duration-300 text-white px-6 py-10 h-[calc(100vh-80px)] tracking-normal leading-[1.36364] text-[1.375rem] bg-[#283618]"
    >
      <p ref={pRef} className="text-[#DDA15E] text-[30px] md:text-[52px]" style={{ opacity: ready ? 1 : 0 }}>
        Got a project in mind?
      </p>
      <DrawUnderlineLink
        className="text-[#DDA15E] text-[30px] md:text-[52px]"
        href="/contact"
        style={{ opacity: ready ? 1 : 0 }}
      >
        Let&apos;s connect
      </DrawUnderlineLink>
    </footer>
  );
}
