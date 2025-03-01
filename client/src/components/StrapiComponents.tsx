import { ParagraphType, Text } from "@/libs/types/ServiceJsonDataType";
import Image from "next/image";
import Link from "next/link";

interface StrapiTextType {
  data: Text[];
  customClassName?: string;
}

export function StrapiText({ data, customClassName }: StrapiTextType) {
  return (
    <div className={`${customClassName}`}>
      {data?.map((item, index) =>
        item.link ? (
          <Link
            href={item.link}
            className={`${item.bold ? "font-semibold " : ""}underline`}
            style={{ color: item.color }}
            key={index}
          >
            {item.content}
          </Link>
        ) : (
          <span
            key={index}
            className={`${item.bold ? "font-semibold " : ""}`}
            style={{ color: item.color }}
          >
            {item.content}
          </span>
        )
      )}
    </div>
  );
}

interface StrapiParagraphType {
  paragraph: ParagraphType[];
  customClassName?: string;
  customParentClassName?: string;
}

export function StrapiParagraph({
  paragraph,
  customClassName,
  customParentClassName,
}: StrapiParagraphType) {
  return (
    <div
      className={`flex flex-col gap-4 items-start w-full ${customParentClassName}`}
    >
      {paragraph?.map((item, index) => (
        <div className={"flex gap-3 items-start"} key={index}>
          {item.icon ? (
            <Image
              width={16}
              height={16}
              src={`${item.icon}`}
              alt="checkmark icon"
              className="w-[16px] h-[16px] mr-1 mt-[6px]"
            />
          ) : (
            ""
          )}
          <StrapiText data={item.text} customClassName={customClassName} />
        </div>
      ))}
    </div>
  );
}
