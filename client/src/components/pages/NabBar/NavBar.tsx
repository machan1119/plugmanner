"use client";
import React, { memo } from "react";
import NavBarMain from "./NavBarMain";
import NavBarBottom from "./NavBarBottom";
import NavBarTop from "./NavBarTop";
import { useHome } from "@/providers/HomeProvider";

interface NavBarProps {
  className?: string;
}

const NavBar = memo(({ className = "" }: NavBarProps) => {
  const { serviceShow } = useHome();

  return (
    <nav
      className={`
        sticky top-0 z-50
        bg-white/80 backdrop-blur-sm
        shadow-soft
        transition-all duration-300
        ${className}
      `}
    >
      <div className="animate-fade-in">
        <NavBarTop />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
        <NavBarMain />
      </div>
      <div
        className={`
          transition-all duration-300
          ${serviceShow ? "hidden" : "block"} 
          lg:block
          animate-fade-in
        `}
        style={{ animationDelay: "200ms" }}
      >
        <NavBarBottom />
      </div>
    </nav>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;
