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
          <DisplayPost post={post} className="md:pl-32 md:pr-16  xl:px-16" />
        </div>
      </>
    </PostInteractionProvider>
  );
};

export default PostDisplayWrapper;
