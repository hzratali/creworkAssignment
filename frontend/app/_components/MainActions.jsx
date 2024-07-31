import React from "react";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineCalendar } from "react-icons/ai";
import { VscFilter } from "react-icons/vsc";
import { SlShare } from "react-icons/sl";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";

const MainActions = () => {
  const router = useRouter();
  return (
    <div className="w-full flex p-2">
      <div className="bg-[#f6f1f1] w-full max-w-[25%] rounded-md p-2 flex items-center ">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-[#797979] font-normal text-base flex-grow"
        />
        <IoIosSearch className="text-[#797979] w-7 h-7 ml-2" />
      </div>
      <div className="flex  gap-2 ml-auto w-[60%]">
        <div className="bg-[#f6f1f1] w-[20%]  p-2 flex rounded-md cursor-pointer">
          <h1 className="text-[#797979] font-normal text-base">
            Calendar view
          </h1>
          <AiOutlineCalendar className="ml-auto   w-7 h-7 text-[#797979]" />
        </div>
        <div className="bg-[#f6f1f1] w-[20%]  p-2 flex  rounded-md cursor-pointer">
          <h1 className="text-[#797979] font-normal text-base">Automation</h1>
          <img
            src={"images/Frame.svg"}
            alt="abcd"
            className="ml-auto  w-7 h-7 text-[#797979]"
          />
        </div>
        <div className="bg-[#f6f1f1] w-[20%]  p-2 flex rounded-md cursor-pointer">
          <h1 className="text-[#797979] font-normal text-base">Filter</h1>
          <VscFilter className="ml-auto  w-7 h-7 text-[#797979]" />
        </div>
        <div className="bg-[#f6f1f1] w-[20%]  p-2 flex  rounded-md cursor-pointer">
          <h1 className="text-[#797979] font-normal text-base">Share</h1>
          <SlShare className="ml-auto  w-7 h-7 text-[#797979]" />
        </div>
        <div
          className="bg-[#f6f1f1] w-[20%]  p-2 flex rounded-md bg-custom-gradient cursor-pointer"
          onClick={() => {
            router.push("/new_task");
          }}
        >
          <h1 className="font-normal text-base text-white">Create new</h1>
          <CiCirclePlus className="ml-auto bg-white rounded-3xl w-7 h-7 text-[#797979]" />
        </div>
      </div>
    </div>
  );
};

export default MainActions;
