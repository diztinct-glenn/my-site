"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const ballRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ball = ballRef.current;
    if (!ball) return;

    // Move and show the cursor on mousemove
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(ball, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.3, overwrite: 'auto' });
      if (!visible) setVisible(true);
    };
    document.body.addEventListener("mousemove", onMouseMove);

    // Hide cursor when pointer leaves the window
    const onPointerOut = (e: PointerEvent) => {
      if (e.relatedTarget === null) {
        setVisible(false);
        gsap.set(ball, { x: -100, y: -100 });
      }
    };
    document.addEventListener("pointerout", onPointerOut);

    // Hover effect for links
    const hoverables = document.querySelectorAll("a, button, [role='button']");
    const onMouseHover = () => {
      gsap.to(ball, { scale: 4, duration: 0.5, overwrite: 'auto' });
    };
    const onMouseHoverOut = () => {
      gsap.to(ball, { scale: 1, duration: 0.5, overwrite: 'auto' });
    };
    hoverables.forEach(el => {
      el.addEventListener("mouseenter", onMouseHover);
      el.addEventListener("mouseleave", onMouseHoverOut);
    });

    // Clean up
    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerout", onPointerOut);
      hoverables.forEach(el => {
        el.removeEventListener("mouseenter", onMouseHover);
        el.removeEventListener("mouseleave", onMouseHoverOut);
      });
    };
  }, [visible]);

  return (
    <div className="cursor pointer-events-none">
      <div
        ref={ballRef}
        className={`cursor-ball cursor-ball-big fixed top-0 left-0 z-[9999] w-[40px] h-[40px] pointer-events-none will-change-transform`}
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        <svg height="40" width="40">
          <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default CustomCursor;
