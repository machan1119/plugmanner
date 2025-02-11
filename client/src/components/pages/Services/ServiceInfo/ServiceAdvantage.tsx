import Image from "next/image";
import React from "react";

const ServiceAdvantage = () => {
  return (
    <div className="w-max px-4 py-3 flex gap-4 items-center bg-[#f6faff] border-[1px] border-black-medium rounded-lg">
      <div className="flex font-service-text text-[14px]">
        <Image
          width={16}
          height={16}
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/628fdb670c2e9e80264b9f41_Coinboosts-check-green.svg"
          alt="checkmark icon"
          className="mr-2"
        />
        Instant Delivery
      </div>
      <div className="flex font-service-text text-[14px]">
        <Image
          width={16}
          height={16}
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/628fdb670c2e9e80264b9f41_Coinboosts-check-green.svg"
          alt="checkmark icon"
          className="mr-2"
        />
        100% Growth Guarantee
      </div>
      <div className="flex font-service-text text-[14px]">
        <Image
          width={16}
          height={16}
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/628fdb670c2e9e80264b9f41_Coinboosts-check-green.svg"
          alt="checkmark icon"
          className="mr-2"
        />
        24/7 Customer Service
      </div>
    </div>
  );
};

export default ServiceAdvantage;
