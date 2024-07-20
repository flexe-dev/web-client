import { UserPost } from "@/lib/interface";
import ErrorPage from "../../../Error";
import { PostDisplayHeader } from "../Header/PostDisplayHeader";
import DisplayPost from "./DisplayPost";

interface Props {
  post: UserPost;
}

const PostDisplayWrapper = ({ post }: Props) => {
  if (!post.id) return <ErrorPage />;

  return (
    <div className="relative w-full">
      <PostDisplayHeader
        postID={post.id}
        userID={post.auxData.userID}
        datePosted={post.auxData.dateCreated}
        updatedDate={post.auxData.dateUpdated}
        type="MEDIA"
      />
      <DisplayPost post={post} />
    </div>
  );
};

export default PostDisplayWrapper;
