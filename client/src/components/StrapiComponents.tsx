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
              aria-label={item.content}
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
            {item.content ? item.content : <br />}
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
}

const StrapiParagraph = memo(
  ({
    paragraph,
    customClassName = "",
    customParentClassName = "",
    variant = "default",
  }: StrapiParagraphType) => {
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
      `}
      >
        {paragraph?.map((item, index) => (
          <div className={`flex gap-2 items-start`} key={index}>
            {item.icon && (
              <div
                className={`
              relative
              flex-shrink-0
              w-[16px] h-[16px]
            `}
              >
                <Image
                  width={16}
                  height={16}
                  src={item.icon}
                  alt="checkmark icon"
                  className="w-[16px] h-[16px] absolute top-[5px]"
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
