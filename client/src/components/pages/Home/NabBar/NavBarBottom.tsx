import React from "react";
import DropDownServices from "./DropDownServices";
import { Services } from "@/libs/data/Services";

const NavBarBottom = () => {
  return (
    <div className="bg-black-light border-y border-black-dark py-2 w-full">
      <div className="flex justify-self-center w-[85%] justify-between">
        {Services.map((val, index) => (
          <DropDownServices key={index} item={val} />
        ))}
      </div>
    </div>
  );
};

export default NavBarBottom;
