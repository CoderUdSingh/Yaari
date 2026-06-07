import React from "react";
import { FiSearch } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

const RightSidebar = () => {
  // Dummy online friends data
  const onlineFriends = [
    { id: 1, name: "Aman Gupta", image: "https://static.wikitide.net/deathbattlewiki/1/1c/Portrait.kratos.png" },
    { id: 2, name: "Priya Sharma", image: "https://static.wikitide.net/deathbattlewiki/1/1c/Portrait.kratos.png" },
    { id: 3, name: "Vikash Singh", image: "https://static.wikitide.net/deathbattlewiki/1/1c/Portrait.kratos.png" },
    { id: 4, name: "Neha Verma", image: "https://static.wikitide.net/deathbattlewiki/1/1c/Portrait.kratos.png" },
  ];

  return (
    <div className="w-full flex flex-col gap-4 p-2  lg:flex">
      {/* 1. Sponsored Section */}
      <div>
        <h3 className="text-gray-500 font-semibold text-sm mb-3">Sponsored</h3>
        <div className="flex items-center gap-4 hover:bg-gray-200 p-2 rounded-xl cursor-pointer transition-colors">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop"
            alt="Ad"
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">
              Nike Air Max Sneakers
            </span>
            <span className="text-xs text-gray-500">nike.com</span>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 my-2" />

      {/* 2. Contacts Section */}
      <div>
        <div className="flex justify-between items-center mb-3 text-gray-500">
          <h3 className="font-semibold text-sm">Contacts</h3>
          <div className="flex gap-4">
            <FiSearch className="cursor-pointer hover:bg-gray-200 rounded-full text-lg" />
            <BsThreeDots className="cursor-pointer hover:bg-gray-200 rounded-full text-lg" />
          </div>
        </div>

        {/* Online Friends List */}
        <div className="flex flex-col gap-1">
          {onlineFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-3 hover:bg-gray-200 p-2 rounded-xl cursor-pointer transition-colors"
            >
              {/* 💡 NEW TECHNIQUE: The Green Dot Magic */}
              <div className="relative">
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <span className="font-medium text-gray-800 text-sm">
                {friend.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
