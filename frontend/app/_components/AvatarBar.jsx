import React, { useEffect, useState } from "react";
import { instance } from "../axiosConfig";

const AvatarBar = () => {
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
    <div className="w-full  flex space-x-2">
      <img
        className="w-8 h-8 border-r-0"
        src={"images/avatarImage.png"}
        alt="avatarImage"
      />
      <h3 className="font-Inter font-medium text-xl leading-6">{name}</h3>
    </div>
  );
};

export default AvatarBar;
