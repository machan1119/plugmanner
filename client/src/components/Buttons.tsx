import React from "react";

interface MainButtonProps {
  type: string;
  title: string;
  customClass?: string;
  handleClick?: () => void;
}

const MainButton = ({
  type,
  title,
  customClass,
  handleClick,
}: MainButtonProps) => {
  return (
    <button
      className={`size-max text-[14px] md:text-[16px] ${customClass}`}
      onClick={handleClick}
    >
      {type == "white-main" ? (
        <p className="bg-[#fff] text-[#363636] font-clash border-[1px] border-[#ebebeb] hover:bg-[#ebebeb] px-5 py-3 font-semibold transition-all rounded-[10px] leading-5">
          {title}
        </p>
      ) : (
        <p className="bg-[#01c573] text-[#fff] font-clash border-[1px] border-[#ffffff80] hover:bg-[#017645] px-5 py-3 font-semibold transition-all rounded-[10px] leading-5">
          {title}
        </p>
      )}
    </button>
  );
};

export const SwitchButton = ({
  status,
  setStatus,
}: {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="bg-black-light rounded-full flex border-[1px] border-black-dark p-1">
      <button
        onClick={() => setStatus("services")}
        className={`px-[26px] py-[12px] border-[1px] font-clash text-[14px] lg:text-[20px] font-semibold rounded-full ${
          status == "tools"
            ? "border-transparent text-[rgba(0,_0,_0,_0.5)] hover:text-green-light"
            : "bg-green-light border-black-dark text-white"
        }`}
      >
        Services
      </button>
      <button
        onClick={() => setStatus("tools")}
        className={`px-[26px] py-[12px] border-[1px] font-clash text-[14px] lg:text-[20px] font-semibold rounded-full ${
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
