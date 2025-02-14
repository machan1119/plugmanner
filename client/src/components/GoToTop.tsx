"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface GoToTopProps {
  //   className?: string;
  showAt?: number;
  smooth?: boolean;
}

export function GoToTop({
  //   className,
  showAt = 400,
  smooth = true,
}: GoToTopProps) {
  const [show, setShow] = useState(false);

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

  return show ? (
    <button
      className="fixed right-[50px] bottom-[50px] z-100 text-4xl text-white bg-green-light w-[50px] h-[50px] rounded-full flex items-center justify-center"
      onClick={scrollToTop}
    >
      <ArrowUp />
    </button>
  ) : null;
}
