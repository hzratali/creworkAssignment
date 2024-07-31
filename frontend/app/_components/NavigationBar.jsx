import React, { useState } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { CiViewBoard } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
const NavigationBar = () => {
  const [activated, setActivated] = useState("home");
  return (
    <div className="w-full">
      <button
        className={`font-Inter font-normal text-xl leading-6 text-[#797979] flex gap-4 pt-1 pr-2 pb-1 pl-2 justify-start cursor-pointer ${
          activated === "home" ? "bg-gray-200 border-2 w-full" : ""
        }`}
        onClick={() => setActivated("home")}
      >
        <BiHomeAlt2 className="text-[#797979] w-7 h-7" />
        Home
      </button>
      <button
        className={`font-Inter font-normal text-xl leading-6 text-[#797979] flex gap-4 pt-1 pr-2 pb-1 pl-2 justify-start ${
          activated === "boards" ? "bg-gray-200 border-2 w-full" : ""
        }`}
        onClick={() => setActivated("boards")}
      >
        <CiViewBoard className="text-[#797979] w-7 h-7" />
        Boards
      </button>
      <button
        className={`font-Inter font-normal text-xl leading-6 text-[#797979] flex gap-4 pt-1 pr-2 pb-1 pl-2 justify-start ${
          activated === "settings" ? "bg-gray-200 border-2 w-full" : ""
        }`}
        onClick={() => setActivated("settings")}
      >
        <IoSettingsOutline className="text-[#797979] w-7 h-7" />
        Settings
      </button>
      <button
        className={`font-Inter font-normal text-xl leading-6 text-[#797979] flex gap-4 pt-1 pr-2 pb-1 pl-2 justify-start ${
          activated === "teams" ? "bg-gray-200 border-2 w-full" : ""
        }`}
        onClick={() => setActivated("teams")}
      >
        <AiOutlineTeam className="text-[#797979] w-7 h-7" />
        Teams
      </button>
      <button
        className={`font-Inter font-normal text-xl leading-6 text-[#797979] flex gap-4 pt-1 pr-2 pb-1 pl-2 justify-start ${
          activated === "analytics" ? "bg-gray-200 border-2 w-full" : ""
        }`}
        onClick={() => setActivated("analytics")}
      >
        <BsGraphUp className="text-[#797979] w-7 h-7" />
        Analytics
      </button>
    </div>
  );
};

export default NavigationBar;
