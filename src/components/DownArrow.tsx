"use client";
import { useEffect, useState } from "react";
import { HiChevronDoubleDown } from "react-icons/hi2";
import { usePathname } from "next/navigation";

interface DownArrowProps {
  className?: string;
}

export default function DownArrow({ className = "" }: DownArrowProps) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname !== "/") return null;

  return (
    <div
      className={`flex justify-end transition-opacity duration-500 md:h-[100px] ${hidden ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"} ${className}`}
    >
      <button
        type="button"
        className="js-scroll-down cursor-pointer h-[80px] w-[80px] md:h-[100px] md:w-[100px] flex items-center justify-center"
        onClick={() => {
          const el = document.getElementById('main-header');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <HiChevronDoubleDown size={32} />
      </button>
    </div>
  );
}
