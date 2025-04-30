"use client";
import { useTransition, useState } from "react";
import Image from "next/image";
import { LanguageOption } from "@/libs/types/Types";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Locale } from "next-intl";
import { useParams } from "next/navigation";

type Props = {
  defaultValue: string;
  items: LanguageOption[];
};

export default function LocaleSwitcherSelect({ defaultValue, items }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const selectedItem = items.find((item) => item.code === selectedValue);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const item = (params.item ?? "").toString();

  async function onChange(value: string) {
    const nextLocale = value as Locale;
    startTransition(() => {
      router.replace(
        { pathname, params: { item: item } },
        { locale: nextLocale }
      );
    });
    setSelectedValue(value);
    setIsOpen(false);
  }

  return (
    <div className="relative w-[62px] h-[40px] flex justify-center md:mr-4">
      <button
        className="flex items-center p-2"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
      >
        {selectedItem && (
          <Image
            src={selectedItem.flag}
            alt={selectedItem.name}
            width={36}
            height={24}
            className="w-9 h-6 object-cover rounded-sm"
          />
        )}
        <Image
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e87_nav_dd-icon.svg"
          alt="arrow-down"
          priority
          width={16}
          height={16}
          className="w-4 h-4"
        />
      </button>

      {isOpen && (
        <ul className="absolute w-full bg-white border rounded shadow-lg z-10">
          {items.map((item) => (
            <li
              key={item.code}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onChange(item.code)}
            >
              <Image
                src={item.flag}
                alt={item.name}
                width={28}
                height={20}
                className="w-7 h-5 object-cover"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
