"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface GoToTopProps {
  className?: string;
  showAt?: number;
  smooth?: boolean;
  position?: "bottom-right" | "bottom-left";
}

export function GoToTop({
  className,
  showAt = 400,
  smooth = true,
  position = "bottom-left",
}: GoToTopProps) {
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > showAt);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAt]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const positionClasses = {
    "bottom-right": "right-8 bottom-8",
    "bottom-left": "left-8 bottom-8",
  };

  return show ? (
    <button
      className={`
        fixed z-50
        ${positionClasses[position]}
        w-12 h-12
        bg-primary hover:bg-secondary
        text-white
        rounded-full
        flex items-center justify-center
        shadow-soft hover:shadow-hover
        transition-all duration-300
        animate-fade-in
        ${isHovered ? "scale-110" : "scale-100"}
        ${className || ""}
      `}
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ArrowUp
        className={`
          w-6 h-6
          transition-transform duration-300
          ${isHovered ? "-translate-y-1" : "translate-y-0"}
        `}
      />
    </button>
  ) : null;
}
