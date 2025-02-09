import { OurPartnersItemType } from "@/libs/types/Types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OurPartnersItem = ({ item }: { item: OurPartnersItemType }) => {
  return (
    <Link href={item.host}>
      <Image
        width={238}
        height={83}
        alt={item.alt}
        src={item.icon}
        className="filter brightness-[21%] grayscale hover:filter-none w-auto h-auto"
      />
    </Link>
  );
};

export default OurPartnersItem;
