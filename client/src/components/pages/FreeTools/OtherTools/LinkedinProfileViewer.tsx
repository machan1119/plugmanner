import { useState, useRef } from "react";
import Image from "next/image";
import { StrapiText } from "@/components/StrapiComponents";
import { useFreeTools } from "@/providers/FreeToolsProvider";

interface VectorImage {
  artifacts: Array<{
    width: number;
    fileIdentifyingUrlPathSegment: string;
    expiresAt: number;
    height: number;
  }>;
  rootUrl: string;
}

interface ImageData {
  "com.linkedin.common.VectorImage": VectorImage;
}

interface TimePeriod {
  startDate: {
    month: number;
    year: number;
  };
  endDate?: {
    month: number;
    year: number;
  };
}

interface Company {
  name: string;
  logo?: ImageData;
}

interface Position {
  title: string;
  company?: {
    miniCompany?: Company;
  };
  timePeriod: TimePeriod;
  description?: string;
  locationName?: string;
}

interface PositionGroup {
  name: string;
  positions: Position[];
  miniCompany?: Company;
  timePeriod: TimePeriod;
}

interface Education {
  schoolName: string;
  school?: {
    schoolName: string;
    logo?: ImageData;
  };
  timePeriod: TimePeriod;
  degreeName: string;
  fieldOfStudy: string;
}

interface ProfileData {
  profile: {
    firstName: string;
    lastName: string;
    headline: string;
    locationName: string;
    summary?: string;
    miniProfile?: {
      picture?: ImageData;
      backgroundImage?: ImageData;
    };
  };
  positionGroupView?: {
    elements: PositionGroup[];
  };
  educationView?: {
    elements: Education[];
  };
}

const LinkedinProfileViewer = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(
    new Set()
  );
  const profileCardRef = useRef<HTMLDivElement>(null);
  const { freeToolItem } = useFreeTools();

  const getImageUrl = (
    imageData: ImageData | undefined,
    type: "profile" | "company" | "cover" = "profile"
  ) => {
    if (!imageData?.["com.linkedin.common.VectorImage"]?.artifacts?.length) {
      return `https://freetools.socialplug.io/linkedin-profile-viewer/api/default-${type}`;
    }

    const vectorImage = imageData["com.linkedin.common.VectorImage"];
    const artifacts = vectorImage.artifacts;
    const rootUrl = vectorImage.rootUrl || "https://media.licdn.com/dms/image/";

    const image = artifacts.reduce((prev, curr) =>
      type === "company"
        ? curr.width < prev.width
          ? curr
          : prev
        : curr.width > prev.width
        ? curr
        : prev
    );

    const imageUrl = image.fileIdentifyingUrlPathSegment;
    return imageUrl.startsWith("http") ? imageUrl : `${rootUrl}${imageUrl}`;
  };

  const calculateDuration = (
    startDate: TimePeriod["startDate"],
    endDate?: TimePeriod["endDate"]
  ) => {
    const start = new Date(startDate.year, startDate.month || 0);
    const end = endDate
      ? new Date(endDate.year, endDate.month || 0)
      : new Date();

    const diffYears = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365)
    );
    const diffMonths =
      Math.floor(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
      ) % 12;

    if (diffYears === 0) {
      return diffMonths === 1 ? "1 mo" : `${diffMonths} mos`;
    }
    if (diffMonths === 0) {
      return diffYears === 1 ? "1 yr" : `${diffYears} yrs`;
    }
    return `${diffYears} yrs ${diffMonths} mos`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileUrl) {
      setError("Please enter a LinkedIn profile URL");
      return;
    }
    if (!profileUrl.includes("linkedin.com/")) {
      setError("Please enter a valid LinkedIn profile URL");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://freetools.socialplug.io/linkedin-profile-viewer/api/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: profileUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfileData(data);
      if (profileCardRef.current) {
        profileCardRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDescription = (index: number) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const resetForm = () => {
    setProfileUrl("");
    setProfileData(null);
    setError(null);
    setExpandedDescriptions(new Set());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (!freeToolItem?.Header) {
    return null;
  }
  return (
    <section className="w-full py-6 md:py-14 lg:py-[64px] gap-6 md:gap-14 lg:gap-16 bg-white flex flex-col items-center bg-[linear-gradient(#fffffff5,#fff),url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4de67a2ea65794f385ee_perspective-grid-black.webp')] bg-[position:0_0,50%_0] bg-[size:auto,contain] bg-no-repeat">
      <div className="max-w-[1366px] w-full flex flex-col gap-4 items-center px-10">
        <h1>
          <StrapiText
            data={freeToolItem?.Header.text}
            customClassName="!font-service text-wrap !text-center lg:!text-left"
          />
        </h1>
        {/* Input Form */}
        <div className="mx-auto mb-8 w-[80%] mt-10">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <input
                type="text"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="Enter LinkedIn Profile URL"
                className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center justify-center gap-2 px-10 py-3 rounded-lg text-white text-[25px] font-clash font-semibold transition-colors ${
                  isLoading
                    ? "bg-primary cursor-not-allowed opacity-80"
                    : "bg-primary hover:bg-primary"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="loading-spinner"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.2639 9.11111C19.9106 6.02042 16.5749 4.25 12.9786 4.25C8.42958 4.25 4.69042 7.70333 4.25 12.125"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.3645 9.5H21.2242C21.3635 9.5 21.497 9.44469 21.5955 9.34623C21.6939 9.24777 21.7492 9.11424 21.7492 8.975V5.125M4.73633 16.8889C6.08966 19.9796 9.42536 21.75 13.0216 21.75C17.5706 21.75 21.3098 18.2967 21.7502 13.875"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M8.63569 16.5H4.77597C4.70695 16.4999 4.63857 16.5134 4.57476 16.5397C4.51096 16.566 4.45297 16.6047 4.40411 16.6534C4.35526 16.7022 4.3165 16.7601 4.29006 16.8239C4.26361 16.8876 4.25 16.956 4.25 17.025V20.875"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <svg
                      width="26"
                      height="25"
                      viewBox="0 0 26 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_284_1180)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.7857 8.03585C14.7857 10.9945 12.3872 13.393 9.42857 13.393C6.46991 13.393 4.07143 10.9945 4.07143 8.03585C4.07143 5.07719 6.46991 2.67871 9.42857 2.67871C12.3872 2.67871 14.7857 5.07719 14.7857 8.03585ZM9.42857 15.1787C4.49746 15.1787 0.5 19.1762 0.5 24.1072C0.5 24.6003 0.899746 25.0001 1.39286 25.0001H17.4643C17.9574 25.0001 18.3571 24.6003 18.3571 24.1072C18.3571 19.1762 14.3597 15.1787 9.42857 15.1787ZM24.6073 25.0001H20.46C20.5443 24.7172 20.5895 24.4174 20.5895 24.1072C20.5895 20.4624 18.8423 17.2257 16.1399 15.1889C16.2829 15.1821 16.4268 15.1787 16.5716 15.1787C21.5027 15.1787 25.5002 19.1762 25.5002 24.1072C25.5002 24.6003 25.1004 25.0001 24.6073 25.0001ZM16.5716 13.393C16.0328 13.393 15.5126 13.3134 15.022 13.1655C16.2615 11.8147 17.018 10.0136 17.018 8.03585C17.018 6.05809 16.2615 4.25701 15.022 2.90623C15.5126 2.75825 16.0328 2.67871 16.5716 2.67871C19.5302 2.67871 21.9287 5.07719 21.9287 8.03585C21.9287 10.9945 19.5302 13.393 16.5716 13.393Z"
                          fill="white"
                        ></path>
                      </g>
                    </svg>
                    <span>See Profile</span>
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="text-[#d32f2f] rounded-md bg-[#fdecea] p-[10px] text-center text-base font-satoshi">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Profile Card */}
        {profileData && (
          <div
            ref={profileCardRef}
            className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Cover Photo */}
            <div className="relative h-48 bg-gray-100">
              <Image
                src={getImageUrl(
                  profileData.profile.miniProfile?.backgroundImage,
                  "cover"
                )}
                alt="Cover Photo"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://freetools.socialplug.io/linkedin-profile-viewer/api/default-cover";
                }}
              />
            </div>

            {/* Profile Header */}
            <div className="relative px-6 py-4">
              <div className="absolute -top-16 left-6">
                <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <Image
                    src={getImageUrl(profileData.profile.miniProfile?.picture)}
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://freetools.socialplug.io/linkedin-profile-viewer/api/default-profile";
                    }}
                  />
                </div>
              </div>

              <div className="ml-36">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {profileData.profile.firstName} {profileData.profile.lastName}
                </h1>
                <p className="text-gray-600">{profileData.profile.headline}</p>
                <p className="text-gray-500 text-sm">
                  {profileData.profile.locationName}
                </p>
              </div>
            </div>

            {/* About Section */}
            {profileData.profile.summary && (
              <div className="px-6 py-4 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About
                </h2>
                <div className="prose prose-sm text-gray-600">
                  {profileData.profile.summary
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph.split("\n").map((line, lineIndex) => (
                          <span key={lineIndex}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    ))}
                </div>
              </div>
            )}

            {/* Experience Section */}
            {profileData.positionGroupView?.elements && (
              <div className="px-6 py-4 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Experience
                </h2>
                <div className="space-y-6">
                  {profileData.positionGroupView.elements.map(
                    (group, index) => {
                      const position = group.positions[0];
                      const company =
                        position.company?.miniCompany || group.miniCompany;
                      const duration = calculateDuration(
                        position.timePeriod.startDate,
                        position.timePeriod.endDate
                      );

                      return (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="relative w-12 h-12 rounded-lg border border-gray-200 overflow-hidden">
                              <Image
                                src={getImageUrl(company?.logo, "company")}
                                alt={company?.name || ""}
                                fill
                                className="object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src =
                                    "https://freetools.socialplug.io/linkedin-profile-viewer/api/default-company";
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {position.title}
                            </h3>
                            <p className="text-gray-600">{company?.name}</p>
                            <p className="text-sm text-gray-500">
                              {position.timePeriod.startDate.year} -{" "}
                              {position.timePeriod.endDate
                                ? position.timePeriod.endDate.year
                                : "Present"}{" "}
                              · {duration}
                            </p>
                            {position.description && (
                              <>
                                <div
                                  className={`mt-2 text-sm text-gray-600 ${
                                    !expandedDescriptions.has(index)
                                      ? "line-clamp-2"
                                      : ""
                                  }`}
                                >
                                  {position.description
                                    .split("\n\n")
                                    .map((paragraph, pIndex) => (
                                      <p
                                        key={pIndex}
                                        className="mb-2 last:mb-0"
                                      >
                                        {paragraph
                                          .split("\n")
                                          .map((line, lIndex) => (
                                            <span key={lIndex}>
                                              {line}
                                              <br />
                                            </span>
                                          ))}
                                      </p>
                                    ))}
                                </div>
                                <button
                                  onClick={() => toggleDescription(index)}
                                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 mt-2"
                                >
                                  {expandedDescriptions.has(index)
                                    ? "See less"
                                    : "...See more"}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* Education Section */}
            {profileData.educationView?.elements && (
              <div className="px-6 py-4 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Education
                </h2>
                <div className="space-y-6">
                  {profileData.educationView.elements.map((edu, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="relative w-12 h-12 rounded-lg border border-gray-200 overflow-hidden">
                          <Image
                            src={getImageUrl(edu.school?.logo, "company")}
                            alt={edu.schoolName}
                            fill
                            className="object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "https://freetools.socialplug.io/linkedin-profile-viewer/api/default-company";
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {edu.schoolName}
                        </h3>
                        <p className="text-gray-600">
                          {edu.degreeName} in {edu.fieldOfStudy}
                        </p>
                        <p className="text-sm text-gray-500">
                          {edu.timePeriod.startDate.year} -{" "}
                          {edu.timePeriod.endDate
                            ? edu.timePeriod.endDate.year
                            : "Present"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View Another Button */}
            <div className="px-6 py-4 border-t border-gray-200 text-center">
              <button
                onClick={resetForm}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
              >
                View Another Profile
              </button>
            </div>
          </div>
        )}
        <StrapiText
          data={freeToolItem.SimpleDescription.text}
          customClassName="font-service-text !text-[20px] !text-center w-[40%]"
        />
      </div>
    </section>
  );
};

export default LinkedinProfileViewer;
