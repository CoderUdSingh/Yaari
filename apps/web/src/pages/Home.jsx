import React from "react";
import UploadTest from "./UploadTest";
import LeftSidebar from "../components/home/LeftSidebar";
import MainFeed from "../components/home/MainFeed";
import RightSidebar from "../components/home/RightSidebar";

const Home = () => {
  return (
    <div className="w-full max-w-400 mx-auto pt-6 px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block col-span-1  h-[calc(100vh-80px)] sticky top-20">
        <LeftSidebar />
      </div>
      <div className="col-span-1 lg:col-span-2  min-h-screen">
        <MainFeed />
      </div>
      <div className="hidden lg:block col-span-1  h-[calc(100vh-80px)] sticky top-20">
        <RightSidebar />
      </div>

      {/* <UploadTest /> */}
    </div>
  );
};

export default Home;
