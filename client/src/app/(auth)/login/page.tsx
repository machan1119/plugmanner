import MainButton from "@/components/Buttons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogIn = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="flex flex-col items-center w-full sm:w-[350px]">
        <Image
          width={133}
          height={26}
          alt="logo"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e86_navbar-logo.svg"
        />
        <h1 className="my-5 font-satoshi text-gray-700 text-[30px] font-semibold">
          Welcome back 👋
        </h1>
        <input
          type="text"
          placeholder="Email"
          className="border-black-dark border my-4 w-full px-5 py-3 text-[18px] rounded-lg focus:shadow-[0_0_0_3px_rgba(191,219,254,0.5)]"
        />
        <MainButton
          type="green-main"
          title="Sign in"
          customClass="w-full !text-[18px] !font-normal"
        />
        <div className="flex items-center mt-3">
          <p className="text-[14px] text-gray-700 mr-2">
            Don&#39;t have an account?
          </p>
          <Link
            href={"/signup"}
            className="text-[14px] text-blue-700 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
