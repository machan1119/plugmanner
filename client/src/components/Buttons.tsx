import React from "react";

const MainButton = ({ type, title }: { type: string; title: string }) => {
  if (type == "white-main") {
    return (
      <button className="bg-[#fff] text-[#363636] font-['ClashDisplay-Variable'] font border-[1px] border-[#ebebeb] hover:bg-[#ebebeb] px-6 py-3 font-semibold transition-all rounded-[10px] leading-5">
        {title}
      </button>
    );
  } else if (type == "green-main") {
    return (
      <button className="bg-[#01c573] text-[#fff] font-['ClashDisplay-Variable'] border-[1px] border-[#ffffff80] hover:bg-[#017645] px-6 py-3 font-semibold transition-all rounded-[10px] leading-5">
        {title}
      </button>
    );
  }
  return <div>MainButton</div>;
};

export const SwitchButton = ({
  status,
  setStatus,
}: {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="bg-[rgb(246_246_246)] rounded-full flex border-[1px] border-[rgb(224_224_224)] p-1">
      <button
        onClick={() => setStatus("services")}
        className={`px-[26px] py-[12px] border-[1px] font-['Clashdisplay-Variable'] text-[20px] leading-9 font-semibold rounded-full ${
          status == "tools"
            ? "border-transparent text-[rgba(0,_0,_0,_0.5)] hover:text-green-light"
            : "bg-green-light border-black-dark text-white"
        }`}
      >
        Services
      </button>
      <button
        onClick={() => setStatus("tools")}
        className={`px-[26px] py-[12px] border-[1px] font-['Clashdisplay-Variable'] text-[20px] leading-9 font-semibold rounded-full ${
          status == "tools"
            ? "text-white bg-green-light border-black-dark"
            : "border-transparent text-[rgba(0,_0,_0,_0.5)] hover:text-green-light"
        }`}
      >
        Free Tools
      </button>
    </div>
  );
};

export default MainButton;
