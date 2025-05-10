import { StrapiText } from "@/components/StrapiComponents";
import { useFreeTools } from "@/providers/FreeToolsProvider";

export default function TwitterUsernameChecker() {
  const { freeToolItem } = useFreeTools();
  if (!freeToolItem?.Header) return null;

  return (
    <section className="w-full py-6 lg:py-[64px] gap-6 md:gap-14 lg:gap-16 bg-white flex flex-col items-center bg-[linear-gradient(#fffffff5,#fff),url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4de67a2ea65794f385ee_perspective-grid-black.webp')] bg-[position:0_0,50%_0] bg-[size:auto,contain] bg-no-repeat">
      <div className="max-w-[1366px] mx-auto px-4 py-5 flex flex-col gap-5 items-center">
        <h1>
          <StrapiText
            data={freeToolItem?.Header.text}
            customClassName="!font-service text-wrap !text-center lg:!text-left"
          />
        </h1>
        <StrapiText
          data={freeToolItem?.SimpleDescription.text}
          customClassName="font-service-text !text-[20px] !text-center w-[70%]"
        />
        <iframe
          width="100%"
          style={{ border: "none", borderRadius: "8px" }}
          src="https://twitter-check.socialplug.io/"
        ></iframe>
      </div>
    </section>
  );
}
