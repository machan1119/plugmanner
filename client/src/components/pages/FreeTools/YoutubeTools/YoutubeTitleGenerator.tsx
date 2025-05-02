import { StrapiText } from "@/components/StrapiComponents";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import { useState, useRef } from "react";

export default function YoutubeTitleGenerator() {
  const [description, setDescription] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { freeToolItem } = useFreeTools();
  if (!freeToolItem?.Header) return;
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setDescription(value);
    } else {
      setDescription(value.substring(0, 200));
    }
  };

  const generateContent = async () => {
    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://yttitlegenerator.socialplug.io/api/youtube-title-video",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate titles");
      }

      const data = await response.json();
      if (data.titles && Array.isArray(data.titles)) {
        setTitles(data.titles);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        "An error occurred while generating titles. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(titles.join("\n"));
      // You might want to add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="w-full py-6 md:py-14 lg:py-[64px] gap-6 md:gap-14 lg:gap-16 bg-white flex flex-col items-center bg-[linear-gradient(#fffffff5,#fff),url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4de67a2ea65794f385ee_perspective-grid-black.webp')] bg-[position:0_0,50%_0] bg-[size:auto,contain] bg-no-repeat">
      <div className="max-w-[1366px] w-full flex flex-col gap-[30px] items-center px-10">
        <h1>
          <StrapiText
            data={freeToolItem?.Header.text}
            customClassName="!font-service text-wrap !text-center lg:!text-left"
          />
        </h1>
        <div className="bg-white rounded-2xl max-w-[535px] w-full">
          <div className="mb-8">
            <label className="font-satoshi font-normal text-[20.6px] mb-3 block">
              Describe your video (200 characters max)
            </label>
            <textarea
              ref={textareaRef}
              value={description}
              onChange={handleInput}
              placeholder="Type or paste your text here"
              maxLength={200}
              className="w-full min-h-[101px] p-4 text-xl font-satoshi font-normal border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={generateContent}
            disabled={isLoading}
            className="w-full -translate-y-[1px] p-4 bg-emerald-500 border-none rounded-xl text-white font-clash-display text-2xl font-semibold cursor-pointer disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-2 transition-all duration-300 hover:gap-6">
              <span>Generate Titles</span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.53084 0.847651C8.44843 0.633909 10.4494 0.446426 12.5 0.446426C14.5506 0.446426 16.5516 0.633909 18.4691 0.847651C21.4548 1.18044 23.8537 3.57732 24.1737 6.56836C24.3779 8.47603 24.5536 10.4636 24.5536 12.5C24.5536 14.5363 24.3779 16.5239 24.1737 18.4316C23.8537 21.4227 21.4548 23.8196 18.4691 24.1523C16.5516 24.3661 14.5506 24.5536 12.5 24.5536C10.4494 24.5536 8.44843 24.3661 6.53084 24.1523C3.54521 23.8196 1.14626 21.4227 0.826255 18.4316C0.622155 16.5239 0.446426 14.5363 0.446426 12.5C0.446426 10.4636 0.622155 8.47603 0.826255 6.56836C1.14626 3.57732 3.54521 1.18044 6.53084 0.847651ZM8.32402 16.6853C8.12448 15.3812 7.90294 13.6699 7.90294 12.5C7.90294 11.3301 8.12457 9.61873 8.32418 8.31468C8.47943 7.30041 9.47832 6.65118 10.4539 6.96918C13.2863 7.89248 15.943 9.34687 17.7362 11.5763C18.1712 12.1171 18.1711 12.883 17.7361 13.4238C15.9427 15.6531 13.2862 17.1075 10.4537 18.0309C9.47814 18.3489 8.47921 17.6996 8.32402 16.6853Z"
                  fill="white"
                ></path>
              </svg>
            </div>
          </button>

          {error && (
            <div className="text-[#d32f2f] rounded-md bg-[#fdecea] p-[10px] text-center text-base font-satoshi">
              {error}
            </div>
          )}

          {titles.length > 0 && (
            <div className="relative w-full flex flex-col gap-5 border-2 border-emerald-500 rounded-2xl mt-3">
              <div className="absolute right-4 top-4">
                {/* Close button can be added here if needed */}
              </div>
              <ol className="p-4 pl-8 list-decimal">
                {titles.map((title, index) => (
                  <li key={index} className="mb-2">
                    {title}
                  </li>
                ))}
              </ol>
              <div className="px-4">
                <hr className="border-t-2" />
              </div>
              <div className="px-4 pb-4 flex items-center justify-between">
                <button
                  onClick={generateContent}
                  className="flex gap-1 text-white px-3 py-1 bg-emerald-500 rounded-full items-center justify-center"
                >
                  <svg
                    width="15"
                    height="20"
                    viewBox="0 0 15 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.59983 7.95482C8.72816 7.56982 9.27183 7.56982 9.40016 7.95482L10.1527 10.2146C10.3183 10.7114 10.5974 11.1628 10.9677 11.533C11.3381 11.9031 11.7896 12.182 12.2865 12.3473L14.5452 13.0998C14.9302 13.2281 14.9302 13.7718 14.5452 13.9001L12.2853 14.6526C11.7886 14.8183 11.3372 15.0974 10.967 15.4677C10.5968 15.8381 10.318 16.2896 10.1527 16.7865L9.40016 19.0452C9.3725 19.1295 9.31891 19.2029 9.24705 19.2549C9.17519 19.307 9.08873 19.335 9 19.335C8.91127 19.335 8.82481 19.307 8.75295 19.2549C8.68109 19.2029 8.6275 19.1295 8.59983 19.0452L7.84733 16.7853C7.68181 16.2887 7.40293 15.8374 7.03276 15.4672C6.66259 15.0971 6.21131 14.8182 5.71466 14.6526L3.45483 13.9001C3.37053 13.8725 3.29711 13.8189 3.24507 13.747C3.19302 13.6752 3.165 13.5887 3.165 13.5C3.165 13.4113 3.19302 13.3248 3.24507 13.2529C3.29711 13.1811 3.37053 13.1275 3.45483 13.0998L5.71466 12.3473C6.21131 12.1818 6.66259 11.9029 7.03276 11.5327C7.40293 11.1626 7.68181 10.7113 7.84733 10.2146L8.59983 7.95482Z"
                      fill="white"
                    />
                  </svg>
                  <span>More like this</span>
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex gap-1 text-white px-3 py-1 bg-emerald-500 rounded-full items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.52 2.22223H9.49118C8.11901 2.22222 7.03214 2.22221 6.18153 2.33703C5.30612 2.4552 4.59757 2.70417 4.03879 3.2652C3.48002 3.82622 3.23203 4.53761 3.11434 5.41654C2.99998 6.27056 2.99999 7.3618 3 8.73946V13.2798C3 14.4528 3.71552 15.458 4.73224 15.8794C4.67991 15.1721 4.67995 14.1796 4.68 13.3538V9.53147V9.45743C4.67995 8.46055 4.67989 7.60168 4.772 6.91387C4.8707 6.17675 5.0933 5.47017 5.66412 4.89705C6.23494 4.32393 6.9387 4.10045 7.67287 4.00134C8.35793 3.90887 9.21343 3.90892 10.2063 3.90897L10.28 3.90898H12.52L12.5937 3.90897C13.5866 3.90892 14.4402 3.90887 15.1252 4.00134C14.7154 2.9594 13.7035 2.22223 12.52 2.22223Z"
                      fill="white"
                    />
                    <path
                      d="M5.80008 9.53132C5.80008 7.41094 5.80008 6.35076 6.45616 5.69204C7.11224 5.03333 8.16819 5.03333 10.2801 5.03333H12.5201C14.632 5.03333 15.6879 5.03333 16.344 5.69204C17.0001 6.35076 17.0001 7.41095 17.0001 9.53132V13.2797C17.0001 15.4 17.0001 16.4602 16.344 17.1189C15.6879 17.7776 14.632 17.7776 12.5201 17.7776H10.2801C8.16819 17.7776 7.11224 17.7776 6.45616 17.1189C5.80008 16.4602 5.80008 15.4 5.80008 13.2797V9.53132Z"
                      fill="white"
                    />
                  </svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
          )}

          {/* <div className="text-center mt-7">
            <a
              href="#"
              className="text-gray-600 no-underline font-satoshi font-normal text-lg inline-flex items-center gap-2 hover:text-gray-800"
            >
              <span className="underline">
                Check out other AI-powered tools
              </span>
              <span>→</span>
            </a>
          </div> */}
          <StrapiText
            data={freeToolItem.SimpleDescription.text}
            customClassName="font-service-text !text-[20px] !text-center w-full mt-16"
          />
        </div>
      </div>
    </section>
  );
}
