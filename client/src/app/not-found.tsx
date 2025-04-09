"use client";

import Image from "next/image";

export default function GlobalNotFound() {
  return (
    <html>
      <head>
        <title>Page Not Found</title>
      </head>
      <body>
        <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
          <Image
            src="https://cdn.prod.website-files.com/static/page-not-found.211a85e40c.svg"
            alt="Page Not Found"
            width={260}
            height={326}
            className="mb-4"
          />
          <h1 className="font-clash text-[32px] font-semibold mt-[30px]">
            Page Not Found
          </h1>
          <p className="mb-4 text-[16px] font-satoshi m-[10px] w-[30%] text-center">
            The page you are looking for doesn&#39;t exist or has been moved.
          </p>
        </div>
      </body>
    </html>
  );
}
