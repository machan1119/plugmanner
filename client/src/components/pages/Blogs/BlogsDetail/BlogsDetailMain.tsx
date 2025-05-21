"use client";
import MainButton from "@/components/Buttons";
import { StrapiText } from "@/components/StrapiComponents";
import { SupportedLocale } from "@/libs/types/Types";
import { useBlogs } from "@/providers/BlogsProvider";
import {
  generate_item_url_from_blog_title,
  generate_name,
} from "@/utils/functions";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function BlogsDetailMain() {
  const { blogsItem } = useBlogs();
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);
  const [expired, setExpired] = useState("false");
  const [chapter, setChapter] = useState<string | null>(null);
  const [callbackStatus, setCallbackStatus] = useState(false);
  const recaptchaRef = useRef(null);
  const locale = useLocale() as SupportedLocale;

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    function onScroll() {
      if (!blogsItem) return;
      if (!blogsItem.Content) return;
      if (blogsItem.Content.Chapter.length === 0) return;
      const sectionIds = blogsItem.Content.Chapter.map(
        (item) =>
          item.Header &&
          generate_item_url_from_blog_title(generate_name(item.Header.text))
      );
      if (!sectionIds) return;
      const offset = 300; // Adjust threshold as needed
      let foundId = null;

      for (const id of sectionIds) {
        if (!id) continue;
        const elem = document.getElementById(id);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            foundId = id;
            break;
          }
        }
      }
      if (foundId !== chapter) {
        setChapter(foundId);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [blogsItem, chapter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const SITE_KEY =
    process.env.RECAPTCHA_SECRET_KEY ||
    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const handleCaptchaChange = (val: string | null) => {
    if (val === null) setExpired("true");
    else setValue(val);
  };

  if (!blogsItem) return;

  const asyncScriptOnLoad = () => {
    setCallbackStatus(true);
  };
  const validateForm = () => {
    if (!email || !userName || !comment) {
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

  const handleSubmit = async () => {
    // setFormMessage({ text: "", type: "" });

    const validationError = validateForm();
    if (validationError) {
      //   setFormMessage({ text: validationError, type: "error" });
      return;
    }
  };
  return (
    <section className="stack max-w-[1280px] grid gap-x-8 grid-cols-[0.5fr_1fr_0.5fr] my-4 place-self-center px-10 pb-20">
      <div className="sticky top-[220px] flex flex-col gap-2 border-r border-[#e2e2e2] h-max pb-3">
        <p className="font-clash text-[#14141b] text-[18px] mb-3 leading-5 font-semibold">
          Contents
        </p>
        <ol className="font-lato font-semibold text-[15px] text-[#686889] pr-8">
          {blogsItem.Content?.Chapter.map(
            (item, index_1) =>
              item.Header && (
                <li
                  className={`py-2 hover:text-primary ${
                    chapter ==
                      generate_item_url_from_blog_title(
                        generate_name(item.Header.text)
                      ) && "text-primary"
                  }`}
                  onClick={() =>
                    item.Header &&
                    setChapter(
                      generate_item_url_from_blog_title(
                        generate_name(item.Header.text)
                      )
                    )
                  }
                  key={index_1}
                >
                  <a
                    href={`#${generate_item_url_from_blog_title(
                      generate_name(item.Header.text)
                    )}`}
                  >
                    <StrapiText data={item.Header.text} />
                  </a>
                </li>
              )
          )}
        </ol>
      </div>
      <div className="flex flex-col gap-10">
        {blogsItem.Content?.Chapter.map((item, index_2) => (
          <div
            className="flex flex-col gap-5"
            key={index_2}
            id={
              item.Header?.text &&
              generate_item_url_from_blog_title(generate_name(item.Header.text))
            }
          >
            {item.Header?.text && (
              <h2>
                <StrapiText
                  data={item.Header.text}
                  customClassName="font-clash text-[32px] font-semibold leading-10 text-black"
                />
              </h2>
            )}
            {item.img && (
              <Image
                src={item.img}
                width={600}
                height={400}
                className="w-full"
                alt="chapter"
              />
            )}
            {item.Section &&
              item.Section.map((sectionItem, index_3) => (
                <div className="flex flex-col gap-5" key={index_3}>
                  {sectionItem.Header?.text && (
                    <h3>
                      <StrapiText
                        data={sectionItem.Header.text}
                        customClassName="font-clash text-[24px] font-semibold leading-10 text-black"
                      />
                    </h3>
                  )}
                  {sectionItem?.img && (
                    <Image
                      src={sectionItem.img}
                      width={600}
                      height={400}
                      className="w-full"
                      alt="chapter"
                    />
                  )}
                  {sectionItem.Subsection &&
                    sectionItem.Subsection.map((subSectionItem, index_4) => (
                      <div className="flex flex-col gap-5" key={index_4}>
                        {subSectionItem.Header?.text && (
                          <h4>
                            <StrapiText
                              data={subSectionItem.Header.text}
                              customClassName="font-clash text-[18px] font-semibold leading-10 text-black"
                            />
                          </h4>
                        )}
                        {subSectionItem?.img && (
                          <Image
                            src={subSectionItem.img}
                            width={600}
                            height={400}
                            className="w-full"
                            alt="chapter"
                          />
                        )}
                        {subSectionItem.Paragraph.map(
                          (paragraphItem, index_5) => (
                            <div className="flex flex-col gap-5" key={index_5}>
                              <StrapiText
                                data={paragraphItem.Sentence.text}
                                customClassName="font-satoshi text-[18px] text-[#686889]"
                              />
                              {paragraphItem.List &&
                                paragraphItem.List.map((listItem, index_6) => (
                                  <ul
                                    key={index_6}
                                    className={`${
                                      listItem.numberlist
                                        ? "list-decimal"
                                        : "list-disc"
                                    } ml-5`}
                                    role="list"
                                  >
                                    {listItem.Level1 &&
                                      listItem.Level1.map(
                                        (level1Item, index_7) => (
                                          <li key={index_7}>
                                            <StrapiText
                                              data={level1Item.text}
                                              customClassName="font-satoshi text-[18px] text-[#686889]"
                                            />
                                            {level1Item.Level2 && (
                                              <ul
                                                className="ml-5"
                                                style={{
                                                  listStyleType: "circle",
                                                }}
                                              >
                                                {level1Item.Level2.map(
                                                  (level2Item, index_8) => (
                                                    <li key={index_8}>
                                                      <StrapiText
                                                        data={level2Item.text}
                                                        customClassName="font-satoshi text-[18px] text-[#686889]"
                                                      />
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            )}
                                          </li>
                                        )
                                      )}
                                  </ul>
                                ))}
                              {paragraphItem.img && (
                                <Image
                                  src={paragraphItem.img}
                                  width={300}
                                  height={150}
                                  className="w-[80%] place-self-center"
                                  alt="paragraph-imag"
                                />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))}
        <div className="w-full flex flex-col gap-5 bg-[#f6f6f6] border border-[#e2e2e2] rounded-2xl py-8 px-6">
          <div className="flex gap-4">
            <Image
              src={blogsItem.Author.avatar}
              width={80}
              height={80}
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col gap-4">
              <p className="font-clash text-[14px] font-medium text-primary uppercase">
                About the author
              </p>
              <p className="font-clash text-[24px] font-semibold text-[#14141b]">
                {blogsItem.Author.name}
              </p>
            </div>
          </div>
          <p className="font-satoshi text-base text-[#686889] leading-[27px]">
            {blogsItem.Author.introduction}
          </p>
          <div className="flex gap-5">
            {blogsItem.Author.social.length > 0 &&
              blogsItem.Author.social.map((socialItem, index) => (
                <a
                  key={index}
                  href={socialItem.link}
                  className="w-9 h-9 flex items-center justify-center bg-[#e0e0e0] rounded-lg"
                >
                  <Image
                    src={socialItem.img}
                    width={20}
                    height={20}
                    alt="social-img"
                    className="w-5 h-5"
                  />
                </a>
              ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-5 bg-[#f6f6f6] border border-[#e2e2e2] rounded-2xl p-5">
          <div className="flex w-full justify-between items-end pb-6">
            <h2 className="mt-10 mb-[6px] font-clash text-[24px] text-[#000] font-medium">
              0 Comments
            </h2>
            <div className="h-max border-[1px] border-black-dark flex rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e53_flowbite_sort-outline.svg')] bg-[4px_center] bg-no-repeat bg-auto border-r-[1px] border-black-dark text-black text-[16px] font-satoshi leading-6 pl-8 p-2 bg-black-light rounded-l-[10px]">
                Sort by
              </div>
              <select
                // value={filter}
                // onChange={handleFilterChange}
                className="w-30 p-2 mr-2 cursor-pointer bg-inherit text-[16px] rounded-r-md transition-all duration-300"
              >
                <option label="Newest" value="Newest">
                  Newest
                </option>
                <option label="Oldest" value="Oldest">
                  Oldest
                </option>
              </select>
            </div>
          </div>
          <div className="flex w-full gap-5 pt-6 pb-[30px] border-y border-[#D0D0D0]">
            <p className="w-[70px] h-[70px] font-satoshi text-[24px] rounded-full flex justify-center items-center bg-white font-thin">
              SP
            </p>
            <form className="flex-grow flex flex-col gap-5">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="mb-2 text-[18px] font-medium font-satoshi"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  id="name"
                  placeholder="Your Name"
                  className="py-4 px-[10px] w-full bg-white border border-[#EBEBEB] rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-2 text-[18px] font-medium font-satoshi"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="py-4 px-[10px] w-full bg-white border border-[#EBEBEB] rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="comment"
                  className="mb-2 text-[18px] font-medium font-satoshi"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ resize: "vertical" }}
                  rows={3}
                  placeholder="Say something good!"
                  className="py-4 px-[10px] w-full bg-white border border-[#EBEBEB] rounded-lg"
                />
              </div>
              {load && (
                <ReCAPTCHA
                  theme="light"
                  ref={recaptchaRef}
                  sitekey={SITE_KEY}
                  onChange={handleCaptchaChange}
                  lang={locale}
                  asyncScriptOnLoad={asyncScriptOnLoad}
                  className="overflow-hidden"
                />
              )}
              <MainButton
                customClass="mt-4"
                customChildClass="py-4"
                type="primary"
                title="Post"
                handleClick={handleSubmit}
              />
            </form>
          </div>
          <div className="px-5 mt-10 py-3 font-satoshi text-base text-[#686889] text-left w-full">
            No comments yet
          </div>
        </div>
      </div>
      <div className="sticky top-[220px] max-w-[270px] w-full h-max flex flex-col gap-8">
        <div className="w-full h-max px-3 pt-4 pb-10 bg-[#f6f6f6] border border-[#e2e2e2] rounded-lg">
          <Image
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4e269296863ae1e5f3b0_airplane.png"
            width={73}
            height={69}
            alt="subscription"
            className="w-[73px] h-[69px]"
          />
          <p className="w-[80%] font-clash text-[20px] font-semibold text-[#14141b] leading-6 text-center mb-2 place-self-center">
            Subscribe to our newsletter
          </p>
          <div className="flex rounded-lg bg-white border border-[#e2e2e2]">
            <input
              className="text-[15px] px-4 rounded-lg"
              placeholder="Email Address"
            />
            <button
              type="submit"
              className="w-[60px] h-[60px] m-auto rounded-lg"
            >
              <Image
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/62c2077d323bcf8683fb810b_Arrow%20(1).svg"
                alt="submit"
                width={20}
                height={20}
                className="w-5 h-5 m-auto saturate-200 hue-rotate-180"
              />
            </button>
          </div>
        </div>
        <div className="w-full h-max px-3 pt-4 pb-10 flex flex-col gap-5 items-center bg-[#f6f6f6] border border-[#e2e2e2] rounded-lg">
          <p className="w-[80%] font-clash text-[20px] font-semibold text-[#14141b] leading-6 text-center mb-2 place-self-center">
            Share this article
          </p>
          <div className="flex gap-2">
            <a
              href="#"
              className="bg-[#0076b2] rounded-lg w-11 h-11 flex justify-center items-center"
            >
              <Image
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb5dadfee185c4c094fc3e_Vector.png"
                width={24}
                height={24}
                alt="linkedin"
                className="w-6 h-6"
              />
            </a>
            <a
              href="#"
              className="bg-[#0a6cdb] rounded-lg w-11 h-11 flex justify-center items-center"
            >
              <Image
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb5dd7de30948f36d814c2_mdi_twitter%20(1).png"
                width={24}
                height={24}
                alt="twitter"
                className="w-6 h-6"
              />
            </a>
            <a
              href="#"
              className="bg-[#2543b9] rounded-lg w-11 h-11 flex justify-center items-center"
            >
              <Image
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb5e580b9ce93d4919431e_facebooklogo.png"
                width={24}
                height={24}
                alt="facebook"
                className="w-6 h-6"
              />
            </a>
            <a
              href="#"
              className="bg-[#435785] rounded-lg w-11 h-11 flex justify-center items-center"
            >
              <Image
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb5e9041e4436f8f41b656_tgram.png"
                width={24}
                height={24}
                alt="telegram"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
