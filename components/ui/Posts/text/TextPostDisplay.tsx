import { PostInteractionProvider } from "@/components/context/PostInteractionContext";
import { UserTextPost } from "@/lib/interface";
import PostComments from "../Comment/PostComments";
import { TextDisplayContent } from "./TextDisplayContext";

interface Props {
  post: UserTextPost;
}

export const TextPostDisplay = ({ post }: Props) => {
  return (
    <PostInteractionProvider
      postId={post.id!}
      postMetrics={post.metrics}
      postType="TEXT"
    >
      <>
        <div className="w-full border-b border-x rounded-b-md">
          <TextDisplayContent post={post} />
        </div>
        <PostComments postId={post.id!} type="TEXT" />
      </>
    </PostInteractionProvider>
  );
};
