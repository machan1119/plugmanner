import FollowUs from "./Followus";
import Summary from "./Summary";
import SellingService from "./SellingService";
import FreeTool from "./FreeTool";
import Supports from "@/components/Supports";
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
          <Supports />
        </div>
      </div>
    </div>
  );
}
