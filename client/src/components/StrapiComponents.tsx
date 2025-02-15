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
}

export function StrapiParagraph({
  paragraph,
  customClassName,
}: StrapiParagraphType) {
  return (
    <div className="flex flex-col gap-5 items-center justify-start w-full">
      {paragraph?.map((item, index) => (
        <div className="flex gap-3 w-full items-center" key={index}>
          {item.icon ? (
            <Image
              width={item.icon.width}
              height={item.icon.height}
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.icon.url}`}
              alt="checkmark icon"
              className="w-[16px] h-[16px] mr-1"
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
