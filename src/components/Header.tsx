"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: '.l-header__flex-bottom',
      pin: true,
      start: "bottom 99%",
      end: "+=50%",
      markers: true,
    });
  });

  return (
    <header
      ref={headerRef}
      className="top-0 z-50 leading-[30px] p-[20px] left-0 right-0 bg-white overflow-hidden md:sticky md:h-screen md:shrink-0 text-[22px] md:text-[36px] md:[flex-basis:calc(0.42632*100vw+-353.89474px)]"
    >
      <nav ref={navRef} aria-label="Header"
        className="l-header__flex set-height flex md:flex-col md:justify-between will-change-[height] transition-[height] duration-500"
      >
        {/* Glenn: always sticky at top */}
        <p className="l-header__flex-top">
          <Link href="/" className="js-trigger-home">
            Glenn
          </Link>
        </p>
        {/* Basgaard: always at bottom via flexbox */}
        <p className="l-header__flex-bottom">
          <Link href="/" className="js-trigger-home">
            Basgaard
          </Link>
        </p>
      </nav>
      {/* TOP TITLES (hidden by default, shown contextually) */}
      <p className={`l-header__title l-header__title--top l-header__title--contact${isHome ? " hidden" : ""}`}>
        Contact
      </p>
      <p className={`l-header__title l-header__title--top l-header__title--about${isHome ? " hidden" : ""}`}>
        About
      </p>
      {/* BOTTOM TITLES (hidden by default, shown contextually) */}
      <p className={`l-header__title l-header__title--bottom l-header__title--work${isHome ? " hidden" : ""}`}>
        Work
      </p>
      <p className={`l-header__title l-header__title--bottom l-header__title--error hidden`}>404</p>
      <p className={`l-header__title l-header__title--bottom l-header__title--thoughts${isHome ? " hidden" : ""}`}>
        Thoughts
      </p>
      {/* TITLE BOTTOM (contextual) */}
      <p className="l-header__bottom absolute md:bottom-[22px] md:left-[24px] transition-transform duration-500">
        Work
      </p>
    </header>
  );
}
