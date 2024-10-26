import { PostInteractionProvider } from "@/components/context/User/PostInteractionContext";
import { MediaPost } from "@/lib/interface";
import ErrorPage from "../../../Error";
import PostComments from "../Shared/Comment/PostComments";
import { PostDisplayHeader } from "../Shared/Header/PostDisplayHeader";
import DisplayPost from "./DisplayPost";

interface Props {
  post: MediaPost;
}

const PostDisplayWrapper = ({ post }: Props) => {
  if (!post.id) return <ErrorPage />;

  return (
    <PostInteractionProvider post={post} key={`post-display-${post.id}`}>
      <>
        <PostComments postId={post.id} type="MEDIA" />
        <div className="relative w-full">
          <PostDisplayHeader post={post} />
          <DisplayPost post={post} />
        </div>
      </>
    </PostInteractionProvider>
  );
};

export default PostDisplayWrapper;
