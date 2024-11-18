import { PostInteractionProvider } from "@/components/context/User/PostInteractions/PostInteractionContext";
import { MediaPost } from "@/lib/interfaces/postTypes";
import ErrorPage from "../../../Error";
import { PostDisplayHeader } from "../Shared/Header/PostDisplayHeader";
import PostComments from "../Shared/PostComments";
import DisplayPost from "./DisplayPost";

interface Props {
  post: MediaPost;
}

const PostDisplayWrapper = ({ post }: Props) => {
  if (!post.id) return <ErrorPage />;

  return (
    <PostInteractionProvider post={post} key={`post-display-${post.id}`}>
      <>
        <PostComments post={post} />
        <div className="relative w-full">
          <PostDisplayHeader post={post} />
          <DisplayPost post={post} className="md:pl-32 md:pr-16  xl:px-16" />
        </div>
      </>
    </PostInteractionProvider>
  );
};

export default PostDisplayWrapper;
