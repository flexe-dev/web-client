import { PostInteractionProvider } from "@/components/context/User/PostInteractionContext";
import { TextPost } from "@/lib/interface";
import PostComments from "../Shared/Comment/PostComments";
import { TextDisplayContent } from "./TextDisplayContext";

interface Props {
  post: TextPost;
}

export const TextPostDisplay = ({ post }: Props) => {
  return (
    <PostInteractionProvider post={post}>
      <>
        <div className="w-full border-b border-x rounded-b-md">
          <TextDisplayContent post={post} />
        </div>
        <PostComments postId={post.id!} type="TEXT" />
      </>
    </PostInteractionProvider>
  );
};
