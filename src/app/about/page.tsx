"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GsapImage from "@/components/GsapImage";

export default function AboutPage() {
  const span1Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (span1Ref.current && span2Ref.current) {
      gsap.to(span1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.to(span2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
      });
    }
  }, { dependencies: [] });

  const initialStyle = { opacity: 0, transform: "translateY(40px)" };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid-container">
        <div className="item-1">
          <p className="text-lg">
            <span ref={span1Ref} style={initialStyle} className="text-4xl font-bold block mb-[20px]">Hey, I&apos;m Glenn</span>{" "}
            <span ref={span2Ref} style={initialStyle}>— a software engineer who&apos;s all about making the web look good and work even better. I&apos;ve had the chance to work with brands like Lucid Motors and the Florida Panthers, creating custom solutions that actually move the needle. Outside of code, you&apos;ll find me digging through record crates, saving way too many pins on Google Maps, or playing with my pup. Let&apos;s make something cool.</span>
          </p>
        </div>
        <div className="item-2 aspect-[4/3]">
          <GsapImage
            src="/glenn-norway-2.jpeg"
            alt="My wife and I in Norway"
            width={859}
            height={644}
          />
        </div>
      </div>
    </div>
  );
}
