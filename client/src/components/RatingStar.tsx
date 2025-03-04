import React from "react";
import Image from "next/image";

const RatingStar = ({ rating }: { rating: number }) => {
  const MAX_STARS = 5;
  return (
    <div className="flex gap-2">
      {[...Array(MAX_STARS)].map((_, i) => (
        <Image
          key={i}
          width={24}
          height={24}
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/63ff4056e10165cf63568681_Star-icon-2.svg"
          alt={i < rating ? "filled star" : "empty star"}
          className={`w-6 h-6 ${i >= rating ? "opacity-30" : ""}`}
        />
      ))}
    </div>
  );
};

export default RatingStar;
