import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import { FaUserFriends } from "react-icons/fa";
import {
  MdGroups,
  MdBookmark,
  MdHistory,
  MdOndemandVideo,
} from "react-icons/md";

const LeftSidebar = () => {
  const user = useSelector(selectUser);

  // 💡 NEW TECHNIQUE: Config-Driven Array
  const menuItems = [
    {
      id: 1,
      title: "Friends",
      icon: <FaUserFriends className="text-blue-500 text-2xl" />,
    },
    {
      id: 2,
      title: "Groups",
      icon: <MdGroups className="text-blue-500 text-2xl" />,
    },
    {
      id: 3,
      title: "Video",
      icon: <MdOndemandVideo className="text-blue-500 text-2xl" />,
    },
    {
      id: 4,
      title: "Saved",
      icon: <MdBookmark className="text-purple-500 text-2xl" />,
    },
    {
      id: 5,
      title: "Memories",
      icon: <MdHistory className="text-blue-500 text-2xl" />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-1 p-2">
      {/* 1. User Profile Link */}
      <div className="flex items-center gap-4 hover:bg-gray-200 p-3 rounded-xl cursor-pointer transition-colors">
        <img
          src={
            user?.profilePic
              ? `https://res.cloudinary.com/dlbpqlhzt/image/upload/w_100,h_100,c_fill,q_auto,f_auto/yaari-s3/${user.profilePic}`
              : "https://static.wikitide.net/deathbattlewiki/1/1c/Portrait.kratos.png"
          }
          alt="ProfilePic"
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        <span className="font-semibold text-gray-800">
          {user?.firstName
            ? `${user.firstName} ${user.lastName || ""}`
            : "Guest User"}
        </span>
      </div>

      {/* 2. Menu Items (Mapped Dynamically) */}
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 hover:bg-gray-200 p-3 rounded-xl cursor-pointer transition-colors"
        >
          {item.icon}
          <span className="font-medium text-gray-800">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default LeftSidebar;
