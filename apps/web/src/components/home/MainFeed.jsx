import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";

const MainFeed = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <CreatePostCard />
      <PostCard />
    </div>
  );
};

export default MainFeed;
