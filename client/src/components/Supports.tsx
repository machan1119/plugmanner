import Image from "next/image";
import React from "react";

interface PaymentMethod {
  name: string;
  src: string;
  alt: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    name: "Visa",
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e6a_Frame%201000004137.png",
    alt: "Visa Payment Method",
  },
  {
    name: "Mastercard",
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e6c_Frame%201000004138.png",
    alt: "Mastercard Payment Method",
  },
  {
    name: "Google Pay",
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e70_Frame%201000004140.png",
    alt: "Google Pay Payment Method",
  },
  {
    name: "Apple Pay",
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e72_Frame%201000004148.png",
    alt: "Apple Pay Payment Method",
  },
  {
    name: "Crypto",
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e6e_Frame%201000004139.png",
    alt: "Crypto Payment Method",
  },
  {
    name: "Ethereum",
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e78_Frame%201000004149.png",
    alt: "Ethereum Payment Method",
  },
  {
    name: "Litecoin",
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e76_Frame%201000004150.png",
    alt: "Litecoin Payment Method",
  },
  {
    name: "Tether",
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e74_Frame%201000004151.png",
    alt: "Tether Payment Method",
  },
];

interface SupportsProps {
  className?: string;
  showLabels?: boolean;
}

const Supports: React.FC<SupportsProps> = ({
  className = "",
  showLabels = false,
}) => {
  return (
    <div
      className={`
        flex flex-wrap gap-2 p-2 
        rounded-lg bg-[#2b2b2b]
        shadow-soft
        ${className}
      `}
    >
      {paymentMethods.map((method) => (
        <div key={method.name} className="group relative">
          <div
            className="
            rounded-md overflow-hidden
            transition-transform duration-300
            hover:scale-105
            hover:shadow-hover
          "
          >
            <Image
              width={48}
              height={30}
              className="rounded-md"
              alt={method.alt}
              src={method.src}
            />
          </div>
          {showLabels && (
            <div
              className="
              absolute -bottom-6 left-1/2 -translate-x-1/2
              px-2 py-1
              bg-black/80 text-white text-xs
              rounded-md
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
              whitespace-nowrap
            "
            >
              {method.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Supports;
