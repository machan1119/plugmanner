import React from "react";
import NavBarMain from "./NavBarMain";
import NavBarBottom from "./NavBarBottom";
import NavBarTop from "./NavBarTop";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-20">
      <NavBarTop />
      <NavBarMain />
      <NavBarBottom />
    </nav>
  );
};

export default NavBar;
