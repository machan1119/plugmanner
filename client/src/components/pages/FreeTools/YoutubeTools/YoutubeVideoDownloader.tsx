import { StrapiText } from "@/components/StrapiComponents";
import { SupportedLocale } from "@/libs/types/Types";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import { useLocale } from "next-intl";
import { useState, useRef } from "react";
import Turnstile from "react-turnstile";

export default function YoutubeVideoDownloader() {
  const [postUrl, setPostUrl] = useState("");
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [musicURL, setMusicURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { freeToolItem } = useFreeTools();
  const [token, setToken] = useState<string | null>(null);
  const locale = useLocale() as SupportedLocale;
  const name = "Youtube Video";
  const source =
    "https://reelsdownloader.socialplug.io/api/instagram_reels_downloader";

  if (!freeToolItem?.Header) {
    return null;
  }
  const extractVideo = async () => {
    if (!postUrl.trim()) {
      setError(`Please enter a ${name} Video URL`);
      return;
    }
    if (!token) {
      setError("Don't passed cloudflare.");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(source, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: postUrl }),
      });
      const data = await response.json();
      setDownloadURL(data.downloadURL);
      setMusicURL(data.musicURL);
      if (videoRef.current) {
        videoRef.current.src = data.downloadURL;
      }
    } catch {
      setError("An error occurred while fetching the video.");
    } finally {
      setIsLoading(false);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setPostUrl(text);
    } catch {
      setError("Failed to read clipboard content.");
    }
  };

  const resetForm = () => {
    setPostUrl("");
    setDownloadURL(null);
    setMusicURL(null);
    setError(null);
    if (videoRef.current) {
      videoRef.current.src = "";
    }
  };
  const CLOUDFLARE_SITE_KEY =
    process.env.CLOUDFLARE_SITE_KEY || "0x4AAAAAAAEBI-lJrg5oKwvX";
  return (
    <section className="w-full py-6 md:py-10 lg:py-[64px] gap-6 md:gap-14 lg:gap-16 bg-white flex flex-col items-center bg-[linear-gradient(#fffffff5,#fff),url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4de67a2ea65794f385ee_perspective-grid-black.webp')] bg-[position:0_0,50%_0] bg-[size:auto,contain] bg-no-repeat">
      <div className="max-w-[1366px] w-full flex flex-col lg:gap-5 items-center px-5 lg:px-10">
        <h1>
          <StrapiText
            data={freeToolItem?.Header.text}
            customClassName="!font-service text-wrap !text-center lg:!text-left w-full"
          />
        </h1>
        <StrapiText
          data={freeToolItem.SimpleDescription.text}
          customClassName="font-service-text !text-[20px] !text-center w-[80%] lg:w-[45%]"
        />
        <div className="w-[95%] rounded-md bg-white p-5 mt-14 sm:w-[90%] md:w-[800px] border border-black-light shadow-md">
          <div className="flex flex-col gap-5">
            <div
              id="form-container"
              className={`${
                downloadURL ? "hidden" : "flex flex-col gap-5"
              } rounded-md`}
            >
              <div className="flex flex-col gap-2 md:flex-row md:gap-0">
                <input
                  type="text"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  placeholder={`Enter the ${name} URL`}
                  className="flex-grow border border-gray-300 rounded-l-md px-4 py-2"
                />
                <button
                  onClick={pasteFromClipboard}
                  className="font-clash text-center hover:bg-text-emerald-600 flex justify-center gap-3 rounded-lg px-4 py-2 font-black text-emerald-500 outline outline-1 outline-emerald-500 transition-all hover:gap-5 md:hidden"
                >
                  Paste
                </button>
                <button
                  onClick={extractVideo}
                  disabled={isLoading}
                  className="font-clash text-base hover:bg-text-emerald-600 rounded-r-md bg-primary px-6 py-3 font-normal text-white transition-all disabled:opacity-50"
                >
                  Get Video
                </button>
              </div>
              <Turnstile
                onVerify={setToken}
                sitekey={CLOUDFLARE_SITE_KEY}
                theme="light"
                language={locale}
                // style={{ border: "2px solid orange" }}
              />
            </div>
            <div
              id="video-container"
              className={`flex flex-col items-center ${
                !downloadURL ? "hidden" : "flex"
              }`}
            >
              <video
                ref={videoRef}
                className="aspect-[12/16] max-h-[500px] max-w-[70%] rounded-xl"
                controls
              />
              <div className="mt-2 flex flex-col gap-2 w-full">
                <button
                  onClick={() => window.open(downloadURL || "", "_blank")}
                  className="font-clash text-center hover:bg-text-emerald-600 flex w-full justify-center gap-3 rounded-lg bg-emerald-500 px-4 py-2 font-black text-white transition-all hover:gap-5"
                >
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.7295 1.50844L12.9439 9.49378C13.329 9.50316 13.6665 9.51507 13.9614 9.52844C14.9224 9.57199 15.3139 10.4761 14.6712 11.1918C14.3942 11.5003 14.0578 11.8602 13.6514 12.2745C12.8193 13.1225 12.1831 13.6283 11.7427 13.9262C11.2832 14.2371 10.7165 14.237 10.257 13.9262C9.81666 13.6282 9.18044 13.1224 8.34832 12.2745C7.94159 11.86 7.60505 11.5001 7.32797 11.1914C6.68543 10.4758 7.07689 9.57204 8.03759 9.52849C8.33286 9.51507 8.67061 9.50316 9.05619 9.49373L9.27042 1.50862C9.28729 0.880725 9.70739 0.332159 10.3324 0.269781C10.5353 0.249525 10.7604 0.236084 11.0001 0.236084C11.2399 0.236084 11.4648 0.24952 11.6677 0.269767C12.2926 0.332135 12.7127 0.880633 12.7295 1.50844Z"
                      fill="white"
                    />
                  </svg>
                  Download Video
                </button>
                <button
                  onClick={() => window.open(musicURL || "", "_blank")}
                  className="font-clash text-center hover:bg-text-emerald-600 flex w-full justify-center gap-3 rounded-lg bg-emerald-500 px-4 py-2 font-black text-white transition-all hover:gap-5"
                >
                  <svg
                    width="26"
                    height="25"
                    viewBox="0 0 26 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.0216 1.13108C18.3486 -0.362754 20.4757 -0.372052 20.8157 1.11887L20.8318 1.18943C20.8427 1.23749 20.8527 1.28186 20.8636 1.32814C21.2555 2.99753 22.6064 4.27312 24.2977 4.56733C25.8557 4.8384 25.8557 7.0751 24.2977 7.34617C22.5975 7.64195 21.2411 8.9296 20.8573 10.6121L20.8157 10.7946C20.4757 12.2856 18.3486 12.2762 18.0216 10.7824L17.9874 10.6258C17.6177 8.9371 16.2631 7.63986 14.56 7.34358C13.0048 7.07301 13.0048 4.84049 14.56 4.56992C16.2572 4.27467 17.6083 2.98542 17.9834 1.30532L18.0088 1.19005L18.0216 1.13108Z"
                      fill="white"
                    />
                  </svg>
                  Download Audio
                </button>
                <button
                  onClick={resetForm}
                  className="font-clash text-center hover:bg-text-emerald-600 flex w-full justify-center gap-3 rounded-lg px-4 py-2 font-black text-emerald-500 ring-2 ring-emerald-500 transition-all hover:gap-5"
                >
                  <svg
                    width="25"
                    height="21"
                    viewBox="0 0 25 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.7542 7.58335C20.2611 6.18995 19.4231 4.94416 18.3183 3.96223C17.2135 2.9803 15.878 2.29424 14.4364 1.96805C12.9947 1.64186 11.494 1.68618 10.0741 2.09688C8.65424 2.50758 7.36155 3.27127 6.31665 4.31669L1.80554 8.55558M23.1944 12.4445L18.6833 16.6834C17.6384 17.7288 16.3457 18.4925 14.9259 18.9032C13.506 19.3139 12.0052 19.3582 10.5636 19.032C9.12197 18.7058 7.78646 18.0197 6.68169 17.0378C5.57692 16.0559 4.7389 14.8101 4.24582 13.4167"
                      stroke="#0ECF7F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Download Another Video
                </button>
              </div>
            </div>

            {error && (
              <div className="text-[#d32f2f] rounded-md bg-[#fdecea] p-[10px] text-center text-base font-satoshi">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
