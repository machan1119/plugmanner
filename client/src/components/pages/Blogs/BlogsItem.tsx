import { Article } from "@/libs/types/BlogsDataType";
import { generate_item_url_from_blog_title } from "@/utils/functions";
import Image from "next/image";

interface BlogsItemProps {
  item: Article;
  descriptionShow: boolean;
}

export default function BlogsItem({ item, descriptionShow }: BlogsItemProps) {
  return (
    <a
      href={`/blog/${generate_item_url_from_blog_title(item.title)}`}
      className="flex flex-col gap-2 items-start max-w-[350px] w-full cursor-pointer"
    >
      <Image
        src={item.img}
        alt="Blog item image"
        width={350}
        height={210}
        className="w-full rounded-lg"
      />
      <p className="font-clash text-[18px] leading-6 text-[#14141b] font-semibold">
        {item.title}
      </p>
      {descriptionShow && (
        <p className="font-satoshi text-[18px] leading-7 text-[#686889] font-normal">
          {item.simpleDescription}
        </p>
      )}
      <button className="mt-4 text-base text-primary font-medium">
        Read More {">"}
      </button>
    </a>
  );
}
