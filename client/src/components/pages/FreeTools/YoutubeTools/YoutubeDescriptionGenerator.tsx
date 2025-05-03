import { StrapiText } from "@/components/StrapiComponents";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import React, { useState } from "react";

export default function YoutubeDescriptionGenerator() {
  const [videoTopic, setVideoTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const { freeToolItem } = useFreeTools();
  if (!freeToolItem?.Header) return;
  const handleGenerate = async () => {
    if (!videoTopic.trim() || !keywords.trim()) {
      setError("Please enter both a video topic and keywords.");
      return;
    }
    setError("");
    setLoading(true);
    setDescriptions([]);
    try {
      const response = await fetch(
        "https://ytdescriptiongenerator.socialplug.io/api/youtube-description-generator",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            video_topic: videoTopic.trim(),
            keywords: keywords.trim(),
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to generate descriptions");
      const { ret_response } = await response.json();
      const parsed: string[] = JSON.parse(ret_response);
      if (parsed) setDescriptions(parsed);
      else setDescriptions([]);

      setShowResult(true);
    } catch {
      setError(
        "An error occurred while generating descriptions. Please try again later."
      );
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!descriptions.length) return;
    navigator.clipboard.writeText(descriptions.join("\n"));
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
        <div className="max-w-[600px] w-full">
          <label className="block font-normal text-[24px] mb-3 font-satoshi">
            Video Topic:
          </label>
          <textarea
            className="w-full min-h-[115px] p-4 text-[20px] font-normal border border-gray-300 rounded-lg resize-vertical font-satoshi placeholder:text-gray-400"
            placeholder="e.g. Going hiking with my best friend"
            maxLength={200}
            value={videoTopic}
            onChange={(e) => setVideoTopic(e.target.value.slice(0, 200))}
          />
          {/* <div className="text-right text-gray-400 text-sm mt-1">
            {videoTopic.length}/200
          </div> */}
        </div>

        <div className="max-w-[600px] w-full">
          <label className="block font-normal text-[24px] mb-3 font-satoshi">
            Keywords:
          </label>
          <textarea
            className="w-full min-h-[115px] p-4 text-[20px] font-normal border border-gray-300 rounded-lg resize-vertical font-satoshi placeholder:text-gray-400"
            placeholder="e.g. Hike, Friends, Fun, Outdoor"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="max-w-[600px] w-full p-4 bg-[#0ECF7F] rounded-xl text-white font-clash text-2xl font-semibold cursor-pointer hover:bg-green-600 transition"
        >
          <div className="flex items-center justify-center gap-4 hover:gap-6 transition-all">
            <svg
              width="24"
              height="24"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 0.5625C7.40117 0.5625 4.87903 0.678506 3.29193 0.789154C1.70441 0.899827 0.442386 2.09796 0.301375 3.70225C0.180226 5.08056 0.0625 7.16102 0.0625 10.0417V21.0529C0.0625 22.5064 1.76749 23.2906 2.87114 22.3447L6.25483 19.4443C7.56081 19.4897 9.13596 19.5208 11 19.5208C14.5988 19.5208 17.121 19.4048 18.7081 19.2942C20.2956 19.1835 21.5576 17.9854 21.6986 16.3811C21.8198 15.0028 21.9375 12.9223 21.9375 10.0417C21.9375 7.16102 21.8198 5.08056 21.6986 3.70225C21.5576 2.09796 20.2956 0.899827 18.7081 0.789154C17.121 0.67851 14.5988 0.5625 11 0.5625ZM12.401 12.9349C13.4792 12.3334 14.0343 11.6771 14.1207 10.5629C13.7256 10.5613 13.4006 10.5562 13.1348 10.5495C12.4882 10.533 12.0043 10.0479 11.9871 9.40126C11.9783 9.07197 11.9722 8.65474 11.9722 8.13247C11.9722 7.56853 11.9794 7.12709 11.9892 6.78657C12.0069 6.17757 12.4457 5.71557 13.0545 5.69053C13.3923 5.67663 13.8332 5.66667 14.4028 5.66667C14.9724 5.66667 15.4132 5.67663 15.7511 5.69053C16.3599 5.71552 16.7987 6.17762 16.8163 6.78667C16.8261 7.12442 16.8332 7.56148 16.8333 8.11885V10.5635H16.8222C16.6782 12.6225 15.1574 13.8492 13.4341 14.3794C13.1915 14.454 12.9238 14.4182 12.7403 14.2429C12.5275 14.0394 12.345 13.7878 12.2114 13.5781C12.0678 13.3526 12.1675 13.0651 12.401 12.9349ZM7.31518 10.5629C7.22875 11.6771 6.67361 12.3334 5.59542 12.9349C5.36194 13.0651 5.26224 13.3526 5.40588 13.5781C5.53946 13.7878 5.7219 14.0394 5.93477 14.2429C6.11823 14.4182 6.38593 14.454 6.6285 14.3794C8.35186 13.8492 9.87266 12.6225 10.0166 10.5635H10.0278V8.11885C10.0277 7.56148 10.0205 7.12442 10.0108 6.78667C9.99317 6.17762 9.55431 5.71552 8.9455 5.69053C8.60765 5.67663 8.1668 5.66667 7.59722 5.66667C7.02765 5.66667 6.58679 5.67663 6.2489 5.69053C5.64014 5.71557 5.20133 6.17757 5.18368 6.78657C5.17381 7.12709 5.16667 7.56853 5.16667 8.13247C5.16667 8.65474 5.17279 9.07197 5.18154 9.40126C5.1987 10.0479 5.68262 10.533 6.32925 10.5495C6.59506 10.5562 6.92007 10.5613 7.31518 10.5629Z"
                fill="white"
              ></path>
            </svg>
            <span>{loading ? "Generating..." : "Generate Description"}</span>
          </div>
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}

        {showResult && (
          <div className="w-full flex flex-col gap-5 border-2 border-green-500 rounded-2xl mt-3 relative bg-white p-6">
            <button
              className="absolute right-4 top-4 bg-white/80 rounded-lg p-1"
              onClick={() => setShowResult(false)}
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
              {descriptions.length > 0 ? (
                descriptions.map((desc, i) => (
                  <li key={i} className="mb-2">
                    {desc}
                  </li>
                ))
              ) : (
                <li>No descriptions generated.</li>
              )}
            </ol>
            <div className="px-4">
              <hr className="border-1.5" />
            </div>
            <div className="px-4 pb-2 flex items-center justify-between gap-2">
              <button
                onClick={handleGenerate}
                className="flex gap-1 text-white px-3 py-1 bg-green-500 rounded-full items-center justify-center hover:bg-green-600"
                disabled={loading}
              >
                {/* Repeat Icon */}
                <svg width="15" height="20" viewBox="0 0 15 20" fill="none">
                  <path
                    d="M8.59983 7.95482C8.72816 7.56982 9.27183 7.56982 9.40016 7.95482L10.1527 10.2146C10.3183 10.7114 10.5974 11.1628 10.9677 11.533C11.3381 11.9031 11.7896 12.182 12.2865 12.3473L14.5452 13.0998C14.9302 13.2281 14.9302 13.7718 14.5452 13.9001L12.2853 14.6526C11.7886 14.8183 11.3372 15.0974 10.967 15.4677C10.5968 15.8381 10.318 16.2896 10.1527 16.7865L9.40016 19.0452C9.3725 19.1295 9.31891 19.2029 9.24705 19.2549C9.17519 19.307 9.08873 19.335 9 19.335C8.91127 19.335 8.82481 19.307 8.75295 19.2549C8.68109 19.2029 8.6275 19.1295 8.59983 19.0452L7.84733 16.7853C7.68181 16.2887 7.40293 15.8374 7.03276 15.4672C6.66259 15.0971 6.21131 14.8182 5.71466 14.6526L3.45483 13.9001C3.37053 13.8725 3.29711 13.8189 3.24507 13.747C3.19302 13.6752 3.165 13.5887 3.165 13.5C3.165 13.4113 3.19302 13.3248 3.24507 13.2529C3.29711 13.1811 3.37053 13.1275 3.45483 13.0998L5.71466 12.3473C6.21131 12.1818 6.66259 11.9029 7.03276 11.5327C7.40293 11.1626 7.68181 10.7113 7.84733 10.2146L8.59983 7.95482Z"
                    fill="white"
                  />
                </svg>
                <span>More like this</span>
              </button>
              <button
                onClick={handleCopy}
                className="flex gap-1 text-white px-3 py-1 bg-green-500 rounded-full items-center justify-center hover:bg-green-600"
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
        <StrapiText
          data={freeToolItem.SimpleDescription.text}
          customClassName="font-service-text !text-[20px] !text-center max-w-[600px] w-full mt-16"
        />
      </div>
    </section>
  );
}
