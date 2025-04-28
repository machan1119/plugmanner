import { useState } from "react";

interface Tone {
  emoji: string;
  name: string;
}

const tones: Tone[] = [
  { emoji: "😎", name: "Casual" },
  { emoji: "💼", name: "Professional" },
  { emoji: "😊", name: "Friendly" },
  { emoji: "😂", name: "Humorous" },
  { emoji: "💬", name: "Conversational" },
  { emoji: "👍", name: "Authoritative" },
  { emoji: "😏", name: "Sarcastic" },
  { emoji: "😭", name: "Emotional" },
  { emoji: "🎯", name: "Engaging" },
  { emoji: "📖", name: "Storytelling" },
  { emoji: "🎨", name: "Creative" },
  { emoji: "💪", name: "Inspirational" },
];

export default function TiktokCaptionGenerator() {
  const [description, setDescription] = useState("");
  const [selectedTone, setSelectedTone] = useState("Casual");
  const [isLoading, setIsLoading] = useState(false);
  const [captions, setCaptions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleToneSelect = (tone: string) => {
    setSelectedTone(tone);
  };

  const handleGenerate = async () => {
    if (!description) {
      alert("Please enter a description.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://freetools.socialplug.io/tiktok-captions/api/captions-tiktok",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description, tone: selectedTone }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate captions");
      }

      const { caption } = await response.json();
      setCaptions(caption.split("\n").filter((c: string) => c.trim()));
      setShowResults(true);
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred while generating captions. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    const text = captions.join("\n");
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 px-16 rounded-2xl max-w-[430px] w-full">
        <h1 className="text-2xl font-medium mb-6 mt-2 font-satoshi">
          Get captions for your Tiktok
        </h1>

        <div className="mb-6">
          <label className="block text-base mb-2 font-satoshi">
            Describe your video (200 characters max)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type or paste your text here"
            maxLength={200}
            className="w-full p-3 border border-gray-300 rounded-lg font-satoshi text-base resize-y min-h-[100px]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-base mb-3 -mt-1 font-satoshi">
            Writing Tone
          </label>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <button
                key={tone.name}
                onClick={() => handleToneSelect(tone.name)}
                className={`px-4 py-1.5 border border-gray-300 rounded-full text-sm font-satoshi ${
                  selectedTone === tone.name
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <span className="mr-1">{tone.emoji}</span>
                {tone.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full py-3.5 bg-green-500 text-white rounded-xl text-xl font-semibold flex items-center justify-center gap-2 font-clash-display"
        >
          {isLoading ? (
            "Generating..."
          ) : (
            <>
              Generate Captions
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.0003 0.5625C7.39563 0.5625 4.87101 0.673552 3.28415 0.779291C1.7018 0.884733 0.432443 2.07077 0.288151 3.67536C0.169593 4.99379 0.0568008 6.95574 0.0568008 9.64884C0.0568008 12.342 0.169593 14.3039 0.288151 15.6223C0.432443 17.2269 1.7018 18.413 3.28415 18.5184C4.01552 18.5671 4.94607 18.617 6.08969 18.6566V20.6969C6.08969 22.1655 7.8254 22.9442 8.92236 21.9677L12.5616 18.728C15.3469 18.7017 17.3695 18.6082 18.7165 18.5184C20.2988 18.413 21.5681 17.2269 21.7125 15.6224C21.831 14.3039 21.9438 12.342 21.9438 9.64884C21.9438 6.95574 21.831 4.99379 21.7125 3.67536C21.5681 2.07077 20.2988 0.884733 18.7165 0.779296C17.1296 0.673552 14.605 0.5625 11.0003 0.5625Z"
                  fill="white"
                />
              </svg>
            </>
          )}
        </button>

        {showResults && (
          <div className="mt-3 border-2 border-green-500 rounded-2xl flex flex-col gap-5 relative">
            <ol className="p-4 pl-8 list-decimal">
              {captions.map((caption, index) => (
                <li key={index} className="mb-2">
                  {caption}
                </li>
              ))}
            </ol>
            <div className="px-4">
              <hr className="border-t-2" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <button
                onClick={handleGenerate}
                className="flex items-center gap-1 text-white px-3 py-1 bg-green-500 rounded-full"
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
                onClick={handleCopy}
                className="flex items-center gap-1 text-white px-3 py-1 bg-green-500 rounded-full"
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
    </div>
  );
}
