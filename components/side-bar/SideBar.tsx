"use client";
import Image from "next/image";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineStorefront } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideBar = () => {
  const pathname = usePathname();
  const tabs = [
    {
      id: 1,
      title: "Dashboard",
      key: "dashboard",
      link_key: "/",
      icon: <RxDashboard size={20} />,
    },
    {
      id: 2,
      title: "Gestão de Lojas",
      key: "stores-management",
      link_key: "/stores-management",
      icon: <MdOutlineStorefront size={20} />,
    },
    {
      id: 3,
      title: "Usuários",
      key: "users-management",
      link_key: "/users-management",
      icon: <FaUsersGear size={20} />,
    },
    {
      id: 4,
      title: "Configurações",
      key: "configurations",
      link_key: "/configurations",
      icon: <IoSettingsOutline size={20} />,
    },
  ];

  return (
    <div className="relative bg-[#24518d] w-56 h-screen hidden md:block">
      <div className="w-full h-14 flex items-center justify-center text-white font-semibold border-b border-gray-600">
        <Image src="/logo.png" width={50} height={50} className="" alt="user" />
      </div>
      <div className="px-2 mt-5 space-y-4">
        {tabs.map((tab) => {
          const isActive = pathname === tab.link_key;
          return (
            <Link
              href={tab.link_key}
              key={tab.id}
              className={`w-full py-1 text-center rounded-lg cursor-pointer transition-all flex items-center gap-1 px-2 ${
                isActive
                  ? "bg-[#1b4275] text-white"
                  : "hover:bg-[#1b4275] text-gray-300"
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.title}</span>
            </Link>
          );
        })}
      </div>
      <div className="absolute bottom-8 w-full py-1 text-center rounded-lg transition-all flex items-center justify-center gap-1 px-2">
        <div className="hover:bg-[#1b4275] w-fit py-1 text-center rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 px-3 text-white">
          <MdOutlinePowerSettingsNew /> <span>sair</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
