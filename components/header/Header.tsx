import React from "react";
import { GoBell } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  return (
    <div className="bg-white border-b w-full h-14 flex items-center justify-between p-2 px-4">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <FiMenu className="text-[#003f62]" size={20} />
        </div>
        <div className="text-[#003f62] hidden md:block">Olá, João</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <FiSearch className="absolute text-gray-400 left-3" />
          <input
            type="search"
            placeholder="Search..."
            className="px-2 pl-8 w-44 h-9 border-2 outline-none border-white text-sm text-gray-500 rounded-full bg-[#e6e6e6]"
          />
        </div>
        <div className=" relative w-9 h-9 bg-[#e6e6e6] rounded-full flex items-center justify-center cursor-pointer border-2 border-white shadow">
          <div className="absolute top-[1px] right-[1px] w-[7px] h-[7px] p-[3px] bg-red-400 rounded-full border-2 border-white" />
          <GoBell className="text-[#003f62]" />
        </div>
        <div className="w-9 h-9 bg-[#e6e6e6] rounded-full flex items-center justify-center cursor-pointer border-2 border-white shadow">
          <Image
            src="/user1.png"
            width={30}
            height={30}
            className="rounded-full"
            alt="user"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
