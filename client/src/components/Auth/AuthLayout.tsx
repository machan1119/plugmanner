import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-center items-center max-w-[1920px] max-h-[919px] xl:w-[1920px] xl:h-[919px]">
      <Image
        className="transition-all ease-in-out duration-500 blur-md flex fixed -z-10"
        alt="background"
        priority
        src="/image/img1.png"
        objectFit="cover"
        width={1920}
        height={919}
      />
      {children}
    </div>
  );
}
