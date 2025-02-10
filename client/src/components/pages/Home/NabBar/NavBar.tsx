import React, { Dispatch, SetStateAction } from "react";
import NavBarMain from "./NavBarMain";
import NavBarBottom from "./NavBarBottom";
import NavBarTop from "./NavBarTop";

const NavBar = ({
  serviceShow,
  setServiceShow,
}: {
  serviceShow: boolean;
  setServiceShow: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav className="sticky top-0 z-20">
      <NavBarTop />
      <NavBarMain serviceShow={serviceShow} setServiceShow={setServiceShow} />
      <div className={`${serviceShow ? "hidden" : "block"} lg:block`}>
        <NavBarBottom />
      </div>
    </nav>
  );
};

export default NavBar;
