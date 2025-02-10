"use client";
import React from "react";
import NavBarMain from "./NavBarMain";
import NavBarBottom from "./NavBarBottom";
import NavBarTop from "./NavBarTop";
import { useHome } from "@/providers/HomeProvider";

const NavBar = () => {
  const { serviceShow } = useHome();
  return (
    <nav className="sticky top-0 z-20">
      <NavBarTop />
      <NavBarMain />
      <div className={`${serviceShow ? "hidden" : "block"} lg:block`}>
        <NavBarBottom />
      </div>
    </nav>
  );
};

export default NavBar;
