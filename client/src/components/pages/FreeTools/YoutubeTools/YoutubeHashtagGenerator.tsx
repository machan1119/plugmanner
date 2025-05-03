import { StrapiText } from "@/components/StrapiComponents";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import React, { useState } from "react";

export default function YoutubeHashtagGenerator() {
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [error, setError] = useState("");
  const { freeToolItem } = useFreeTools();
  if (!freeToolItem?.Header) return;
  const handleGenerate = async () => {
    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        "https://ythashtaggenerator.socialplug.io/api/youtube-hashtags-generator",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }),
        }
      );
      if (!res.ok) throw new Error("Failed to generate hashtags");
      const data = await res.json();
      setHashtags(data.hashtags || []);
      setShowResponse(true);
    } catch {
      setError(
        "An error occurred while generating hashtags. Please try again later."
      );
      setHashtags([]);
      setShowResponse(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!hashtags.length) return;
    navigator.clipboard.writeText(hashtags.join("\n"));
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
        <div className="max-w-[535px] mt-8 w-full">
          <label className="block font-normal text-[20.6px] mb-3 font-satoshi">
            Describe your video (200 characters max)
          </label>
          <textarea
            className="w-full min-h-[101px] p-4 text-[20px] font-normal border border-gray-300 rounded-lg resize-vertical font-satoshi placeholder:text-gray-400"
            placeholder="Type or paste your text here"
            maxLength={200}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="text-right text-gray-400 text-sm mt-1">
            {description.length}/200
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="max-w-[535px] w-full -translate-y-px p-4 bg-primary rounded-xl text-white font-clashDisplay text-2xl font-semibold cursor-pointer hover:bg-primary transition"
        >
          <div className="flex items-center justify-center gap-2 hover:gap-6 transition-all">
            <span>Generate Hashtags</span>
            {/* SVG icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 17 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.40138 11.4444L4.81012 7.55556H0.722221V5.61111H5.0145L5.52542 0.75H7.48053L6.96962 5.61111H10.8478L11.3587 0.75H13.3139L12.803 5.61111H16.2778V7.55556H12.5986L12.1899 11.4444H16.2778V13.3889H11.9855L11.4746 18.25H9.51947L10.0304 13.3889H6.15217L5.64125 18.25H3.68609L4.19701 13.3889H0.722221V11.4444H4.40138ZM6.35654 11.4444H10.2347L10.6435 7.55556H6.76526L6.35654 11.4444Z"
                fill="white"
              />
            </svg>
          </div>
        </button>
        {error && (
          <div className="text-[#d32f2f] rounded-md bg-[#fdecea] p-[10px] text-center text-base font-satoshi">
            {error}
          </div>
        )}

        {/* Response Box */}
        {showResponse && (
          <div className="w-full flex flex-col gap-5 border-2 border-primary rounded-2xl mt-3 relative bg-white">
            <button
              className="absolute right-4 top-4 bg-white/20 rounded-lg p-1"
              onClick={() => setShowResponse(false)}
              aria-label="Close"
            >
              {/* Close Icon */}
              <svg width="20" height="20" viewBox="0 0 25 25" fill="none">
                <path
                  d="M6 6L19 19M19 6L6 19"
                  stroke="black"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <ol className="pl-8 pr-4 pt-4 list-decimal relative">
              {hashtags.length > 0 ? (
                hashtags.map((hashtag, i) => (
                  <li key={i} className="mb-1">
                    {hashtag}
                  </li>
                ))
              ) : (
                <li>No hashtags generated.</li>
              )}
            </ol>
            <div className="px-4">
              <hr className="border-1.5" />
            </div>
            <div className="px-4 pb-4 flex items-center justify-between gap-2">
              <button
                onClick={handleGenerate}
                className="flex gap-1 text-white px-3 py-1 bg-primary rounded-full items-center justify-center hover:bg-primary"
                disabled={loading}
              >
                {/* Repeat Icon */}
                <svg width="15" height="20" viewBox="0 0 15 20" fill="none">
                  <path
                    d="M8.59983 7.95482C8.72816 7.56982 9.27183 7.56982 9.40016 7.95482L10.1527 10.2146C10.3183 10.7114 10.5974 11.1628 10.9677 11.533C11.3381 11.9031 11.7896 12.182 12.2865 12.3473L14.5452 13.0998C14.9302 13.2281 14.9302 13.7718 14.5452 13.9001L12.2853 14.6526C11.7886 14.8183 11.3372 15.0974 10.967 15.4677C10.5968 15.8381 10.318 16.2896 10.1527 16.7865L9.40016 19.0452C9.3725 19.1295 9.31891 19.2029 9.24705 19.2549C9.17519 19.307 9.08873 19.335 9 19.335C8.91127 19.335 8.82481 19.307 8.75295 19.2549C8.68109 19.2029 8.6275 19.1295 8.59983 19.0452L7.84733 16.7853C7.68181 16.2887 7.40293 15.8374 7.03276 15.4672C6.66259 15.0971 6.21131 14.8182 5.71466 14.6526L3.45483 13.9001C3.37053 13.8725 3.29711 13.8189 3.24507 13.747C3.19302 13.6752 3.165 13.5887 3.165 13.5C3.165 13.4113 3.19302 13.3248 3.24507 13.2529C3.29711 13.1811 3.37053 13.1275 3.45483 13.0998L5.71466 12.3473C6.21131 12.1818 6.66259 11.9029 7.03276 11.5327C7.40293 11.1626 7.68181 10.7113 7.84733 10.2146L8.59983 7.95482ZM4.093 2.00598C4.10973 1.95546 4.14195 1.91149 4.1851 1.88033C4.22824 1.84917 4.28011 1.8324 4.33333 1.8324C4.38655 1.8324 4.43842 1.84917 4.48156 1.88033C4.52471 1.91149 4.55693 1.95546 4.57366 2.00598L5.02516 3.36165C5.227 3.96598 5.70066 4.43965 6.305 4.64148L7.66066 5.09298C7.71119 5.10971 7.75515 5.14194 7.78631 5.18508C7.81748 5.22823 7.83425 5.2801 7.83425 5.33332C7.83425 5.38654 7.81748 5.4384 7.78631 5.48155C7.75515 5.52469 7.71119 5.55692 7.66066 5.57365L6.305 6.02515C6.00677 6.12413 5.73577 6.29137 5.51358 6.51356C5.29139 6.73575 5.12414 7.00675 5.02516 7.30498L4.57366 8.66065C4.55693 8.71117 4.52471 8.75514 4.48156 8.7863C4.43842 8.81746 4.38655 8.83423 4.33333 8.83423C4.28011 8.83423 4.22824 8.81746 4.1851 8.7863C4.14195 8.75514 4.10973 8.71117 4.093 8.66065L3.6415 7.30498C3.54252 7.00675 3.37528 6.73575 3.15309 6.51356C2.93089 6.29137 2.65989 6.12413 2.36166 6.02515L1.006 5.57365C0.955475 5.55692 0.911509 5.52469 0.880347 5.48155C0.849185 5.4384 0.832413 5.38654 0.832413 5.33332C0.832413 5.2801 0.849185 5.22823 0.880347 5.18508C0.911509 5.14194 0.955475 5.10971 1.006 5.09298L2.36166 4.64148C2.65989 4.5425 2.93089 4.37526 3.15309 4.15307C3.37528 3.93088 3.54252 3.65988 3.6415 3.36165L4.093 2.00598ZM12.3402 0.782149C12.3517 0.74893 12.3733 0.720124 12.4019 0.699738C12.4306 0.679351 12.4648 0.668396 12.5 0.668396C12.5352 0.668396 12.5694 0.679351 12.5981 0.699738C12.6267 0.720124 12.6483 0.74893 12.6598 0.782149L12.9608 1.68515C13.095 2.08882 13.4112 2.40498 13.8148 2.53915L14.7178 2.84015C14.751 2.85167 14.7799 2.87325 14.8002 2.90189C14.8206 2.93054 14.8316 2.96482 14.8316 2.99998C14.8316 3.03514 14.8206 3.06943 14.8002 3.09807C14.7799 3.12672 14.751 3.1483 14.7178 3.15982L13.8148 3.46082C13.6161 3.52732 13.4355 3.63907 13.2873 3.78727C13.1391 3.93547 13.0273 4.11606 12.9608 4.31482L12.6598 5.21782C12.6483 5.25104 12.6267 5.27984 12.5981 5.30023C12.5694 5.32061 12.5352 5.33157 12.5 5.33157C12.4648 5.33157 12.4306 5.32061 12.4019 5.30023C12.3733 5.27984 12.3517 5.25104 12.3402 5.21782L12.0392 4.31482C11.9727 4.11606 11.8609 3.93547 11.7127 3.78727C11.5645 3.63907 11.3839 3.52732 11.1852 3.46082L10.2833 3.15982C10.2501 3.1483 10.2213 3.12672 10.2009 3.09807C10.1805 3.06943 10.1696 3.03514 10.1696 2.99998C10.1696 2.96482 10.1805 2.93054 10.2009 2.90189C10.2213 2.87325 10.2501 2.85167 10.2833 2.84015L11.1863 2.53915C11.59 2.40498 11.9062 2.08882 12.0403 1.68515L12.3402 0.782149Z"
                    fill="white"
                  />
                </svg>
                <span>More like this</span>
              </button>
              <button
                onClick={handleCopy}
                className="flex gap-1 text-white px-3 py-1 bg-primary rounded-full items-center justify-center hover:bg-primary"
              >
                {/* Copy Icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
        {/* Footer Example (optional) */}
        {/* <div className="text-center mt-7">
          <a
            href="https://socialplug.io/tools/youtube-hashtag-generator"
            className="text-gray-500 text-lg font-normal underline flex items-center gap-2 justify-center hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Try SocialPlug&#39;s Hashtag Generator</span> →
          </a>
        </div> */}
        <StrapiText
          data={freeToolItem.SimpleDescription.text}
          customClassName="font-service-text !text-[20px] !text-center w-[70%] md:w-[50%]"
        />
      </div>
    </section>
  );
}
