import { OurPartnersItemType } from "@/libs/types/Types";
import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

interface OurPartnersItemProps {
  item: OurPartnersItemType;
}

const OurPartnersItem = memo(({ item }: OurPartnersItemProps) => {
  return (
    <div className="block transition-all duration-300 hover:scale-105">
      <Link
        href={item.host}
        aria-label={item.alt}
        className="block rounded-lg"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="relative w-full aspect-[238/83] bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
          <Image
            width={238}
            height={83}
            alt={item.alt}
            src={item.icon}
            className="filter brightness-[21%] grayscale hover:filter-none w-full object-contain transition-all duration-300"
            loading="lazy"
            priority={false}
          />
        </div>
      </Link>
    </div>
  );
});

OurPartnersItem.displayName = "OurPartnersItem";

export default OurPartnersItem;
