import React from "react";

const MainButton = ({ type, title }: { type: string; title: string }) => {
  if (type == "white-main") {
    return (
      <button className="bg-[#fff] text-[#363636] font-['ClashDisplay-Variable'] font border-[1px] border-[#ebebeb] hover:bg-[#ebebeb] px-6 py-[14px] font-semibold transition-all rounded-[10px] leading-5">
        {title}
      </button>
    );
  } else if (type == "green-main") {
    return (
      <button className="bg-[#01c573] text-[#fff] font-['ClashDisplay-Variable'] border-[1px] border-[#ffffff80] hover:bg-[#017645] px-6 py-[14px] font-semibold transition-all rounded-[10px] leading-5">
        {title}
      </button>
    );
  }
  return <div>MainButton</div>;
};

export default MainButton;
