import { SupportedLocale } from "@/libs/types/Types";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import { generate_item_url } from "@/utils/functions";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const LocaleLinks = {
  en: "services",
  "es-ES": "servicios",
  de: "dienstleistungen",
  "pt-BR": "serviços",
};

export default function FreeToolsRelatedServices() {
  const { freeToolItem } = useFreeTools();
  const locale = useLocale() as SupportedLocale;
  if (!freeToolItem) return;
  if (freeToolItem?.Orders.length == 0) {
    return;
  }

  return (
    <section className="w-full py-6 md:py-[80px] bg-black-light flex flex-col items-center border-b-[1px] border-black-dark">
      <div className="max-w-[1366px] w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center px-5 lg:px-20">
        {freeToolItem.Orders.map((orderItem, index) => (
          <Link
            href={`/${LocaleLinks[locale]}/${generate_item_url(
              orderItem.subservice.header.text
            )}`}
            className="p-6 flex flex-col gap-1 bg-white border-white hover:bg-primary/20 hover:border-primary border-[1px] rounded-md animate-fade-in transition-all duration-500"
            key={index}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${freeToolItem.order_icon.url}`}
              alt={orderItem.subservice.name}
              width={40}
              height={40}
              className="rounded-full mb-2"
            />
            <p className="text-base text-black lato-bold font-bold leading-4">
              {orderItem.Title}
            </p>
            <p className="font-satoshi text-[14px] font-normal text-primary mb-4">
              Starting from $
              {orderItem.subservice.introduction.OrderIntro.price}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
