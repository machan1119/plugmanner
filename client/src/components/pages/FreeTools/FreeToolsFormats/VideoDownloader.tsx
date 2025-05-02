import { StrapiText } from "@/components/StrapiComponents";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import { useState, useRef } from "react";

export default function VideoDownloader() {
  const [postUrl, setPostUrl] = useState("");
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [musicURL, setMusicURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { freeToolItem } = useFreeTools();
  const name = "";
  const source = "";
  if (!freeToolItem?.Header) {
    return null;
  }
  const extractVideo = async () => {
    if (!postUrl.trim()) {
      setError(`Please enter a ${name} Video URL`);
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

  return (
    <section className="w-full py-6 md:py-14 lg:py-[64px] gap-6 md:gap-14 lg:gap-16 bg-white flex flex-col items-center bg-[linear-gradient(#fffffff5,#fff),url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4de67a2ea65794f385ee_perspective-grid-black.webp')] bg-[position:0_0,50%_0] bg-[size:auto,contain] bg-no-repeat">
      <div className="max-w-[1366px] w-full flex flex-col gap-14 items-center px-10">
        <h1>
          <StrapiText
            data={freeToolItem?.Header.text}
            customClassName="!font-service text-wrap !text-center lg:!text-left"
          />
        </h1>

        <div className="w-[95%] rounded-md bg-white p-5 sm:w-[90%] md:w-[800px]">
          <div className="flex flex-col gap-5">
            <div
              id="form-container"
              className={`${downloadURL} ? "hidden" : "block" rounded-md`}
            >
              <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                <input
                  type="text"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  placeholder={`Enter the Reddit Video link here`}
                  className="flex-grow border border-gray-300 rounded-md px-4 py-2"
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
                  className="flex gap-4 items-center font-clash text-base hover:bg-text-emerald-600 rounded-xl bg-primary px-6 py-4 font-semibold text-white transition-all disabled:opacity-50"
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
                      d="M14.7297 5.50844L14.9441 13.4938C15.3292 13.5032 15.6667 13.5151 15.9617 13.5284C16.9226 13.572 17.3141 14.4761 16.6714 15.1918C16.3944 15.5003 16.058 15.8602 15.6516 16.2745C14.8195 17.1225 14.1833 17.6283 13.7429 17.9262C13.2834 18.2371 12.7167 18.237 12.2572 17.9262C11.8169 17.6282 11.1807 17.1224 10.3485 16.2745C9.9418 15.86 9.60527 15.5001 9.32818 15.1914C8.68564 14.4758 9.07711 13.572 10.0378 13.5285C10.3331 13.5151 10.6708 13.5032 11.0564 13.4937L11.2706 5.50862C11.2875 4.88073 11.7076 4.33216 12.3326 4.26978C12.5355 4.24953 12.7606 4.23608 13.0004 4.23608C13.2401 4.23608 13.465 4.24952 13.6679 4.26977C14.2928 4.33213 14.7129 4.88063 14.7297 5.50844ZM18.2581 13.5332C17.9106 12.723 17.1756 12.2408 16.3657 12.107L16.2925 9.37977C18.0941 9.42517 19.4618 9.5031 20.4372 9.57742C21.8943 9.6884 23.0983 10.7444 23.2594 12.252C23.3631 13.2215 23.4516 14.5792 23.4516 16.3889C23.4516 18.1987 23.3631 19.5564 23.2594 20.5258C23.0983 22.0334 21.8943 23.0894 20.4372 23.2004C18.9368 23.3147 16.5083 23.4375 13.0002 23.4375C9.4921 23.4375 7.06363 23.3147 5.56319 23.2004C4.10613 23.0894 2.90214 22.0334 2.74098 20.5258C2.63735 19.5564 2.54883 18.1987 2.54883 16.3889C2.54883 14.5792 2.63735 13.2215 2.74098 12.252C2.90214 10.7444 4.10613 9.6884 5.56319 9.57742C6.53863 9.5031 7.90631 9.42517 9.70788 9.37977L9.63472 12.1069C8.82462 12.2404 8.08918 12.7226 7.74152 13.5331C7.34329 14.4612 7.60842 15.4591 8.24304 16.1658C8.53558 16.4916 8.88694 16.8673 9.30762 17.2959C10.1959 18.2011 10.906 18.7728 11.44 19.1341C12.3931 19.7788 13.6068 19.779 14.5599 19.1342C15.094 18.7729 15.8042 18.2012 16.6925 17.2958C17.1129 16.8674 17.4641 16.4919 17.7565 16.1662C18.3911 15.4594 18.6562 14.4614 18.2581 13.5332Z"
                      fill="white"
                    ></path>
                  </svg>
                  Download
                </button>
              </div>
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
        <StrapiText
          data={freeToolItem.SimpleDescription.text}
          customClassName="font-service-text !text-[20px] !text-center w-[70%] md:w-[50%]"
        />
      </div>
    </section>
  );
}
