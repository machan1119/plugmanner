import { StrapiText } from "@/components/StrapiComponents";
import { useFreeTools } from "@/providers/FreeToolsProvider";
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
  const { freeToolItem } = useFreeTools();

  if (!freeToolItem?.Header) {
    return null;
  }
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
    <section className="w-full py-6 md:py-14 lg:py-[64px] gap-6 md:gap-14 lg:gap-16 bg-white flex flex-col items-center bg-[linear-gradient(#fffffff5,#fff),url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4de67a2ea65794f385ee_perspective-grid-black.webp')] bg-[position:0_0,50%_0] bg-[size:auto,contain] bg-no-repeat">
      <div className="max-w-[1366px] w-full flex flex-col gap-4 items-center px-10">
        <h1>
          <StrapiText
            data={freeToolItem?.Header.text}
            customClassName="!font-service text-wrap !text-center lg:!text-left"
          />
        </h1>
        <div className="bg-white rounded-2xl max-w-[535px] w-full my-[30px]">
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
                      ? "bg-primary text-white border-primary"
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
            className="w-full py-3.5 bg-primary text-white rounded-xl text-xl font-semibold flex items-center justify-center gap-2 font-clash-display"
          >
            {isLoading ? (
              "Generating..."
            ) : (
              <>
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
                    d="M10.9999 0.580444C7.39523 0.580444 4.87061 0.691496 3.28375 0.797235C1.70139 0.902678 0.432039 2.08872 0.287746 3.69331C0.169189 5.01174 0.0563965 6.97368 0.0563965 9.66679C0.0563965 12.3599 0.169189 14.3219 0.287746 15.6403C0.432039 17.2449 1.70139 18.4309 3.28374 18.5364C4.01512 18.5851 4.94566 18.635 6.08929 18.6746V20.7148C6.08929 22.1835 7.825 22.9621 8.92195 21.9856L12.5612 18.7459C15.3465 18.7197 17.3691 18.6261 18.7161 18.5364C20.2984 18.4309 21.5677 17.2449 21.7121 15.6403C21.8306 14.3219 21.9434 12.3599 21.9434 9.66679C21.9434 6.97368 21.8306 5.01174 21.7121 3.69331C21.5677 2.08872 20.2984 0.902678 18.7161 0.79724C17.1292 0.691496 14.6046 0.580444 10.9999 0.580444ZM3.71126 12.999C3.71963 12.4567 4.0461 12.0544 4.58764 12.024C4.80338 12.0119 5.07298 12.0041 5.40932 12.0041C5.74566 12.0041 6.01525 12.0119 6.23099 12.024C6.77252 12.0544 7.09899 12.4567 7.1074 12.999C7.10944 13.1335 7.1107 13.2872 7.1107 13.4624C7.1107 13.6376 7.10944 13.7913 7.1074 13.9257C7.09899 14.4681 6.77252 14.8704 6.23099 14.9007C6.01525 14.9128 5.74566 14.9207 5.40932 14.9207C5.07298 14.9207 4.80338 14.9128 4.58764 14.9007C4.04611 14.8704 3.71963 14.4681 3.71126 13.9257C3.70918 13.7913 3.70793 13.6376 3.70793 13.4624C3.70793 13.2872 3.70918 13.1335 3.71126 12.999ZM4.81145 6.71264C4.18105 6.74399 3.72635 7.17056 3.71147 7.80153C3.7092 7.89749 3.70793 8.00185 3.70793 8.11517C3.70793 8.22848 3.7092 8.33285 3.71147 8.42881C3.72635 9.05978 4.18105 9.48634 4.81145 9.51769C5.41311 9.54764 6.36088 9.5735 7.83987 9.5735C9.31886 9.5735 10.2666 9.54764 10.8683 9.51769C11.4987 9.48634 11.9534 9.05978 11.9683 8.42881C11.9706 8.33285 11.9718 8.22848 11.9718 8.11517C11.9718 8.00185 11.9706 7.89749 11.9683 7.80153C11.9534 7.17056 11.4987 6.74399 10.8683 6.71264C10.2666 6.68269 9.31886 6.65683 7.83987 6.65683C6.36088 6.65683 5.41311 6.68269 4.81145 6.71264ZM9.54515 13.1433C9.56114 12.5149 10.0197 12.0937 10.6475 12.0628C11.2808 12.0317 12.2983 12.0041 13.9163 12.0041C15.5342 12.0041 16.5517 12.0317 17.185 12.0628C17.8128 12.0938 18.2714 12.5149 18.2874 13.1433C18.2898 13.2407 18.2913 13.3469 18.2913 13.4624C18.2913 13.5779 18.2898 13.6841 18.2874 13.7815C18.2714 14.4099 17.8128 14.831 17.185 14.862C16.5517 14.8931 15.5342 14.9207 13.9163 14.9207C12.2983 14.9207 11.2808 14.8931 10.6475 14.862C10.0197 14.831 9.56114 14.4099 9.54515 13.7815C9.54267 13.6841 9.54126 13.5779 9.54126 13.4624C9.54126 13.3469 9.54267 13.2407 9.54515 13.1433ZM15.3372 6.68051C14.7683 6.71176 14.4142 7.12914 14.4054 7.69881C14.4035 7.8218 14.4024 7.96005 14.4024 8.11517C14.4024 8.27029 14.4035 8.40853 14.4054 8.53152C14.4142 9.10119 14.7683 9.51857 15.3372 9.54983C15.5948 9.56397 15.9249 9.5735 16.3468 9.5735C16.7688 9.5735 17.0988 9.56397 17.3564 9.54983C17.9253 9.51857 18.2794 9.10119 18.2882 8.53152C18.2901 8.40853 18.2913 8.27029 18.2913 8.11517C18.2913 7.96005 18.2901 7.8218 18.2882 7.69881C18.2794 7.12914 17.9253 6.71176 17.3565 6.68051C17.0988 6.66636 16.7688 6.65683 16.3468 6.65683C15.9249 6.65683 15.5948 6.66636 15.3372 6.68051Z"
                    fill="white"
                  ></path>
                </svg>
                Generate Captions
              </>
            )}
          </button>

          {showResults && (
            <div className="mt-3 border-2 border-primary rounded-2xl flex flex-col gap-5 relative">
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
                  className="flex items-center gap-1 text-white px-3 py-1 bg-primary rounded-full"
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
                  className="flex items-center gap-1 text-white px-3 py-1 bg-primary rounded-full"
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
