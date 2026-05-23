import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import {
  MdVideoCameraFront,
  MdPhotoLibrary,
  MdInsertEmoticon,
} from "react-icons/md";

const CreatePostCard = () => {
  const user = useSelector(selectUser);

  return (
    <div className="w-full max-w-150 bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex items-center gap-3">
        <img
          src={
            user?.profilePic
              ? `https://res.cloudinary.com/dlbpqlhzt/image/upload/w_100,h_100,c_fill,q_auto,f_auto/yaari-s3/${user.profilePic}`
              : "https://via.placeholder.com/40"
          }
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />

        <div className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2.5 cursor-pointer transition-colors duration-200">
          <p className="text-gray-500 text-sm">
            What's on your mind, {user?.firstName}?
          </p>
        </div>
      </div>

      <hr className="my-3 border-gray-200" />

      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer flex-1 justify-center transition-colors">
          <MdVideoCameraFront className="text-red-500 text-2xl" />
          <span className="text-sm font-semibold text-gray-500">
            Live video
          </span>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer flex-1 justify-center transition-colors">
          <MdPhotoLibrary className="text-green-500 text-2xl" />
          <span className="text-sm font-semibold text-gray-500">
            Photo/video
          </span>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer flex-1 justify-center transition-colors">
          <MdInsertEmoticon className="text-yellow-500 text-2xl" />
          <span className="text-sm font-semibold text-gray-500">
            Feeling/activity
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
