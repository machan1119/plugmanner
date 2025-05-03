import { StrapiText } from "@/components/StrapiComponents";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import { useState, useRef, useEffect } from "react";

const categories = [
  "Non-profit",
  "Education",
  "Banking",
  "Retail",
  "Interior design",
  "Real estate",
  "Architecture",
  "Wellness",
  "Tech",
  "Health",
  "Coaching",
  "Hotel",
  "Insurance",
  "Clothing",
  "Preschool",
  "Jewelry",
  "Hair salon",
  "Nail salon",
  "Grocery",
  "Furniture",
  "Home goods",
  "Ceramics",
  "Pet grooming",
  "Clinic",
  "Bookstore",
  "Lighting",
  "Fabric store",
  "Beauty",
  "Fitness",
  "Foodie",
  "Lifestyle",
  "Gaming",
  "Daily vlog",
  "Family vlog",
  "Travel vlog",
  "Comedy",
  "Pet",
  "Artist",
  "Reviews",
  "Finance",
  "Chef",
  "Fashion",
  "Sports",
];

export default function YoutubeNameGenerator() {
  const [accountType, setAccountType] = useState<"personal" | "professional">(
    "personal"
  );
  const [selectedCategory, setSelectedCategory] = useState("Non-profit");
  const [description, setDescription] = useState("");
  const [names, setNames] = useState<string[]>([]);
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
    if (value.length <= 200) {
      setDescription(value);
    } else {
      setDescription(value.substring(0, 200));
    }
  };

  const generateContent = async () => {
    if (!description.trim() || !selectedCategory || !accountType) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        "https://ytnamegenerator.socialplug.io/api/youtube-name-generator",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accountType,
            category: selectedCategory,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate names");
      }

      const { ret_response } = await response.json();
      setNames(ret_response);
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred while generating names. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(names.join("\n"));
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
        <div className="bg-white p-6 md:p-8 rounded-xl w-[90%] max-w-[535px]">
          <div className="mb-5">
            <label className="font-satoshi font-normal text-lg mb-2 block">
              Account type:
            </label>
            <div className="flex gap-3">
              <input
                type="radio"
                id="personal"
                name="account-type"
                checked={accountType === "personal"}
                onChange={() => setAccountType("personal")}
                className="hidden"
              />
              <label
                htmlFor="personal"
                className={`flex items-center px-3 py-1.5 text-lg font-normal border border-gray-300 rounded-full cursor-pointer gap-1.5 ${
                  accountType === "personal"
                    ? "bg-primary text-white font-medium border-primary"
                    : ""
                }`}
              >
                🙎‍♂️ Personal
              </label>
              <input
                type="radio"
                id="professional"
                name="account-type"
                checked={accountType === "professional"}
                onChange={() => setAccountType("professional")}
                className="hidden"
              />
              <label
                htmlFor="professional"
                className={`flex items-center px-3 py-1.5 text-lg font-normal border border-gray-300 rounded-full cursor-pointer gap-1.5 ${
                  accountType === "professional"
                    ? "bg-primary text-white font-medium border-primary"
                    : ""
                }`}
              >
                💼 Professional
              </label>
            </div>
          </div>

          <div className="mb-5">
            <label className="text-lg block mb-2">Category:</label>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-[200px] flex justify-between items-center cursor-pointer text-sm text-left px-3 py-3 border-2 border-gray-400 rounded-md bg-white"
              >
                <span>{selectedCategory}</span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.575734 0.242441C0.810054 0.00813476 1.18995 0.00813476 1.42427 0.242441L5 3.81819L8.57575 0.242441C8.81001 0.00813476 9.18988 0.00813476 9.42428 0.242441C9.65855 0.476761 9.65855 0.856655 9.42428 1.09098L5.42427 5.09097C5.31173 5.20349 5.15913 5.26671 5 5.26671C4.84087 5.26671 4.68825 5.20349 4.57573 5.09097L0.575734 1.09098C0.341414 0.856655 0.341414 0.476761 0.575734 0.242441Z"
                    fill="black"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-1 w-[200px] max-h-[200px] overflow-y-auto bg-white rounded-lg border border-gray-300 shadow-sm z-10">
                  {categories.map((category) => (
                    <div
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      className={`px-4 py-1 text-lg cursor-pointer hover:bg-gray-100 ${
                        selectedCategory === category
                          ? "bg-primary text-white"
                          : ""
                      }`}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label className="font-satoshi font-normal text-lg mb-2 block">
              Describe your channel (200 characters max)
            </label>
            <textarea
              value={description}
              onChange={handleInput}
              placeholder="Type or paste your text here"
              maxLength={200}
              className="w-full min-h-[88px] p-2.5 text-lg border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={generateContent}
            disabled={isLoading}
            className="w-full -translate-y-2 p-4 bg-primary border-none rounded-lg cursor-pointer disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-2 transition-all duration-300 hover:gap-6">
              <svg
                width="24"
                height="19"
                viewBox="0 0 24 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.62372 0.439569C9.63015 0.180015 14.3698 0.180015 19.3762 0.439569C21.5272 0.551087 23.2955 2.21912 23.4617 4.39123C23.7254 7.8413 23.7254 11.1587 23.4617 14.6088C23.2955 16.7809 21.5272 18.4489 19.3762 18.5604C14.3698 18.82 9.63015 18.82 4.62372 18.5604C2.47273 18.4489 0.704395 16.7809 0.538307 14.6088C0.274504 11.1587 0.274502 7.8413 0.538307 4.39123C0.704393 2.21912 2.47273 0.551069 4.62372 0.439569ZM8.75688 9.57609C10.4809 9.57609 11.4507 8.60632 11.4507 6.88227C11.4507 5.15821 10.4809 4.18843 8.75688 4.18843C7.03282 4.18843 6.06304 5.15821 6.06304 6.88227C6.06304 8.60632 7.03282 9.57609 8.75688 9.57609ZM14.6995 7.25393C14.6995 6.63753 15.1992 6.13786 15.8156 6.13786H18.5151C19.1315 6.13786 19.6312 6.63753 19.6312 7.25393C19.6312 7.87032 19.1315 8.37 18.5151 8.37H15.8156C15.1992 8.37 14.6995 7.87032 14.6995 7.25393ZM14.6995 11.7461C14.6995 11.1297 15.1992 10.63 15.8156 10.63H18.5151C19.1315 10.63 19.6312 11.1297 19.6312 11.7461C19.6312 12.3625 19.1315 12.8622 18.5151 12.8622H15.8156C15.1992 12.8622 14.6995 12.3625 14.6995 11.7461ZM13.1207 14.1035C12.7648 12.2459 11.0499 10.9143 8.75714 10.9143C6.46443 10.9143 4.74954 12.2459 4.39356 14.1035C4.31748 14.5005 4.65297 14.8314 5.05716 14.8314H12.4571C12.8613 14.8314 13.1968 14.5005 13.1207 14.1035Z"
                  fill="white"
                ></path>
              </svg>
              <span className="font-clash text-white text-2xl font-semibold">
                Generate Names
              </span>
            </div>
          </button>
          {error && (
            <div className="text-[#d32f2f] rounded-md bg-[#fdecea] p-[10px] text-center text-base font-satoshi">
              {error}
            </div>
          )}
          {names.length > 0 && (
            <div className="relative w-full flex flex-col gap-5 border-2 border-primary rounded-2xl mt-3">
              <ol className="p-4 pl-8 list-decimal">
                {names.map((name, index) => (
                  <li key={index} className="mb-2">
                    {name}
                  </li>
                ))}
              </ol>
              <div className="px-4">
                <hr className="border-t-2" />
              </div>
              <div className="px-4 pb-4 flex items-center justify-between">
                <button
                  onClick={generateContent}
                  className="flex gap-1 text-white px-3 py-2 bg-primary rounded-full items-center justify-center"
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
                  className="flex gap-1 text-white px-3 py-1 bg-primary rounded-full items-center justify-center"
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
          customClassName="font-service-text !text-[20px] !text-center w-[60%] md:w-[40%]"
        />
      </div>
    </section>
  );
}
