import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface Tone {
  emoji: string;
  name: string;
}

const tones: Tone[] = [
  { emoji: "✍️", name: "Formal" },
  { emoji: "😊", name: "Friendly" },
  { emoji: "😎", name: "Casual" },
  { emoji: "👔", name: "Professional" },
  { emoji: "🤝", name: "Diplomatic" },
  { emoji: "💪", name: "Confident" },
  { emoji: "📝", name: "Direct" },
  { emoji: "✨", name: "Luxury" },
  { emoji: "📚", name: "Middle school" },
  { emoji: "🎓", name: "High school" },
  { emoji: "🎯", name: "Academic" },
  { emoji: "📋", name: "Simplified" },
  { emoji: "🎨", name: "Vivid" },
  { emoji: "🤗", name: "Empathetic" },
  { emoji: "🤝", name: "Engaging" },
  { emoji: "💫", name: "Persuasive" },
];

export default function InstagramCaptionGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [variations, setVariations] = useState(3);
  const [addHashtags, setAddHashtags] = useState(true);
  const [addEmojis, setAddEmojis] = useState(true);
  const [selectedTone, setSelectedTone] = useState("Formal");
  const [captions, setCaptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const generateCaption = async () => {
    if (!selectedFile && !description.trim()) {
      setError("Please upload an image or provide a description!");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      formData.append("description", description);
      formData.append("tone", selectedTone);
      formData.append("variants", variations.toString());
      formData.append("addHashtags", addHashtags.toString());
      formData.append("addEmojis", addEmojis.toString());

      const response = await fetch(
        "https://freetools.socialplug.io/image-caption/api/generate-caption",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate captions");
      }

      const { captions } = await response.json();
      setCaptions(captions);
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred while generating captions. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(captions.join("\n"));
      // You might want to add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-4xl min-h-[410px] p-8 bg-white flex flex-col items-center gap-10 rounded-xl">
        <h1 className="text-2xl mb-2">Caption this image...</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="main-content">
            <div
              onClick={handleUploadClick}
              className="upload-area h-32 w-full flex flex-col items-center justify-center gap-3 border border-dashed border-gray-300 rounded-xl cursor-pointer"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/jpeg, image/png, image/gif"
                className="hidden"
              />
              {selectedFile ? (
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  width={50}
                  height={50}
                  alt="Uploaded"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <>
                  <div className="plus-icon bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 text-2xl">
                    +
                  </div>
                  <div className="upload-text text-gray-600 text-center">
                    Drop your image here, or{" "}
                    <span className="text-emerald-500">select one</span>
                  </div>
                  <div className="file-info text-gray-500 text-sm">
                    JPG, PNG, GIF files less than 10MB
                  </div>
                </>
              )}
            </div>

            <div className="description-label text-gray-700 mt-6">
              Description (optional)
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="description-input w-full min-h-[88px] p-4 border border-gray-300 rounded-lg text-base resize-vertical"
              placeholder="Type or paste your text here"
            />

            <button
              onClick={generateCaption}
              disabled={isLoading}
              className="generate-button w-full mt-4 p-4 bg-emerald-500 text-white rounded-xl text-xl font-medium flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>Generate Captions</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.2536 4.61428C24.0137 2.87671 22.2534 1.19596 20.5119 1.9473C19.5343 2.3691 18.5618 2.85362 17.3804 3.49823C16.3766 2.44737 15.5496 1.64342 14.6932 0.910278C13.2638 -0.313426 11.1257 0.77459 11.3454 2.64339C11.4477 3.51382 11.6104 4.39951 11.8484 5.43328C11.9333 5.80205 11.7547 6.18248 11.4161 6.35148C10.2004 6.95825 9.22827 7.50621 8.3053 8.10425C6.71736 9.13314 7.13784 11.5256 8.99616 11.8817C10.142 12.1013 11.3174 12.2211 12.8081 12.2828C12.8475 13.8143 12.9554 15.0115 13.1782 16.1727C13.5322 18.0173 15.9051 18.398 16.9283 16.8229C17.5479 15.8692 18.1089 14.885 18.7369 13.6617C18.9077 13.3294 19.2834 13.1554 19.6477 13.2383C20.6439 13.4648 21.5009 13.6213 22.3348 13.7231C24.2262 13.9538 25.3191 11.778 24.0786 10.3315C23.3609 9.4945 22.5866 8.68444 21.5927 7.71051C22.3064 6.55253 22.8261 5.59162 23.2536 4.61428Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          <div className="controls">
            <div className="control-label text-lg font-normal mb-2">
              Variants
            </div>
            <div className="variants-dropdown" ref={dropdownRef}>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="dropdown-button w-full p-4 bg-white border border-gray-300 rounded-lg text-lg text-left flex justify-between items-center"
                >
                  {variations}
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-md mt-2">
                    {[1, 3, 5].map((value) => (
                      <div
                        key={value}
                        onClick={() => {
                          setVariations(value);
                          setIsDropdownOpen(false);
                        }}
                        className={`dropdown-item p-4 text-lg cursor-pointer hover:bg-gray-100 ${
                          value === variations
                            ? "bg-emerald-500 text-white"
                            : ""
                        }`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="toggle-group flex justify-between items-center w-2/3 mt-4">
              <span className="toggle-label text-lg">Add hashtags</span>
              <label className="switch relative inline-block w-11 h-6">
                <input
                  type="checkbox"
                  checked={addHashtags}
                  onChange={(e) => setAddHashtags(e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all" />
              </label>
            </div>

            <div className="toggle-group flex justify-between items-center w-2/3 mt-4">
              <span className="toggle-label text-lg">Add emojis</span>
              <label className="switch relative inline-block w-11 h-6">
                <input
                  type="checkbox"
                  checked={addEmojis}
                  onChange={(e) => setAddEmojis(e.target.checked)}
                  className="opacity-0 w-0 h-0"
                />
                <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all" />
              </label>
            </div>

            <div className="writing-tone mt-6">
              <div className="control-label text-lg font-normal mb-2">
                Writing tone
              </div>
              <div className="tone-buttons flex flex-wrap gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone.name}
                    onClick={() => setSelectedTone(tone.name)}
                    className={`tone-button px-3 py-1 border rounded-full text-base flex items-center gap-1 ${
                      selectedTone === tone.name
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "border-gray-300"
                    }`}
                  >
                    <span>{tone.emoji}</span>
                    <span>{tone.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

        {captions.length > 0 && (
          <div className="w-full flex gap-5 flex-col border-2 rounded-2xl border-emerald-500 mt-4">
            <div className="absolute right-4 top-4">
              <button
                onClick={() => setCaptions([])}
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
              {captions.map((caption, index) => (
                <li key={index} className="mb-2">
                  {caption}
                </li>
              ))}
            </ol>
            <div className="px-4">
              <hr className="border-[1.5px]" />
            </div>
            <div className="px-4 pb-4 flex items-center justify-between">
              <button
                onClick={generateCaption}
                className="gap-1 text-white px-3 bg-emerald-500 rounded-full flex p-1 items-center justify-center"
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
                className="gap-1 text-white px-3 bg-emerald-500 rounded-full flex p-1 items-center justify-center"
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
