import React from "react";
import { useTranslations } from "next-intl";
type ButtonType = "white-main" | "primary";
type ButtonSize = "sm" | "md" | "lg";

interface MainButtonProps {
  type: ButtonType;
  title: string;
  customClass?: string;
  customChildClass?: string;
  handleClick?: () => void;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}

const MainButton = ({
  type,
  title,
  customClass,
  customChildClass,
  handleClick,
  size = "md",
  disabled = false,
  loading = false,
}: MainButtonProps) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const baseClasses =
    "font-clash font-semibold rounded-[10px] transition-all duration-300 animate-fade-in border";
  const disabledClasses = "opacity-50 cursor-not-allowed";
  const loadingClasses = "relative text-transparent";

  const buttonClasses = `
    ${baseClasses}
    ${disabled ? disabledClasses : ""}
    ${loading ? loadingClasses : ""}
    ${customClass || ""}
  `;

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {type === "white-main" ? (
        <p
          className={`bg-white text-text-primary hover:bg-black-medium hover:shadow-hover rounded-[10px] ${
            sizeClasses[size]
          } ${customChildClass || ""}`}
        >
          {title}
        </p>
      ) : (
        <p
          className={`bg-gradient-to-t from-primary to-accent text-white hover:bg-accent hover:shadow-hover rounded-[10px] ${
            sizeClasses[size]
          } ${customChildClass || ""}`}
        >
          {title}
        </p>
      )}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
};

interface SwitchButtonProps {
  status: "Services" | "Tools";
  setStatus: React.Dispatch<React.SetStateAction<"Services" | "Tools">>;
  customClass?: string;
}

export const SwitchButton = ({
  status,
  setStatus,
  customClass,
}: SwitchButtonProps) => {
  const t = useTranslations("Home");
  return (
    <div
      className={`bg-background-light rounded-full flex border border-black-dark p-1 shadow-soft animate-fade-in ${customClass}`}
    >
      <button
        onClick={() => setStatus("Services")}
        className={`
          w-full lg:w-fit px-6 py-3 border font-clash text-base font-semibold rounded-full
          transition-all duration-300
          ${
            status === "Tools"
              ? "border-transparent text-text-light hover:text-primary"
              : "bg-primary border-black-dark text-white shadow-soft"
          }
        `}
      >
        {t("Services.SwitchButton.Services")}
      </button>
      <button
        onClick={() => setStatus("Tools")}
        className={`
          w-full lg:w-fit px-6 py-3 border font-clash text-base font-semibold rounded-full
          transition-all duration-300
          ${
            status === "Tools"
              ? "bg-primary border-black-dark text-white shadow-soft"
              : "border-transparent text-text-light hover:text-primary"
          }
        `}
      >
        {t("Services.SwitchButton.Tools")}
      </button>
    </div>
  );
};

export default MainButton;
