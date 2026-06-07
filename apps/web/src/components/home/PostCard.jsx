import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";

const PostCard = () => {
  return (
    <div className="w-full max-w-150 bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
      {/* 1. Header (User Info & Options) */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Temporary placeholder image, baad me DB se aayegi */}
          <img
            src="https://ui-avatars.com/api/?name=Uddeshya&background=random&color=fff&size=40"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h4 className="font-semibold text-sm text-gray-800 cursor-pointer hover:underline">
              Rahul Sharma
            </h4>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
          <BsThreeDots className="text-gray-600" />
        </div>
      </div>

      {/* 2. Body (Text & Image) */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-800">
          Apna naya MERN stack project finally deploy kar diya! 🚀 AWS ka
          infrastructure ekdum solid hai. Need your feedback on this!
        </p>
      </div>
      {/* Agar post me image hai toh ye dikhega */}
      <img
        src="https://ui-avatars.com/api/?name=Uddeshya&background=random&color=fff&size=40"
        alt="Post Content"
        className="w-full h-auto max-h-125 object-cover"
      />

      {/* 3. Footer (Stats & Action Buttons) */}
      <div className="px-4 py-3">
        {/* Stats */}
        <div className="flex justify-between text-xs text-gray-500 border-b border-gray-200 pb-2 mb-2">
          <span className="cursor-pointer hover:underline">120 Likes</span>
          <span className="cursor-pointer hover:underline">15 Comments</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer flex-1 justify-center transition-colors">
            <AiOutlineLike className="text-xl text-gray-500" />
            <span className="text-sm font-semibold text-gray-500">Like</span>
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer flex-1 justify-center transition-colors">
            <FaRegCommentAlt className="text-xl text-gray-500" />
            <span className="text-sm font-semibold text-gray-500">Comment</span>
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer flex-1 justify-center transition-colors">
            <PiShareFatLight className="text-xl text-gray-500" />
            <span className="text-sm font-semibold text-gray-500">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
