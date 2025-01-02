import Header from "@/components/header/Header";
import SideBar from "@/components/side-bar/SideBar";
import React from "react";

const CustomLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex items-start bg-[#f2f6fc]">
      <SideBar />
      <div className="w-full flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default CustomLayout;
