import { PostInteractionProvider } from "@/components/context/PostInteractionContext";
import PostComments from "@/components/ui/Posts/Comment/PostComments";
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
    <PostInteractionProvider
      postId={post.id}
      postMetrics={post.metrics}
      postType="MEDIA"
    >
      <>
        <PostComments postId={post.id} type="MEDIA" />
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
      </>
    </PostInteractionProvider>
  );
};

export default PostDisplayWrapper;
