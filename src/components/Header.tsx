"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Link from "next/link";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isContact = pathname === "/contact";
  const isAbout = pathname === "/about";
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let st: ScrollTrigger | null = null;
    function setupScrollTrigger() {
      if (window.innerWidth >= 768) {
        st = ScrollTrigger.create({
          trigger: ".l-header__flex-bottom",
          pin: true,
          start: "bottom 99%",
          end: "+=50%",
        });
      }
    }
    setupScrollTrigger();
    function handleResize() {
      if (window.innerWidth < 768 && st) {
        st.kill();
        st = null;
      } else if (window.innerWidth >= 768 && !st) {
        setupScrollTrigger();
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      if (st) st.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="top-0 z-50 leading-[30px] max-md:py-[10px] p-[20px] max-md:h-[80px] max-md:left-0 max-md:right-0 bg-white overflow-hidden sticky md:h-screen md:shrink-0 md:max-w-[200px] text-[22px] md:text-[36px] md:basis-[25%]"
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
      {/* BOTTOM TITLES (show only on their corresponding page) */}
      <p className={`l-header__bottom l-header__title--contact absolute md:bottom-[22px] md:left-[24px] transition-transform duration-500${isContact ? "" : " hidden"}`}>
        Contact
      </p>
      <p className={`l-header__bottom l-header__title--about absolute md:bottom-[22px] md:left-[24px] transition-transform duration-500${isAbout ? "" : " hidden"}`}>
        About
      </p>
      <p className={`l-header__bottom l-header__title--work absolute md:bottom-[22px] md:left-[24px] transition-transform duration-500${isHome ? "" : " hidden"}`}>
        Work
      </p>
    </header>
  );
}
