import MainButton from "@/components/Buttons";
import FreeTrial from "./Freetrial";
import { youtubeIcon, linkedinIcon, twitterIcon } from "./svg";
import Link from "next/link";
export default function FollowUs() {
  return (
    <div className="border-t-[1px] border-[#e5e7eb40] pt-4 sm:border-none sm:sm:mt-4 sm:border-t-[1px] sm:border-[#e5e7eb40] md:border-none md:pt-0 md:mt-0">
      <div className="font-clash mb-4 leading-5 text-base md:text-xl font-semibold">
        FollowUs
      </div>
      <div className="flex gap-x-4">
        <Link href="https://www.youtube.com/@socialplug">{youtubeIcon}</Link>
        <Link href="https://twitter.com/socialplugio"> {twitterIcon}</Link>
        <Link href="https://www.linkedin.com/company/socialplug-io/">
          {linkedinIcon}
        </Link>
      </div>
      <div className="font-clash mt-4 mb-4 leading-5 text-xl font-semibold">
        Receive Exclusive Offers
      </div>
      <form className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-[14px] py-[10px] leading-[22px] text-[16px] rounded-lg border-[1px] border-solid border-[#ebebeb] focus:outline-none text-black"
        />
        <MainButton type="green-main" title="Subscribe" />
      </form>
      <FreeTrial />
    </div>
  );
}
