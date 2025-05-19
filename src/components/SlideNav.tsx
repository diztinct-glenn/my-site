"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <>
      {/* site-menu */}
      <div
        className={`site-menu fixed z-[51] top-0 right-0 transition-transform duration-300 tracking-normal text-[22px] md:text-[36px]${navOpen ? ' max-md:hidden' : ''}`}
      >
        <a href="#" className="js-nav-trigger inline-block leading-[80px] px-[20px]" onClick={(e) => { e.preventDefault(); setNavOpen(true); }}>Menu</a>
      </div>
      {/* l-nav (slide-out nav) */}
      <nav className={`l-nav fixed bottom-0 right-0 transition-all duration-500 h-[calc(100%-80px)] md:h-screen w-full z-[75] text-white bg-[#283618]${navOpen ? ' is-open' : ''}`} style={{ transform: navOpen ? 'translateX(0)' : 'translateX(calc(100% + 1px))' }}>
        <div className="l-nav__close absolute z-[52] top-0 right-0 max-md:text-black max-md:top-[-80px]">
          <a href="#" className="js-nav-trigger--close leading-[80px] inline-block px-[20px] md:text-[36px]" onClick={(e) => { e.preventDefault(); setNavOpen(false); }}>Close</a>
        </div>
        <div className="menu-primary-menu-container leading-[40px] md:leading-[80px] text-[22px] md:text-[36px] max-md:py-[20px] px-[20px]">
          <ul id="menu-primary-menu" className="l-nav__menu">
            {menuItems.map((item) => (
              <li
                key={item.href}
                className={`menu-item${item.isCurrent ? " menu-item-home current-menu-item" : ""}`}
              >
                <Link href={item.href} onClick={() => setNavOpen(false)} className="inline-block hover:underline">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
