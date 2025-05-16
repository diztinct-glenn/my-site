"use client";

import { usePathname } from "next/navigation";

export default function Intro() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return (
    <div
      className="relative z-[100] bg-[#283618] text-white font-sans tracking-normal leading-[1.36364] text-[1.375rem] p-6 h-[calc(100vh-80px)]"
    >
      <div className="inview--visible md:max-w-[75%] text-[#DDA15E] md:text-[52px]" data-inview="">
        <p>A creative developer passionate about design, technology, and building beautiful digital experiences.</p>
      </div>
    </div>
  );
}
