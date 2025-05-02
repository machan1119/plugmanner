import { StrapiText } from "@/components/StrapiComponents";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import React, { useState } from "react";

const TRANSCRIPT_API =
  "https://freetools.socialplug.io/tiktok-transcripts/api/get-transcripts-for-your-tiktok/transcript";
const SUMMARY_API =
  "https://freetools.socialplug.io/tiktok-transcripts/api/get-transcripts-for-your-tiktok/summarize";

export default function TiktokTranscriptGenerator() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isSummary, setIsSummary] = useState(false);
  const [error, setError] = useState("");
  const { freeToolItem } = useFreeTools();
  if (!freeToolItem) return;
  const handleTranscribe = async () => {
    if (!url.trim()) {
      setError("Please enter a TikTok video URL.");
      return;
    }
    setError("");
    setLoading(true);
    setShowResponse(false);
    setIsSummary(false);
    setTranscript("");
    setThumbnail("");
    try {
      const res = await fetch(TRANSCRIPT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!data?.data?.transcripts) throw new Error("No transcript found.");
      const transcriptObj = data.data.transcripts;
      const firstTranscript = transcriptObj[Object.keys(transcriptObj)[0]];
      setTranscript(firstTranscript);
      setThumbnail(data.data.videoInfo.thumbnailUrl);
      setShowResponse(true);
    } catch {
      setError(
        "Failed to fetch transcript. Please check the URL and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSummary = async () => {
    if (!transcript) return;
    setLoading(true);
    try {
      const res = await fetch(SUMMARY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      const data = await res.json();
      setTranscript(data.data.summary);
      setIsSummary(true);
    } catch {
      setError("Failed to summarize transcript.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!transcript) return;
    navigator.clipboard.writeText(transcript);
  };

  const handleExport = () => {
    if (!transcript) return;
    const blob = new Blob([transcript], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transcript.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <div className="bg-white rounded-2xl p-8 md:p-12 w-full max-w-2xl flex flex-col gap-4 shadow-lg">
          <input
            type="text"
            className="url-input w-full max-w-lg border border-gray-300 rounded-lg px-4 py-2 text-lg mt-2"
            placeholder="Enter tiktok video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />
          <button
            className="w-full max-w-lg bg-primary rounded-xl text-white font-semibold text-2xl font-[Clash Display] py-3 mt-6 flex items-center justify-center gap-2 hover:gap-5 transition-all duration-200 hover:bg-primary"
            onClick={handleTranscribe}
            disabled={loading}
          >
            <svg
              style={{ translate: "-1px 0" }}
              width="23"
              height="22"
              viewBox="0 0 22 25"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 0.892857C8.55671 0.892857 6.58163 0.966526 4.53822 1.10702C2.37228 1.25594 0.649063 2.98129 0.512849 5.1515C0.363938 7.52425 0.285706 9.98214 0.285706 12.5C0.285706 15.0179 0.363938 17.4757 0.512866 19.8486C0.649063 22.0188 2.37228 23.7441 4.53822 23.893C6.58163 24.0334 8.55671 24.1071 11 24.1071C13.4433 24.1071 15.4183 24.0334 17.4618 23.893C19.6277 23.7441 21.3509 22.0188 21.4871 19.8486C21.6361 17.4757 21.7143 15.0179 21.7143 12.5C21.7143 11.4802 21.7014 10.4703 21.6762 9.47195C21.6543 8.59814 21.3707 7.74421 20.8482 7.0322C19.2345 4.83375 17.9261 3.44116 15.7903 1.79275C15.0672 1.23469 14.186 0.936364 13.2868 0.916714C12.5622 0.90088 11.8064 0.892857 11 0.892857ZM6.4799 12.5279C6.4799 11.9115 6.97958 11.4118 7.59597 11.4118H14.404C15.0204 11.4118 15.5201 11.9115 15.5201 12.5279C15.5201 13.1443 15.0204 13.644 14.404 13.644H7.59597C6.97958 13.644 6.4799 13.1443 6.4799 12.5279ZM7.59597 6.02679C6.97958 6.02679 6.4799 6.52646 6.4799 7.14286C6.4799 7.75925 6.97958 8.25893 7.59597 8.25893H11.7043C12.3207 8.25893 12.8203 7.75925 12.8203 7.14286C12.8203 6.52646 12.3207 6.02679 11.7043 6.02679H7.59597ZM7.59597 16.6015C6.97958 16.6015 6.4799 17.1012 6.4799 17.7176C6.4799 18.3339 6.97958 18.8336 7.59597 18.8336H14.3828C14.9992 18.8336 15.4989 18.3339 15.4989 17.7176C15.4989 17.1012 14.9992 16.6015 14.3828 16.6015H7.59597Z"
                fill="white"
              />
            </svg>
            <span>{loading ? "Generating..." : "Generate Transcript"}</span>
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}

          {showResponse && (
            <div className="response-grid grid md:grid-cols-2 grid-cols-1 gap-4 w-full mt-6">
              <div className="video-preview aspect-[275/552] rounded-xl overflow-hidden bg-gray-100 hidden md:flex items-center justify-center">
                {thumbnail && (
                  <img
                    className="w-full h-full object-cover"
                    src={thumbnail}
                    alt="Video preview"
                  />
                )}
              </div>
              <div className="transcript-panel bg-[#F5F3F3] border border-[#ACAAAA] rounded-xl p-6 relative w-[92%] md:w-full">
                <div className="action-buttons absolute top-5 right-6 flex gap-2">
                  <button
                    className="action-button bg-primary text-white rounded-full px-4 py-2 text-sm"
                    onClick={handleCopy}
                  >
                    Copy
                  </button>
                  <button
                    className="action-button bg-primary text-white rounded-full px-4 py-2 text-sm"
                    onClick={handleExport}
                  >
                    Export
                  </button>
                </div>
                <div className="transcript-content mt-10 ml-[-6px] flex flex-col gap-2 max-h-[50vh] overflow-y-auto text-[15px]">
                  {transcript ? (
                    transcript.split("\n").map((line, i) => (
                      <div
                        key={i}
                        className="transcript-line grid grid-cols-[80px_auto] gap-4 mb-3 text-[13px]"
                      >
                        {/* Try to extract timestamp if present, else show line */}
                        {/^(\d{1,2}:)?\d{1,2}:\d{2}/.test(line) ? (
                          <>
                            <span className="timestamp bg-white rounded-full px-3 py-1 text-black text-xs flex items-center justify-center w-[49px] h-[14px]">
                              {line.split(" ")[0]}
                            </span>
                            <span>{line.substring(line.indexOf(" ") + 1)}</span>
                          </>
                        ) : (
                          <>
                            <span />
                            <span>{line}</span>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500">
                      No transcript available.
                    </span>
                  )}
                </div>
                {!isSummary && (
                  <button
                    className="summary-button absolute bottom-4 right-4 bg-white border border-gray-300 rounded-full px-3 py-1 text-sm"
                    onClick={handleSummary}
                    disabled={loading}
                  >
                    {loading ? "Summarizing..." : "Summary"}
                  </button>
                )}
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
