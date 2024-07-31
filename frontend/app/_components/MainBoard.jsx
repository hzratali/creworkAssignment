import React from "react";
import MainHeader from "./MainHeader";
import MainActions from "./MainActions";
import TaskBoard from "./TaskBoard";

const MainBoard = () => {
  return (
    <div className="w-full h-screen flex flex-col space-y-10">
      <MainHeader />
      <MainActions />
      <TaskBoard />
    </div>
  );
};

export default MainBoard;
