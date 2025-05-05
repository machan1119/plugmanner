import { useFreeServices } from "@/providers/FreeServicesProvider";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Player } from "@lottiefiles/react-lottie-player";
type FormStateType = "initial" | "timer" | "verification" | "verified";

const EmailForm = () => {
  const [formState, setFormState] = useState<FormStateType>("initial");
  const [socialHandle, setSocialHandle] = useState("");
  const [email, setEmail] = useState("");
  const [formMessage, setFormMessage] = useState({ text: "", type: "" });
  const [timerCount, setTimerCount] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const verificationPollRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const { freeServiceItem } = useFreeServices();
  /* Google Captcha */
  const [callbackStatus, setCallbackStatus] = useState(false);
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);
  const [expired, setExpired] = useState("false");
  const recaptchaRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (formState === "timer") {
      timerRef.current = setInterval(() => {
        setTimerCount((prev) => {
          if (prev <= 1) {
            if (timerRef.current !== null) {
              clearInterval(timerRef.current);
            }
            setFormState("verification");
            startVerificationPolling(email);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [formState, email]);

  const SITE_KEY =
    process.env.RECAPTCHA_SECRET_KEY ||
    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const handleCaptchaChange = (val: string | null) => {
    if (val === null) setExpired("true");
    else setValue(val);
  };
  if (!freeServiceItem?.title) return;
  const PLATFORM_CONFIG = {
    formId: freeServiceItem?.platform_config.formId,
    platform: freeServiceItem?.platform_config.platform,
    socialPlatform: freeServiceItem?.platform_config.socialPlatform,
    inputPlaceholder: freeServiceItem?.platform_config.inputPlaceholder,
    buttonText: freeServiceItem?.platform_config.buttonText,
    verificationText: freeServiceItem?.platform_config.verificationText,
    successText: freeServiceItem?.platform_config.successText,
    inputLabel: freeServiceItem?.platform_config.inputLabel,
    timerImage: freeServiceItem?.platform_config.timerImage,
    emailImage: freeServiceItem?.platform_config.emailImage,
    checkImage: freeServiceItem?.platform_config.checkImage,
    primaryColor: freeServiceItem?.platform_config.primaryColor,
    primaryColorHover: freeServiceItem?.platform_config.primaryColorHover,
  };
  const asyncScriptOnLoad = () => {
    setCallbackStatus(true);
  };
  // API base URL
  const API_BASE_URL = "https://freeservices.socialplug.io";

  // Helper for API calls
  const callApi = async (endpoint: string, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...options,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }
      return { success: true, data: await response.json() };
    } catch (error) {
      if (error instanceof Error)
        return { success: false, error: error.message };
    }
  };

  // Form validation
  const validateForm = () => {
    if (!email || !socialHandle) {
      return "All fields are required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email";
    }
    if (!callbackStatus) {
      return "reCAPTCHA not loaded";
    }
    if (expired) {
      return "reCAPTCHA expired";
    }
    if (!value) {
      return "Please complete the reCAPTCHA";
    }
    return null;
  };

  // Submit handler
  const handleSubmit = async () => {
    setFormMessage({ text: "", type: "" });

    const validationError = validateForm();
    if (validationError) {
      setFormMessage({ text: validationError, type: "error" });
      return;
    }

    setIsSubmitting(true);

    const response = await callApi("/submit-email", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        email,
        formId: PLATFORM_CONFIG.formId,
        source: "direct",
        socialPlatform: PLATFORM_CONFIG.socialPlatform,
        socialHandle,
      }),
    });

    if (response)
      if (response.success) {
        setFormState("timer");
        setTimerCount(10);
        setFormMessage({ text: "", type: "" });
      } else {
        setFormMessage({
          text: response.error || "Unable to submit form. Please try again.",
          type: "error",
        });
      }
    setIsSubmitting(false);
  };

  // Polling for email verification
  const startVerificationPolling = (emailToCheck: string) => {
    let attempts = 0;
    verificationPollRef.current = setInterval(async () => {
      const response = await callApi(
        `/check-verification?email=${encodeURIComponent(emailToCheck)}`
      );
      if (response)
        if (response.success && response.data.verified) {
          if (verificationPollRef.current !== null)
            clearInterval(verificationPollRef.current);
          setFormState("verified");
        }
      attempts++;
      if (attempts >= 60) {
        if (verificationPollRef.current !== null)
          clearInterval(verificationPollRef.current);
      }
    }, 10000);
  };

  // Progress bar dots active count based on formState
  const progressIndexMap = {
    initial: -1,
    timer: 0,
    verification: 1,
    verified: 2,
  };
  const activeIndex = progressIndexMap[formState];
  return (
    <section
      className="w-full py-6 md:py-14 lg:py-[64px] gap-6 md:gap-14 lg:gap-16 bg-white flex flex-col items-center"
      style={{
        backgroundImage: `url(${freeServiceItem.hero_imgs.bg_img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1366px] w-full flex flex-col gap-4 items-center px-10">
        <h1
          className="font-service text-wrap !text-center lg:!text-left"
          style={{
            backgroundImage: freeServiceItem.title_color,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {freeServiceItem.title}
        </h1>
        <p className="font-satoshi text-black text-[18px] text-center w-[70%] md:w-[45%]">
          {freeServiceItem.SimpleDescription}
        </p>
        <div className="relative flex items-center w-[90%] justify-center">
          <Image
            src={freeServiceItem.hero_imgs.left_img}
            width={150}
            height={165}
            alt="left-img"
            className="absolute hidden sm:block top-[3%] right-auto bottom-auto left-0 w-[100px] md:w-[150px] lg:w-[200px]"
          />
          <Image
            src={freeServiceItem.hero_imgs.right_img}
            width={150}
            height={165}
            alt="right-img"
            className="absolute hidden sm:block translate-x-1/2 top-[3%] right-0 bottom-auto left-auto md:w-[150px] lg:w-[200px]"
          />
          <svg
            width="146"
            height="122"
            viewBox="0 0 146 122"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[80px] lg:w-[146px]"
          >
            <path
              d="M145.762 55.8629H141.055C130.292 55.8629 120.058 51.191 113.008 43.0583L93.6427 20.7209C86.5922 12.5882 76.3587 7.91626 65.5953 7.91626H16.4219"
              stroke="url(#linear_11)"
              strokeWidth="13.92"
            ></path>
            <path
              d="M145.762 55.8629H141.055C130.292 55.8629 120.058 60.5349 113.008 68.6676L93.6427 91.0049C86.5922 99.1376 76.3587 103.81 65.5953 103.81H16.4219"
              stroke="url(#linear_12)"
              strokeWidth="13.92"
            ></path>
            <path
              d="M145.762 55.863H0.761719"
              stroke="url(#linear_13)"
              strokeWidth="13.92"
            ></path>
            <defs>
              <linearGradient
                id="linear_11"
                x1="16.4219"
                y1="21.4496"
                x2="147.889"
                y2="55.8629"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0"
                ></stop>
                <stop
                  offset="1"
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0.2"
                ></stop>
              </linearGradient>
              <linearGradient
                id="linear_12"
                x1="16.4219"
                y1="90.2762"
                x2="147.889"
                y2="55.8629"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0"
                ></stop>
                <stop
                  offset="1"
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0.2"
                ></stop>
              </linearGradient>
              <linearGradient
                id="linear_13"
                x1="16.4217"
                y1="-33.137"
                x2="155.472"
                y2="-19.0629"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0"
                ></stop>
                <stop
                  offset="1"
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0.2"
                ></stop>
              </linearGradient>
            </defs>
          </svg>
          <Image
            src={freeServiceItem.hero_imgs.center_img}
            width={400}
            height={85}
            alt="center-image"
            className="w-[300px] lg:w-[400px]"
          />
          <svg
            width="146"
            height="111"
            viewBox="0 0 146 111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[80px] lg:w-[146px] mt-[-10px] lg:mt-[-20px]"
          >
            <path
              d="M0.761566 55.8629H5.46827C16.2317 55.8629 26.4652 51.191 33.5157 43.0583L52.8807 20.7209C59.9313 12.5882 70.1648 7.91626 80.9282 7.91626H130.102"
              stroke="url(#linear_21)"
              strokeWidth="13.92"
            ></path>
            <path
              d="M0.761566 55.8629H5.46827C16.2317 55.8629 26.4652 60.5349 33.5157 68.6676L52.8807 91.0049C59.9313 99.1376 70.1648 103.81 80.9282 103.81H130.102"
              stroke="url(#linear_22)"
              strokeWidth="13.92"
            ></path>
            <path
              d="M0.761723 55.863H145.762"
              stroke="url(#linear_23)"
              strokeWidth="13.92"
            ></path>
            <defs>
              <linearGradient
                id="linear_21"
                x1="130.102"
                y1="21.4496"
                x2="-1.3651"
                y2="55.8629"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0"
                ></stop>
                <stop
                  offset="1"
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0.2"
                ></stop>
              </linearGradient>
              <linearGradient
                id="linear_22"
                x1="130.102"
                y1="90.2762"
                x2="-1.3651"
                y2="55.8629"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0"
                ></stop>
                <stop
                  offset="1"
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0.2"
                ></stop>
              </linearGradient>
              <linearGradient
                id="linear_23"
                x1="130.102"
                y1="-33.137"
                x2="-8.94862"
                y2="-19.0629"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0"
                ></stop>
                <stop
                  offset="1"
                  stopColor={freeServiceItem.hero_imgs.bridge_color}
                  stopOpacity="0.2"
                ></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <form
          id="email-form"
          data-form-id={PLATFORM_CONFIG.formId}
          className="sm:w-[400px] w-full font-sans"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Initial State */}
          {formState === "initial" && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="socialHandle"
                className="text-sm font-medium text-black"
              >
                {PLATFORM_CONFIG.inputLabel}
              </label>
              <input
                id="socialHandle"
                name="socialHandle"
                type="text"
                required
                placeholder={PLATFORM_CONFIG.inputPlaceholder}
                className="w-full h-14 px-4 py-3 rounded-lg bg-gray-100 border border-white shadow-[0_96px_38px_rgba(143,143,143,0.01),0_54px_32px_rgba(143,143,143,0.05),0_24px_24px_rgba(143,143,143,0.09),0_6px_13px_rgba(143,143,143,0.1)] font-normal text-base text-gray-900 focus:outline-none focus:border-green-500"
                value={socialHandle}
                onChange={(e) => setSocialHandle(e.target.value)}
                disabled={isSubmitting}
              />

              <label htmlFor="email" className="text-sm font-medium text-black">
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="w-full h-14 px-4 py-3 rounded-lg bg-gray-100 border border-white shadow-[0_96px_38px_rgba(143,143,143,0.01),0_54px_32px_rgba(143,143,143,0.05),0_24px_24px_rgba(143,143,143,0.09),0_6px_13px_rgba(143,143,143,0.1)] font-normal text-base text-gray-900 focus:outline-none focus:border-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />

              {/* reCAPTCHA placeholder */}
              {load && (
                <ReCAPTCHA
                  style={{ display: "inline-block" }}
                  theme="light"
                  ref={recaptchaRef}
                  sitekey={SITE_KEY}
                  onChange={handleCaptchaChange}
                  asyncScriptOnLoad={asyncScriptOnLoad}
                  className="mt-4 w-full overflow-hidden"
                />
              )}
              <button
                type="submit"
                className={`relative w-full h-14 mt-2 font-clash text-[20px] rounded-lg bg-primary border-2 border-green-400 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSubmitting ? "text-transparent" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {PLATFORM_CONFIG.buttonText}
              </button>
              <div className="flex w-full gap-2 mt-2 text-[14px] font-satoshi text-[#00000080]">
                <div className="flex gap-1">
                  <Player
                    autoplay
                    loop
                    src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/678febc5fa4cd21d5970a7c6_Limited%20time%20Offer.json"
                    style={{ height: "24px", width: "24px" }}
                    speed={1}
                  />
                  <p>{freeServiceItem.service_status.status_1}</p>
                </div>
                <div className="flex gap-1">
                  <Player
                    autoplay
                    loop
                    src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/678febc57e2e4c95667323e4_100%20percent%20safe.json"
                    style={{ height: "24px", width: "24px" }}
                    speed={1}
                  />
                  <p>{freeServiceItem.service_status.status_2}</p>
                </div>
                <div className="flex gap-1">
                  <Player
                    autoplay
                    loop
                    src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/678febc543a55fb04571cfa0_Fast%20Delivery.json"
                    style={{ height: "24px", width: "24px" }}
                    speed={1}
                  />
                  <p>{freeServiceItem.service_status.status_3}</p>
                </div>
              </div>
            </div>
          )}

          {/* Timer State */}
          {formState === "timer" && (
            <div className="flex flex-col items-center gap-3">
              <Image
                src={PLATFORM_CONFIG.timerImage}
                width={60}
                height={60}
                alt="Timer"
                className="w-15 h-15 mx-auto"
                loading="lazy"
              />
              <div className="text-2xl font-semibold font-sans text-black">{`Please wait ${timerCount} seconds`}</div>
              <p className="max-w-xs text-center text-base font-normal text-black">
                To help prevent bots we added a{" "}
                <span className="font-semibold">10 second timer</span>.
              </p>
            </div>
          )}

          {/* Verification State */}
          {formState === "verification" && (
            <div className="flex flex-col items-center gap-3">
              <Image
                src={PLATFORM_CONFIG.emailImage}
                width={60}
                height={60}
                alt="Email Verification"
                className="w-15 h-15 mx-auto"
                loading="lazy"
              />
              <div className="text-2xl font-semibold font-sans text-black">
                Confirm your email
              </div>
              <p className="max-w-xs text-center text-base font-normal text-black">
                {PLATFORM_CONFIG.verificationText}
              </p>
            </div>
          )}

          {/* Verified State */}
          {formState === "verified" && (
            <div className="flex flex-col items-center gap-3">
              <Image
                src={PLATFORM_CONFIG.checkImage}
                width={60}
                height={60}
                alt="Email Confirmed"
                className="w-15 h-15 mx-auto"
                loading="lazy"
              />
              <div className="text-2xl font-semibold font-sans text-black">
                Email Confirmed!
              </div>
              <p className="max-w-xs text-center text-base font-normal text-black">
                {PLATFORM_CONFIG.successText}
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {formState !== "initial" && (
            <div className="flex justify-center items-center gap-2 mt-5">
              {[0, 1, 2].map((idx) => (
                <React.Fragment key={idx}>
                  <div
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      idx <= activeIndex ? "bg-green-500" : "bg-white"
                    }`}
                  />
                  {idx < 2 && (
                    <div
                      className={`w-6 h-[2px] transition-colors duration-200 ${
                        idx < activeIndex ? "bg-green-500" : "bg-white"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Form Message */}
          {formMessage.text && (
            <div
              className={`mt-3 text-center text-sm ${
                formMessage.type === "error"
                  ? "text-red-600"
                  : formMessage.type === "success"
                  ? "text-green-600"
                  : ""
              }`}
            >
              {formMessage.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default EmailForm;
