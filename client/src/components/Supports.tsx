import Image from "next/image";
import React from "react";

const Supports = () => {
  return (
    <div className="flex gap-x-[6px] p-1 rounded-[6px] bg-[#2b2b2b]">
      <Image
        width={155}
        height={96}
        className="rounded overflow-hidden w-[48px] h-[30px]"
        alt="Visa Payment Method"
        src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e6a_Frame%201000004137.png"
      />
      <span className="rounded-[4px] overflow-hidden">
        <Image
          width={155}
          height={96}
          className="rounded overflow-hidden w-[48px] h-[30px]"
          alt="Mastercard Payment Method"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e6c_Frame%201000004138.png"
        />
      </span>
      <span className="rounded-[4px] overflow-hidden">
        <Image
          width={155}
          height={96}
          className="rounded overflow-hidden w-[48px] h-[30px]"
          alt="Google Pay Payment Method"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e70_Frame%201000004140.png"
        />
      </span>
      <span className="rounded-[4px] overflow-hidden">
        <Image
          width={155}
          height={96}
          className="rounded overflow-hidden w-[48px] h-[30px]"
          alt="Apple Pay Payment Method"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e72_Frame%201000004148.png"
        />
      </span>
      <span className="rounded-[4px] overflow-hidden">
        <Image
          width={155}
          height={96}
          className="rounded overflow-hidden w-[48px] h-[30px]"
          alt="Crypto Payment Method"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e6e_Frame%201000004139.png"
        />
      </span>
      <span className="rounded-[4px] overflow-hidden">
        <Image
          width={155}
          height={96}
          className="rounded overflow-hidden w-[48px] h-[30px]"
          alt="Ethereum Payment Method"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e78_Frame%201000004149.png"
        />
      </span>
      <span className="rounded-[4px] overflow-hidden">
        <Image
          width={155}
          height={96}
          className="rounded overflow-hidden w-[48px] h-[30px]"
          alt="Litecoin Payment Method"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e76_Frame%201000004150.png"
        />
      </span>
      <span className="rounded-[4px] overflow-hidden">
        <Image
          width={155}
          height={96}
          className="rounded overflow-hidden w-[48px] h-[30px]"
          alt="Tether Payment Method"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e74_Frame%201000004151.png"
        />
      </span>
    </div>
  );
};

export default Supports;
