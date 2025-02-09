import AuthLayout from "@/components/Auth/AuthLayout";
import AuthTab from "@/components/Auth/AuthTab";
import Image from "next/image";

export default function Auth() {
  return (
    <AuthLayout>
      <div className="bg-white border-black border-[1px] flex flex-col items-center">
        <Image
          src="/image/logo.png"
          objectFit="cover"
          alt="logo"
          className="rounded-full p-4 w-auto h-auto"
          width={100}
          height={100}
        />
        <AuthTab />
      </div>
    </AuthLayout>
  );
}
