import React from "react";
import Image from "next/image";

interface RatingStarProps {
  rating: number;
  interactive?: boolean;
}

const RatingStar = ({ rating, interactive = false }: RatingStarProps) => {
  const MAX_STARS = 5;

  return (
    <div className="flex gap-1 items-center animate-fade-in">
      {[...Array(MAX_STARS)].map((_, i) => (
        <div
          key={i}
          className={`
            transition-transform duration-200
            ${interactive ? "cursor-pointer hover:scale-110" : ""}
          `}
          role={interactive ? "button" : undefined}
          tabIndex={interactive ? 0 : undefined}
        >
          <Image
            width={24}
            height={24}
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/63ff4056e10165cf63568681_Star-icon-2.svg"
            alt={i < rating ? "filled star" : "empty star"}
            className={`
              transition-opacity duration-300
              ${i >= rating ? "opacity-30" : "opacity-100"}
            `}
          />
        </div>
      ))}
    </div>
  );
};

export default RatingStar;
