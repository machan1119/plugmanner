import FollowUs from "./Followus";
import Summary from "./Summary";
import SellingService from "./SellingService";
import FreeTool from "./FreeTool";
import Image from "next/image";
export default function Footer() {
  return (
    <div
      className="pt-12 px-10 text-base text-white bg-black bg-center-top bg-no-repeat bg-[size:1234px] 
     bg-[image:url(https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ebe_footer_bg.webp)]"
    >
      <div className="mx-auto max-w-[1334px]">
        <div
          className="
          grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-14 border-solid border-b border-[#ffffff40] gap-x-16"
        >
          <Summary />
          <div className="block sm:row-span-2 lg:grid lg:col-span-2 lg:grid-cols-2 gap-x-20 justify-end">
            <SellingService />
            <FreeTool />
          </div>
          <FollowUs />
        </div>
        <div className="flex flex-col items-center md:flex-row md:justify-between py-4">
          <div>© SocialPlug 2025. All Rights Reserved.</div>
          <div className="flex gap-x-[6px] p-1 rounded-[6px] bg-[#2b2b2b]">
            <span className="rounded-[4px] overflow-hidden">
              <Image
                width={38}
                height={24}
                loading="lazy"
                alt="Visa Payment Method"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e6a_Frame%201000004137.png"
              />
            </span>
            <span className="rounded-[4px] overflow-hidden">
              <Image
                width={38}
                height={24}
                loading="lazy"
                alt="Mastercard Payment Method"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e6c_Frame%201000004138.png"
              />
            </span>
            <span className="rounded-[4px] overflow-hidden">
              <Image
                width={38}
                height={24}
                loading="lazy"
                alt="Google Pay Payment Method"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e70_Frame%201000004140.png"
              />
            </span>
            <span className="rounded-[4px] overflow-hidden">
              <Image
                width={38}
                height={24}
                loading="lazy"
                alt="Apple Pay Payment Method"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e72_Frame%201000004148.png"
              />
            </span>
            <span className="rounded-[4px] overflow-hidden">
              <Image
                width={38}
                height={24}
                loading="lazy"
                alt="Crypto Payment Method"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e6e_Frame%201000004139.png"
              />
            </span>
            <span className="rounded-[4px] overflow-hidden">
              <Image
                width={38}
                height={24}
                loading="lazy"
                alt="Ethereum Payment Method"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e78_Frame%201000004149.png"
              />
            </span>
            <span className="rounded-[4px] overflow-hidden">
              <Image
                width={38}
                height={24}
                loading="lazy"
                alt="Litecoin Payment Method"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e76_Frame%201000004150.png"
              />
            </span>
            <span className="rounded-[4px] overflow-hidden">
              <Image
                width={38}
                height={24}
                loading="lazy"
                alt="Tether Payment Method"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e74_Frame%201000004151.png"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
