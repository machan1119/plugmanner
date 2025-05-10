import { StrapiText } from "@/components/StrapiComponents";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface TweetStats {
  comments: number;
  retweets: number;
  likes: number;
  bookmarks: number;
  views: number;
}

interface TweetData {
  name: string;
  handle: string;
  content: string;
  timestamp: string;
  date: string;
  stats: TweetStats;
  verifiedType: "none" | "blue" | "gold";
  theme: "light" | "dark" | "dim";
  isPreviewMode: boolean;
  isMobileView: boolean;
}

export default function FakeTweetGenerator() {
  const [tweetData, setTweetData] = useState<TweetData>({
    name: "SocialPlug Tweet Generator",
    handle: "@socialplug",
    content: `Hey there, welcome to the Tweet Generator!

• You can edit anything you want by clicking on it
• Move to the preview mode from the top bar
• Check the preview & download your image in one-click`,
    timestamp: "11:25 AM",
    date: "Jan 02 2025",
    stats: {
      comments: 2,
      retweets: 215,
      likes: 693,
      bookmarks: 10,
      views: 120,
    },
    verifiedType: "blue",
    theme: "light",
    isPreviewMode: false,
    isMobileView: false,
  });

  const profileImageRef = useRef<HTMLInputElement>(null);
  const tweetImageRef = useRef<HTMLInputElement>(null);
  const [isVerifiedMenuOpen, setIsVerifiedMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { freeToolItem } = useFreeTools();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsVerifiedMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!freeToolItem?.Header) {
    return null;
  }

  const handleThemeChange = (theme: "light" | "dark" | "dim") => {
    setTweetData((prev) => ({ ...prev, theme }));
  };

  const toggleMobileView = () => {
    setTweetData((prev) => ({ ...prev, isMobileView: !prev.isMobileView }));
  };

  const handleVerifiedTypeChange = (type: "none" | "blue" | "gold") => {
    setTweetData((prev) => ({ ...prev, verifiedType: type }));
  };

  return (
    <section className="w-full py-6 lg:py-[64px] gap-6 md:gap-14 lg:gap-16 bg-white flex flex-col items-center bg-[linear-gradient(#fffffff5,#fff),url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4de67a2ea65794f385ee_perspective-grid-black.webp')] bg-[position:0_0,50%_0] bg-[size:auto,contain] bg-no-repeat">
      <div className="max-w-[1366px] mx-auto px-4 py-5 flex flex-col items-center">
        <h1>
          <StrapiText
            data={freeToolItem?.Header.text}
            customClassName="!font-service text-wrap !text-center lg:!text-left"
          />
        </h1>
        <div className="flex flex-col items-center min-h-[700px] md:min-h-[650px] justify-between w-full py-5">
          <div className="w-[240px] bg-white border border-gray-300 rounded-lg p-2.5 flex items-center justify-center gap-5">
            <button
              onClick={() =>
                setTweetData((prev) => ({ ...prev, isPreviewMode: false }))
              }
              className={`w-full px-4 py-2 rounded-lg text-sm font-semibold ${
                !tweetData.isPreviewMode
                  ? "bg-[#0ECF7F] text-white"
                  : "bg-transparent border border-gray-200"
              }`}
            >
              Edit
            </button>
            <button
              onClick={() =>
                setTweetData((prev) => ({ ...prev, isPreviewMode: true }))
              }
              className={`w-full px-4 py-2 rounded-lg text-sm font-semibold ${
                tweetData.isPreviewMode
                  ? "bg-[#0ECF7F] text-white"
                  : "bg-transparent border border-gray-200"
              }`}
            >
              Preview
            </button>
          </div>
          <div className="w-full max-w-[480px]">
            <div
              className={`w-full border rounded-lg p-4 shadow-sm ${
                tweetData.theme === "dark"
                  ? "bg-black border-gray-800"
                  : tweetData.theme === "dim"
                  ? "bg-[#15202b] border-[#38444d]"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Profile Section */}
              <div className="flex gap-3 mb-3">
                <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden bg-white">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 400 400"
                  >
                    <path
                      d="M 185.500 90.411 C 166.178 94.190, 151.392 103.962, 140.965 119.845 C 131.943 133.587, 127.122 149.614, 124.973 173 C 121.013 216.111, 134.249 241.766, 164.424 249.469 C 183.160 254.252, 216.840 254.252, 235.576 249.469 C 265.751 241.766, 278.987 216.111, 275.027 173 C 272.171 141.912, 263.493 120.761, 247.744 106.505 C 240.858 100.271, 228.901 93.903, 219.500 91.462 C 211.030 89.263, 194.054 88.739, 185.500 90.411"
                      fill="#647484"
                      fillRule="evenodd"
                    />
                    <path
                      d="M 0 200 L 0 400 34.319 400 L 68.638 400 70.285 390.750 C 75.179 363.262, 88.834 337.226, 109 316.934 C 128.309 297.504, 149.160 286.146, 176.053 280.410 C 187.742 277.917, 212.258 277.917, 223.947 280.410 C 249.163 285.789, 270.078 296.734, 288.547 314.216 C 309.178 333.745, 324.706 362.616, 329.718 390.763 L 331.367 400.025 365.933 399.763 L 400.500 399.500 400.752 199.750 L 401.005 0 200.502 0 L 0 0 0 200"
                      fill="#cbd3db"
                      fillRule="evenodd"
                    />
                  </svg>
                  {!tweetData.isPreviewMode && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer">
                      <input
                        type="file"
                        ref={profileImageRef}
                        className="hidden"
                        accept="image/*"
                      />
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.75 10.5V16.75C3.75 17.1644 3.91462 17.5618 4.20765 17.8549C4.50067 18.1479 4.8981 18.3125 5.3125 18.3125H14.6875C15.1019 18.3125 15.4993 18.1479 15.7924 17.8549C16.0854 17.5618 16.25 17.1644 16.25 16.75V10.5"
                          stroke="white"
                          strokeOpacity="0.75"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.125 5.8125L10 2.6875L6.875 5.8125"
                          stroke="white"
                          strokeOpacity="0.75"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 2.6875V12.8438"
                          stroke="white"
                          strokeOpacity="0.75"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </label>
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span
                      contentEditable={!tweetData.isPreviewMode}
                      suppressContentEditableWarning
                      className={`font-semibold text-[15px] ${
                        tweetData.theme === "dark"
                          ? "text-white bg-[#16181c]"
                          : tweetData.theme === "dim"
                          ? "text-white bg-[#16181c]"
                          : "text-[#0f1419] bg-gray-100"
                      }`}
                    >
                      {tweetData.name}
                    </span>
                    <button
                      onClick={() => setIsVerifiedMenuOpen(!isVerifiedMenuOpen)}
                      className={`relative border-[2px] border-dashed rounded-[6px] ml-2 ${
                        tweetData.theme == "light"
                          ? "border-gray-300"
                          : "border-gray-600"
                      }`}
                    >
                      <div className="w-4 h-4">
                        {tweetData.verifiedType !== "none" && (
                          <Image
                            src={
                              tweetData.verifiedType === "gold"
                                ? "https://upload.wikimedia.org/wikipedia/commons/8/81/Twitter_Verified_Badge_Gold.svg"
                                : "https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                            }
                            alt="Verified"
                            className="w-4 h-4"
                            width={16}
                            height={16}
                          />
                        )}
                      </div>
                      <div
                        className={`absolute py-2 top-[-150px] w-max items-center justify-center flex-col gap-1 bg-white rounded-md shadow-md border border-gray-200 ${
                          isVerifiedMenuOpen ? "flex" : "hidden"
                        }`}
                        ref={dropdownRef}
                      >
                        <p
                          onClick={() => handleVerifiedTypeChange("none")}
                          className="text-base text-black px-4 py-2 hover:bg-gray-100 w-full text-left"
                        >
                          No tick
                        </p>
                        <p
                          onClick={() => handleVerifiedTypeChange("blue")}
                          className="text-base text-black px-4 py-2 hover:bg-gray-100 w-full text-left"
                        >
                          Blue tick
                        </p>
                        <p
                          onClick={() => handleVerifiedTypeChange("gold")}
                          className="text-base text-black px-4 py-2 hover:bg-gray-100 w-full text-left"
                        >
                          Gold tick
                        </p>
                      </div>
                    </button>
                  </div>
                  <span
                    contentEditable={!tweetData.isPreviewMode}
                    suppressContentEditableWarning
                    className={`text-[15px] w-max ${
                      tweetData.theme === "dark"
                        ? "text-white bg-[#16181c]"
                        : tweetData.theme === "dim"
                        ? "text-white bg-[#16181c]"
                        : "text-[#0f1419] bg-gray-100"
                    }`}
                  >
                    {tweetData.handle}
                  </span>
                </div>
              </div>

              {/* Tweet Content */}
              <div className="space-y-3">
                <div
                  contentEditable={!tweetData.isPreviewMode}
                  suppressContentEditableWarning
                  className={`text-[15px] leading-[15px]whitespace-pre-wrap rounded-[4px] px-1 ${
                    tweetData.theme === "dark"
                      ? "text-white bg-[#16181c]"
                      : tweetData.theme === "dim"
                      ? "text-white bg-[#16181c]"
                      : "text-[#0f1419] bg-gray-100"
                  }`}
                >
                  {tweetData.content}
                </div>

                {/* Image Upload Area */}
                {!tweetData.isPreviewMode && (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50">
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2.5 text-[#536471] text-[22px]">
                      +
                    </div>
                    <span className="text-[15px] text-[#536471]">
                      Drop your image here, or{" "}
                      <span className="text-[#0ECF7F] cursor-pointer">
                        select one
                      </span>
                    </span>
                    <input
                      type="file"
                      ref={tweetImageRef}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                )}

                {/* Tweet Meta */}
                <div className="text-[15px] text-gray-500 py-2">
                  <span
                    contentEditable={!tweetData.isPreviewMode}
                    suppressContentEditableWarning
                    className={`text-[15px] leading-[15px]whitespace-pre-wrap rounded-[4px] px-1 ${
                      tweetData.theme === "dark"
                        ? "text-white bg-[#16181c]"
                        : tweetData.theme === "dim"
                        ? "text-white bg-[#16181c]"
                        : "text-[#0f1419] bg-gray-100"
                    }`}
                  >
                    {tweetData.timestamp}
                  </span>
                  {" · "}
                  <span
                    contentEditable={!tweetData.isPreviewMode}
                    suppressContentEditableWarning
                    className={`text-[15px] leading-[15px]whitespace-pre-wrap rounded-[4px] px-1 ${
                      tweetData.theme === "dark"
                        ? "text-white bg-[#16181c]"
                        : tweetData.theme === "dim"
                        ? "text-white bg-[#16181c]"
                        : "text-[#0f1419] bg-gray-100"
                    }`}
                  >
                    {tweetData.date}
                  </span>
                  {tweetData.stats.views > 0 && (
                    <span>
                      {" · "}
                      <span
                        contentEditable={!tweetData.isPreviewMode}
                        suppressContentEditableWarning
                        className={`text-[15px] font-bold leading-[15px]whitespace-pre-wrap rounded-[4px] px-1 ${
                          tweetData.theme === "dark"
                            ? "text-white bg-[#16181c]"
                            : tweetData.theme === "dim"
                            ? "text-white bg-[#16181c]"
                            : "text-[#0f1419] bg-gray-100"
                        }`}
                      >
                        {tweetData.stats.views}
                      </span>
                      {" Views"}
                    </span>
                  )}
                </div>

                {/* Tweet Stats */}
                <div
                  className={`flex justify-between py-3 border-y ${
                    tweetData.theme === "dark"
                      ? "border-gray-800"
                      : tweetData.theme === "dim"
                      ? "border-[#38444d]"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[13px] text-[#536471]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
                        fill="currentColor"
                      />
                    </svg>
                    <span
                      contentEditable={!tweetData.isPreviewMode}
                      suppressContentEditableWarning
                      className={`text-[15px] leading-[15px]whitespace-pre-wrap rounded-[4px] px-1 ${
                        tweetData.theme === "dark"
                          ? "text-white bg-[#16181c]"
                          : tweetData.theme === "dim"
                          ? "text-white bg-[#16181c]"
                          : "text-[#0f1419] bg-gray-100"
                      }`}
                    >
                      {tweetData.stats.comments}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#536471]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
                        fill="currentColor"
                      />
                    </svg>
                    <span
                      contentEditable={!tweetData.isPreviewMode}
                      suppressContentEditableWarning
                      className={`text-[15px] leading-[15px]whitespace-pre-wrap rounded-[4px] px-1 ${
                        tweetData.theme === "dark"
                          ? "text-white bg-[#16181c]"
                          : tweetData.theme === "dim"
                          ? "text-white bg-[#16181c]"
                          : "text-[#0f1419] bg-gray-100"
                      }`}
                    >
                      {tweetData.stats.retweets}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#536471]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                        fill="currentColor"
                      />
                    </svg>
                    <span
                      contentEditable={!tweetData.isPreviewMode}
                      suppressContentEditableWarning
                      className={`text-[15px] leading-[15px]whitespace-pre-wrap rounded-[4px] px-1 ${
                        tweetData.theme === "dark"
                          ? "text-white bg-[#16181c]"
                          : tweetData.theme === "dim"
                          ? "text-white bg-[#16181c]"
                          : "text-[#0f1419] bg-gray-100"
                      }`}
                    >
                      {tweetData.stats.likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#536471]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"
                        fill="currentColor"
                      />
                    </svg>
                    <span
                      contentEditable={!tweetData.isPreviewMode}
                      suppressContentEditableWarning
                      className={`text-[15px] leading-[15px]whitespace-pre-wrap rounded-[4px] px-1 ${
                        tweetData.theme === "dark"
                          ? "text-white bg-[#16181c]"
                          : tweetData.theme === "dim"
                          ? "text-white bg-[#16181c]"
                          : "text-[#0f1419] bg-gray-100"
                      }`}
                    >
                      {tweetData.stats.bookmarks}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#536471]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-2.5 flex md:w-full md:flex-row flex-col gap-5 justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-medium">Theme:</span>
              <button
                onClick={() => handleThemeChange("light")}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  tweetData.theme === "light"
                    ? "bg-[#0ECF7F] text-white"
                    : "bg-transparent"
                }`}
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  tweetData.theme === "dark"
                    ? "bg-[#0ECF7F] text-white"
                    : "bg-transparent"
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => handleThemeChange("dim")}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  tweetData.theme === "dim"
                    ? "bg-[#0ECF7F] text-white"
                    : "bg-transparent"
                }`}
              >
                Dim
              </button>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-medium">PC/Mobile</span>
                <label className="relative inline-block w-11 h-6">
                  <input
                    type="checkbox"
                    className="opacity-0 w-0 h-0"
                    checked={tweetData.isMobileView}
                    onChange={toggleMobileView}
                  />
                  <span
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${
                      tweetData.isMobileView ? "bg-[#0ECF7F]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute left-0.5 bottom-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        tweetData.isMobileView ? "translate-x-5" : ""
                      }`}
                    ></span>
                  </span>
                </label>
              </div>
              <button
                onClick={() => {
                  /* TODO: Implement download */
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0ECF7F] text-white text-[15px] font-medium hover:bg-[#0bbf73] transition-colors"
              >
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.2448 4.4659L10.3992 10.2153C10.6765 10.2221 10.9195 10.2307 11.1318 10.2403C11.8237 10.2717 12.1056 10.9226 11.6429 11.4379C11.4434 11.6601 11.2012 11.9192 10.9086 12.2174C10.3095 12.828 9.85144 13.1922 9.53434 13.4067C9.20352 13.6305 8.79549 13.6305 8.46467 13.4067C8.1476 13.1922 7.68952 12.828 7.09039 12.2174C6.79755 11.919 6.55524 11.6599 6.35574 11.4376C5.89311 10.9224 6.17497 10.2717 6.86667 10.2403C7.07926 10.2307 7.32244 10.2221 7.60006 10.2153L7.75431 4.46603C7.76646 4.01395 8.06892 3.61898 8.51896 3.57407C8.66505 3.55948 8.82706 3.5498 8.99972 3.5498C9.17234 3.5498 9.33428 3.55948 9.48037 3.57406C9.93029 3.61896 10.2327 4.01388 10.2448 4.4659ZM12.7853 10.2438C12.5351 9.66038 12.0059 9.31319 11.4227 9.21687L11.37 7.25326C12.6672 7.28595 13.6519 7.34205 14.3543 7.39557C15.4033 7.47547 16.2702 8.23578 16.3863 9.32127C16.4609 10.0193 16.5246 10.9968 16.5246 12.2998C16.5246 13.6029 16.4609 14.5804 16.3863 15.2784C16.2702 16.3639 15.4033 17.1242 14.3543 17.2041C13.2739 17.2864 11.5255 17.3748 8.99961 17.3748C6.47376 17.3748 4.72527 17.2864 3.64495 17.2041C2.59587 17.1242 1.72899 16.3639 1.61296 15.2784C1.53834 14.5804 1.47461 13.6029 1.47461 12.2998C1.47461 10.9968 1.53834 10.0193 1.61296 9.32127C1.72899 8.23578 2.59587 7.47547 3.64495 7.39557C4.34727 7.34205 5.33199 7.28595 6.62913 7.25326L6.57646 9.21679C5.99318 9.3129 5.46366 9.66007 5.21334 10.2436C4.92662 10.9119 5.11751 11.6304 5.57444 12.1392C5.78507 12.3738 6.03805 12.6443 6.34094 12.9529C6.98053 13.6046 7.49181 14.0163 7.87628 14.2764C8.56246 14.7406 9.43634 14.7407 10.1226 14.2765C10.5072 14.0163 11.0185 13.6047 11.658 12.9528C11.9607 12.6444 12.2136 12.374 12.4241 12.1395C12.8811 11.6306 13.0719 10.9121 12.7853 10.2438Z"
                    fill="white"
                  />
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
