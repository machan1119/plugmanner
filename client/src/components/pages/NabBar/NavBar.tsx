import React, { memo } from "react";
import NavBarMain from "./NavBarMain";
import NavBarBottom from "./NavBarBottom";
import NavBarTop from "./NavBarTop";

interface NavBarProps {
  className?: string;
}

const NavBar = memo(({ className = "" }: NavBarProps) => {
  return (
    <nav
      className={`
        sticky top-0 z-50
        bg-white backdrop-blur-sm
        shadow-soft
        transition-all duration-300
        ${className}
      `}
    >
      <NavBarTop />
      <NavBarMain />
      <NavBarBottom />
    </nav>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;
