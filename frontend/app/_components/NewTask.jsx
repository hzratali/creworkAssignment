import { useRouter } from "next/navigation";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
const NewTask = () => {
  const router = useRouter();

  return (
    <button
      className="w-full  rounded-lg gap-2 p-2 py-3 bg-custom-gradient flex justify-center items-center"
      onClick={() => {
        router.push("/new_task");
      }}
    >
      <h2 className="text-[#ffffff] font-Inter font-medium text-xl leading-6 ">
        Create new task
      </h2>
      <CiCirclePlus className="bg-white rounded-xl border-white w-6 h-6" />
    </button>
  );
};

export default NewTask;
