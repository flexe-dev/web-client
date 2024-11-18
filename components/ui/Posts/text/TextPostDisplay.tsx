import { PostInteractionProvider } from "@/components/context/User/PostInteractions/PostInteractionContext";
import { TextPost } from "@/lib/interfaces/postTypes";
import PostComments from "../Shared/PostComments";
import { TextDisplayContent } from "./TextDisplayContext";

interface Props {
  post: TextPost;
}

export const TextPostDisplay = ({ post }: Props) => {
  return (
    <PostInteractionProvider post={post}>
      <div className="w-full border-b border-x rounded-b-md">
        <TextDisplayContent post={post} />
      </div>
      <PostComments post={post} />
    </PostInteractionProvider>
  );
};
