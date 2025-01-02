import Image from "next/image";
import React from "react";

const LoadingLayout = () => {
  return (
    <div className="flex items-center justify-center h-full bg-white">
      <div className="absolute bg-[#003f62] w-16 h-16 flex items-center rounded-full justify-center p-1">
        <Image
          src="/logo.png"
          alt="loading"
          width={50}
          height={50}
          className=""
        />
      </div>
      <div className="absolute animate-spin inline-block w-20 h-20 border-[3px] border-current border-t-transparent text-[#003f62] rounded-full"></div>
      <div className="animate-spin-reverse inline-block w-24 h-24 border-[3px] border-current border-t-transparent text-[#003f62] rounded-full"></div>
    </div>
  );
};

export default LoadingLayout;
