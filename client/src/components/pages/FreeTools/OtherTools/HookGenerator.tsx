import { StrapiText } from "@/components/StrapiComponents";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import { useState, useRef, useEffect } from "react";

export default function HookGenerator() {
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [variations, setVariations] = useState(3);
  const [hooks, setHooks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { freeToolItem } = useFreeTools();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!freeToolItem?.Header) {
    return null;
  }
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 300) {
      setDescription(value);
    } else {
      setDescription(value.substring(0, 300));
    }
  };

  const generateHooks = async () => {
    if (!description.trim() || !goal.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://freetools.socialplug.io/hook-generator/api/generate-hooks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description, goal, variations }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate hooks");
      }

      const { hooks } = await response.json();
      setHooks(hooks);
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred while generating hooks. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hooks.join("\n"));
      // You might want to add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="w-full py-6 md:py-14 lg:py-[64px] gap-6 md:gap-14 lg:gap-16 bg-white flex flex-col items-center bg-[linear-gradient(#fffffff5,#fff),url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4de67a2ea65794f385ee_perspective-grid-black.webp')] bg-[position:0_0,50%_0] bg-[size:auto,contain] bg-no-repeat">
      <div className="max-w-[1366px] w-full flex flex-col gap-4 items-center px-10">
        <h1>
          <StrapiText
            data={freeToolItem?.Header.text}
            customClassName="!font-service text-wrap !text-center lg:!text-left"
          />
        </h1>
        <div className="w-full max-w-4xl min-h-[410px] mt-10 p-8 bg-white flex flex-col items-center gap-10 rounded-xl">
          <div className="flex flex-col md:flex-row gap-16 w-full">
            <div className="flex flex-col gap-6 w-[60%] relative">
              <div className="flex flex-col gap-4">
                <label className="text-xl font-normal">
                  Content description:
                </label>
                <div className="relative">
                  <textarea
                    value={description}
                    onChange={handleInput}
                    className="w-full min-h-[90px] p-4 border border-gray-300 rounded-lg text-base resize-y"
                    placeholder="Describe your content in detail..."
                    maxLength={300}
                  />
                  <div className="absolute bottom-2 right-4 text-gray-500 text-sm">
                    {description.length} / 300
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-xl font-normal mt-6">
                  Content Goal:
                </label>
                <input
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full h-10 p-4 border border-gray-300 rounded-lg text-base"
                  type="text"
                  placeholder="What's the main goal of your content?"
                />
              </div>

              <button
                onClick={generateHooks}
                disabled={isLoading}
                className="w-full mt-4 p-4 transition-all hover:gap-6 bg-primary text-white rounded-2xl text-2xl font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <svg
                  width="23"
                  height="21"
                  viewBox="0 0 23 21"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.98549 0.188171C1.64313 0.188171 0.554932 1.27637 0.554932 2.61873V14.6595C0.554932 16.0018 1.64313 17.09 2.98549 17.09H3.82668V19.3517C3.82668 20.5273 5.14654 21.2197 6.11389 20.5515L11.1248 17.09H20.0146C21.3569 17.09 22.4451 16.0018 22.4451 14.6595V2.61873C22.4451 1.27637 21.3569 0.188171 20.0146 0.188171H2.98549ZM3.82859 9.69393C3.82859 9.29123 4.15504 8.96476 4.55776 8.96476H12.6147C13.0174 8.96476 13.3438 9.29123 13.3438 9.69393C13.3438 10.0966 13.0174 10.4231 12.6147 10.4231H4.55776C4.15504 10.4231 3.82859 10.0966 3.82859 9.69393ZM18.4423 12.4492C18.845 12.4492 19.1714 12.7757 19.1714 13.1784C19.1714 13.5811 18.845 13.9075 18.4423 13.9075H10.3854C9.98268 13.9075 9.65621 13.5811 9.65621 13.1784C9.65621 12.7757 9.98268 12.4492 10.3854 12.4492H18.4423ZM15.0889 9.69393C15.0889 9.29123 15.4154 8.96476 15.8181 8.96476H18.4426C18.8453 8.96476 19.1717 9.29123 19.1717 9.69393C19.1717 10.0966 18.8453 10.4231 18.4426 10.4231H15.8181C15.4154 10.4231 15.0889 10.0966 15.0889 9.69393ZM7.18199 12.4492C7.5847 12.4492 7.91116 12.7757 7.91116 13.1784C7.91116 13.5811 7.5847 13.9075 7.18199 13.9075H4.55749C4.15478 13.9075 3.82833 13.5811 3.82833 13.1784C3.82833 12.7757 4.15478 12.4492 4.55749 12.4492H7.18199Z"
                    fill="white"
                  ></path>
                </svg>
                <span className="font-clash-display">Generate Hooks</span>
              </button>
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <label className="text-xl font-normal">Variants</label>
              <div className="relative w-full" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-2 pl-4 bg-white border border-gray-300 rounded-lg text-lg text-left flex justify-between items-center"
                >
                  {variations}
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-lg shadow-md">
                    <div
                      onClick={() => {
                        setVariations(1);
                        setIsDropdownOpen(false);
                      }}
                      className="p-4 text-lg cursor-pointer hover:bg-gray-100"
                    >
                      1
                    </div>
                    <div
                      onClick={() => {
                        setVariations(3);
                        setIsDropdownOpen(false);
                      }}
                      className="p-4 text-lg cursor-pointer hover:bg-gray-100"
                    >
                      3
                    </div>
                    <div
                      onClick={() => {
                        setVariations(5);
                        setIsDropdownOpen(false);
                      }}
                      className="p-4 text-lg cursor-pointer hover:bg-gray-100"
                    >
                      5
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {error && (
            <div className="text-[#d32f2f] rounded-md bg-[#fdecea] p-[10px] text-center text-base font-satoshi">
              {error}
            </div>
          )}
          {hooks.length > 0 && (
            <div className="w-full flex gap-5 flex-col border-2 rounded-2xl border-primary">
              <div className="absolute right-4 top-4">
                <button
                  onClick={() => setHooks([])}
                  className="bg-white/20 hover:bg-white rounded-lg p-1"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 13.521L7.39583 18.6251C7.25 18.771 7.07986 18.8439 6.88542 18.8439C6.69097 18.8439 6.52083 18.771 6.375 18.6251C6.22917 18.4793 6.15625 18.3091 6.15625 18.1147C6.15625 17.9203 6.22917 17.7501 6.375 17.6043L11.4792 12.5001L6.375 7.39596C6.22917 7.25012 6.15625 7.07998 6.15625 6.88554C6.15625 6.69109 6.22917 6.52096 6.375 6.37512C6.52083 6.22929 6.69097 6.15637 6.88542 6.15637C7.07986 6.15637 7.25 6.22929 7.39583 6.37512L12.5 11.4793L17.6042 6.37512C17.75 6.22929 17.9201 6.15637 18.1146 6.15637C18.309 6.15637 18.4792 6.22929 18.625 6.37512C18.7708 6.52096 18.8437 6.69109 18.8437 6.88554C18.8437 7.07998 18.7708 7.25012 18.625 7.39596L13.5208 12.5001L18.625 17.6043C18.7708 17.7501 18.8437 17.9203 18.8437 18.1147C18.8437 18.3091 18.7708 18.4793 18.625 18.6251C18.4792 18.771 18.309 18.8439 18.1146 18.8439C17.9201 18.8439 17.75 18.771 17.6042 18.6251L12.5 13.521Z"
                      fill="black"
                      fillOpacity="0.3"
                    />
                  </svg>
                </button>
              </div>
              <ol className="px-4 pt-4 relative list-decimal pl-8 list-outside">
                {hooks.map((hook, index) => (
                  <li key={index} className="mb-2">
                    {hook}
                  </li>
                ))}
              </ol>
              <div className="px-4">
                <hr className="border-[1.5px]" />
              </div>
              <div className="px-4 pb-4 flex items-center justify-between">
                <button
                  onClick={generateHooks}
                  className="gap-1 text-white px-3 bg-primary rounded-full flex p-1 items-center justify-center"
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
                  className="gap-1 text-white px-3 bg-primary rounded-full flex p-1 items-center justify-center"
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
        </div>
        <StrapiText
          data={freeToolItem.SimpleDescription.text}
          customClassName="font-service-text !text-[20px] !text-center w-[70%] md:w-[50%]"
        />
      </div>
    </section>
  );
}
