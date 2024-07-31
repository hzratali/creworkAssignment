import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { instance } from "../axiosConfig";

const MainHeader = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [name, setName] = useState("");
  const getInfo = async () => {
    try {
      const info = await instance.get("/user/me");
      console.log(info);
      setName(info.data.full_name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      {showHeader ? (
        <div className="w-full h-1/5 mt-2">
          <div className="flex px-4">
            <h1 className="font-barlow text-3xl font-semibold">
              Good morning, {name.split(" ")[0]}!
            </h1>
            <div className="flex ml-auto gap-2 w-[15%]">
              <h1 className=" text-base font-normal ">Help & feedback</h1>

              <img src={"images/Frame(1).svg"} alt="" className="w-7 h-7" />
              <RxCross2
                className="w-7 h-7 cursor-pointer"
                onClick={() => setShowHeader(false)}
              />
            </div>
          </div>

          <div className=" w-full mt-2 gap-2 flex justify-around">
            <div className="rounded-md flex w-[30%]  bg-[#f6f1f1] border-[#F4F4F4]">
              <div className="w-[20%]  mt-4 ml-2">
                <img src={"images/top1.png"} alt="top1" />
              </div>
              <div className="w-[52%] p-2">
                <h2 className="font-semibold text-sm text-[#757575]">
                  Introducing tags
                </h2>
                <h3 className="text-[#868686] font-normal text-sm">
                  Easily categorize and find your notes by adding tags. Keep
                  your workspace clutter-free and efficient.
                </h3>
              </div>
            </div>
            <div className="rounded-md flex w-[30%] border-2  bg-[#f6f1f1] border-[#F4F4F4]">
              <div className="w-[20%]   mt-4 ml-2">
                <img src={"images/top2.png"} alt="top2" />
              </div>
              <div className="w-[52%] p-2">
                <h2 className="font-semibold text-sm text-[#757575]">
                  Share Notes Instantly
                </h2>
                <h3 className="text-[#868686] font-normal text-sm">
                  Effortlessly share your notes with others via email or link.
                  Enhance collaboration with quick sharing options.
                </h3>
              </div>
            </div>
            <div className="rounded-md flex w-[30%] border-2  bg-[#f6f1f1] border-[#F4F4F4]">
              <div className="w-[20%]   mt-4 ml-2">
                <img src={"images/top3.png"} alt="top3" />
              </div>
              <div className="w-[52%] p-2">
                <h2 className="font-semibold text-sm text-[#757575]">
                  Access Anywhere{" "}
                </h2>
                <h3 className="text-[#868686] font-normal text-sm">
                  Sync your notes across all devices. Stay productive whether
                  you're on your phone, tablet, or computer.
                </h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-0"></div>
      )}
    </>
  );
};

export default MainHeader;
