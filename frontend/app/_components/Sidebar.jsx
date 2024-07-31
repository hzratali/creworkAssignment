import React from "react";
import AvatarBar from "./AvatarBar";
import ActionBar from "./ActionBar";
import NavigationBar from "./NavigationBar";
import NewTask from "./NewTask";
import DownloadSection from "./DownloadSection";

const Sidebar = () => {
  return (
    <div className="w-1/5 h-screen ">
      <div className="w-full flex flex-col gap-2 p-4 h-full">
        <AvatarBar />
        <ActionBar />
        <NavigationBar />
        <NewTask />
        <DownloadSection />
      </div>
    </div>
  );
};

export default Sidebar;
