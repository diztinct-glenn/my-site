"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAbout = pathname === "/about";
  return (
    <main className={`p-[20px] pb-[40px] md:py-[100px] md:grow`}>
      {children}
    </main>
  );
}
