import React from "react";
import { RiDownloadLine } from "react-icons/ri";
const DownloadSection = () => {
  return (
    <div className="w-full mt-auto">
      <button className="flex bg-[#F3F3F3] w-full  space-x-4">
        <div className="p-2">
          <RiDownloadLine className="w-7 h-7 " />
        </div>
        <div>
          <h2 className="font-medium text-xl">Download the app</h2>
          <h3>Get the full experience</h3>
        </div>
      </button>
    </div>
  );
};

export default DownloadSection;
