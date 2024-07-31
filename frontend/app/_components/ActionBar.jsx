import React from "react";
import { LuBellDot } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { instance } from "../axiosConfig";
import { useRouter } from "next/navigation";

const ActionBar = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await instance.post("/logout");
      router.push("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex">
      <div className="flex space-x-6 mt-4">
        <LuBellDot className="w-7 h-7 text-[#797979]" />
        <FiLoader className="w-7 h-7 text-[#797979]" />
        <MdKeyboardDoubleArrowRight className="w-7 h-7 text-[#797979]" />
      </div>
      <div className="w-16 ml-auto mt-2">
        <button
          className="w-16 h-10 text-[#797979] bg-gray-100 rounded-md p-2"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
