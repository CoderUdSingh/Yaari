import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BsFacebook } from "react-icons/bs";

const Navbar = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <nav className="bg-white shadow-md text-gray-700 top-0 h-14 grid grid-cols-3 items-center w-full px-4 z-50 fixed">
        <div
          id="profilepic"
          className="justify-self-start  flex items-center justify-center gap-2"
        >
          <h1 className="text-3xl font-extrabold text-blue-600 ">Yaari</h1>
          <input
            type="search"
            className="w-60 bg-gray-100 rounded-full px-4 py-2 outline-none text-sm placeholder-gray-500"
            placeholder="Search Yaari..."
          />
        </div>

        <div className=" flex justify-center items-center gap-8 justify-self-center">
          <div className="px-8 py-2 hover:bg-gray-100 rounded-xl cursor-pointer text-gray-500">
            <FaHome className="text-blue-600 text-2xl" />
          </div>
          <div className="px-8 py-2 hover:bg-gray-100 rounded-xl cursor-pointer text-gray-500">
            <FaUserFriends className="text-2xl" />
          </div>
          <div className="px-8 py-2 hover:bg-gray-100 rounded-xl cursor-pointer text-gray-500">
            <MdOutlineOndemandVideo className="text-2xl" />
          </div>
        </div>

        <div
          id="features"
          className=" flex items-center gap-4 justify-self-end"
        >
          <img
            src={
              user?.profilePic
                ? `https://res.cloudinary.com/dlbpqlhzt/image/upload/w_100,h_100,c_fill,q_auto,f_auto/yaari-s3/${user.profilePic}`
                : "https://ui-avatars.com/api/?name=Uddeshya&background=random&color=fff&size=40"
            }
            alt="ProfilePic"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 cursor-pointer"
          />
          <NavLink to={"/logout"}>Logout</NavLink>
        </div>
      </nav>
      <div className="pt-14 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
