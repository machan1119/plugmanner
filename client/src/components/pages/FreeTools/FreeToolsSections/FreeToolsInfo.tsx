import React, { memo } from "react";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import { StrapiText } from "@/components/StrapiComponents";

const FreeToolsInfo = memo(() => {
  const { freeToolItem } = useFreeTools();
  if (!freeToolItem?.Header) {
    return null;
  }
  return (
    <section className="w-full py-6 md:py-14 lg:py-[64px] bg-white flex flex-col items-center">
      <div className="max-w-[1366px] w-full flex flex-col gap-4 items-center px-10">
        <h1>
          <StrapiText
            data={freeToolItem?.Header.text}
            customClassName="!font-service text-wrap !text-center lg:!text-left"
          />
        </h1>
        <StrapiText
          data={freeToolItem.SimpleDescription.text}
          customClassName="font-service-text !text-[20px] !text-center w-[70%] md:w-[50%]"
        />
      </div>
    </section>
  );
});

FreeToolsInfo.displayName = "FreeToolsInfo";

export default FreeToolsInfo;
