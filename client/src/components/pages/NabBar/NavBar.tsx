import React, { memo } from "react";
import NavBarMain from "./NavBarMain";
import NavBarBottom from "./NavBarBottom";
import NavBarTop from "./NavBarTop";

const NavBar = memo(() => {
  return (
    <nav className="sticky top-0 z-[100] bg-white backdrop-blur-sm shadow-soft transition-all duration-300">
      <NavBarTop />
      <NavBarMain />
      <NavBarBottom />
    </nav>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;
