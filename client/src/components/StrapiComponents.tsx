import { ParagraphType, Text } from "@/libs/types/ServiceJsonDataType";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface StrapiTextType {
  data: Text[];
  customClassName?: string;
}

const StrapiText = memo(({ data, customClassName = "" }: StrapiTextType) => {
  return (
    <div className={`${customClassName}`}>
      {data?.map((item, index) => {
        const baseClasses = `
          transition-colors duration-200
          ${item.bold ? "font-semibold" : ""}
        `;

        if (item.link) {
          return (
            <Link
              href={item.link}
              className={`
                ${baseClasses}
                underline hover:text-primary
              `}
              style={{ color: item.color }}
              key={index}
            >
              {item.content}
            </Link>
          );
        }

        return (
          <span
            key={index}
            className={baseClasses}
            style={{ color: item.color }}
          >
            {item.content}
          </span>
        );
      })}
    </div>
  );
});

StrapiText.displayName = "StrapiText";

interface StrapiParagraphType {
  paragraph: ParagraphType[];
  customClassName?: string;
  customParentClassName?: string;
  variant?: "default" | "list" | "grid";
  iconSize?: "sm" | "md" | "lg";
}

const StrapiParagraph = memo(
  ({
    paragraph,
    customClassName = "",
    customParentClassName = "",
    variant = "default",
    iconSize = "md",
  }: StrapiParagraphType) => {
    const iconSizeClasses = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    };

    const variantClasses = {
      default: "flex flex-col gap-4 items-start w-full",
      list: "flex flex-col gap-3 items-start w-full",
      grid: "grid grid-cols-1 md:grid-cols-2 gap-4 w-full",
    };

    return (
      <div
        className={`
        ${variantClasses[variant]}
        ${customParentClassName}
        animate-fade-in
      `}
      >
        {paragraph?.map((item, index) => (
          <div
            className={`
            flex gap-3 items-start
            transition-transform duration-200
          `}
            key={index}
          >
            {item.icon && (
              <div
                className={`
              relative
              ${iconSizeClasses[iconSize]}
              flex-shrink-0
              animate-fade-in
            `}
              >
                <Image
                  width={24}
                  height={24}
                  src={item.icon}
                  alt="checkmark icon"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <StrapiText data={item.text} customClassName={customClassName} />
          </div>
        ))}
      </div>
    );
  }
);

StrapiParagraph.displayName = "StrapiParagraph";

export { StrapiText, StrapiParagraph };
