import { useState, useRef } from "react";
import Image from "next/image";

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Input Form */}
      <div className="max-w-3xl mx-auto mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="Enter LinkedIn Profile URL"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
                isLoading
                  ? "bg-green-600 cursor-not-allowed opacity-80"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4a8 8 0 100 16 8 8 0 000-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 6a6 6 0 100 12 6 6 0 000-12zM4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>See Profile</span>
                </>
              )}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
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
                {profileData.positionGroupView.elements.map((group, index) => {
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
                                  <p key={pIndex} className="mb-2 last:mb-0">
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
                })}
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
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              View Another Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedinProfileViewer;
