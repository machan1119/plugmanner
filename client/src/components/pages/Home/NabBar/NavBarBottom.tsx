import React from "react";
import DropDownServices from "./DropDownServices";

const list = [
  "Twitter",
  "Reddit",
  "Instagram",
  "TikTok",
  "Youtube",
  "LinkedIn",
  "Facebook",
  "Spotify",
  "Other",
  "Tools",
];

const NavBarBottom = () => {
  return (
    <div className="bg-[#f6f6f6] border-y border-[#c7c7c7] py-2 w-full">
      <div className="flex justify-self-center w-[85%] justify-between">
        {list.map((val, index) => (
          <DropDownServices key={index} index={index} type={val} />
        ))}
      </div>
    </div>
  );
};

export default NavBarBottom;
