"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin, FaSpotify, FaInstagram, FaXTwitter, FaGoodreads } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DrawUnderlineLink from "./DrawUnderlineLink";
gsap.registerPlugin(useGSAP);

export type MenuItem = {
  label: string;
  href: string;
  isCurrent?: boolean;
};

export type SlideNavProps = {
  menuItems?: MenuItem[];
};

const defaultMenuItems: MenuItem[] = [
  { label: "Work", href: "/", isCurrent: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SlideNav({ menuItems = defaultMenuItems }: SlideNavProps) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const panelRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const contentRef = useRef<HTMLDivElement>(null);
  const siteMenuRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when nav is open
  useEffect(() => {
    if (navOpen) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [navOpen]);

  // Close nav on route change
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  // GSAP animation logic using useGSAP
  useGSAP(() => {
    // Set initial state for nav and panels
    gsap.set(navRef.current, { xPercent: 100, visibility: "visible" });
    gsap.set(panelRefs.map(ref => ref.current), { xPercent: 100, opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0, y: 40 });
    gsap.set(siteMenuRef.current, { y: "0%" });
  }, []);

  useGSAP(() => {
    if (navOpen) {
      // Slide in the nav
      gsap.to(navRef.current, { xPercent: 0, duration: 0.7, ease: "power4.inOut" });
      // Animate panels in
      gsap.to(panelRefs.map(ref => ref.current), {
        xPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power4.inOut",
        stagger: 0.09,
        onComplete: () => {
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power4.out"
          });
        }
      });
      // Animate site-menu out (up)
      gsap.to(siteMenuRef.current, {
        y: "-100%",
        duration: 0.5,
        ease: "power4.inOut"
      });
    } else {
      // Animate content out
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.3,
        ease: "power4.in",
        onComplete: () => {
          // Animate panels out
          gsap.to(panelRefs.map(ref => ref.current), {
            xPercent: 100,
            opacity: 0,
            duration: 0.6,
            ease: "power4.inOut",
            stagger: {
              each: 0.09,
              from: "end"
            },
            onComplete: () => {
              // Slide out the nav
              gsap.to(navRef.current, { xPercent: 100, duration: 0.6, ease: "power4.inOut" });
            }
          });
        }
      });
      // Animate site-menu back in (down)
      gsap.to(siteMenuRef.current, {
        y: "0%",
        duration: 0.5,
        ease: "power4.inOut"
      });
    }
  }, [navOpen]);

  return (
    <>
      {/* site-menu */}
      <div
        ref={siteMenuRef}
        className={"site-menu fixed z-[51] top-0 right-0 transition-transform duration-300 px-[20px] tracking-normal text-[22px] md:text-[36px]"}
      >
        <DrawUnderlineLink href="#" className="inline-block leading-[80px]" onClick={(e) => { e.preventDefault(); setNavOpen(true); }}>Menu</DrawUnderlineLink>
      </div>
      {/* l-nav (slide-out nav) */}
      <nav ref={navRef} className="l-nav fixed bottom-0 right-0 h-[calc(100%-80px)] md:h-screen w-full z-[75] text-white">
        {/* Animated background panels */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div ref={panelRefs[0]} className="absolute top-0 right-0 w-full h-full bg-[#dda15e]" />
          <div ref={panelRefs[1]} className="absolute top-0 right-0 w-full h-full bg-[#606c38]" />
          <div ref={panelRefs[2]} className="absolute top-0 right-0 w-full h-full bg-[#283618]" />
        </div>
        {/* Nav content */}
        <div ref={contentRef} className="relative z-10 flex flex-col justify-between h-full leading-[40px] md:leading-[80px] text-[22px] md:text-[36px] max-md:py-[20px] px-[20px] md:pb-[20px]">
          <div className="absolute z-[52] top-0 right-0 max-md:text-black max-md:top-[-80px] px-[20px]">
            <DrawUnderlineLink href="#" className="leading-[80px] inline-block text-[22px] md:text-[36px] md:hover:text-[#DDA15E] transition-colors duration-500" onClick={(e) => { e.preventDefault(); setNavOpen(false); }}>Close</DrawUnderlineLink>
          </div>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.href}
                className={`menu-item${item.isCurrent ? " menu-item-home current-menu-item" : ""}`}
              >
                <DrawUnderlineLink href={item.href} onClick={() => setNavOpen(false)} className="inline-block hover:text-[#DDA15E] transition-colors duration-500">{item.label}</DrawUnderlineLink>
              </li>
            ))}
          </ul>
          {/* Social Links Section */}
          <div className="flex gap-[20px] text-[30px] md:text-[36px]">
            <Link href="https://github.com/diztinct-glenn" passHref target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#DDA15E] transition-colors duration-500">
              <FaGithub />
            </Link>
            <Link href="https://www.linkedin.com/in/glenn-basgaard/" passHref target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#DDA15E] transition-colors duration-500">
              <FaLinkedin />
            </Link>
            <Link href="https://open.spotify.com/user/gbasgaard" passHref target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="hover:text-[#DDA15E] transition-colors duration-500">
              <FaSpotify />
            </Link>
            <Link href="https://music.apple.com/profile/gBasgaard" passHref target="_blank" rel="noopener noreferrer" aria-label="Apple Music" className="hover:text-[#DDA15E] transition-colors duration-500">
              <SiApplemusic />
            </Link>
            <Link href="https://www.goodreads.com/gbasgaard" passHref target="_blank" rel="noopener noreferrer" aria-label="Goodreads" className="hover:text-[#DDA15E] transition-colors duration-500">
              <FaGoodreads />
            </Link>
            <Link href="https://www.instagram.com/gbasgaard/" passHref target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#DDA15E] transition-colors duration-500">
              <FaInstagram />
            </Link>
            <Link href="https://x.com/gbasgaard" passHref target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-[#DDA15E] transition-colors duration-500">
              <FaXTwitter />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
