import { UserPost } from "@/lib/interface";
import DisplayPost from "./DisplayPost";

interface Props {
  post: UserPost;
}

const PostDisplayWrapper = async ({ post }: Props) => {
  return (
    <div className="w-full h-full flex-col">
      <DisplayPost post={post} />
    </div>
  );
};

export default PostDisplayWrapper;
