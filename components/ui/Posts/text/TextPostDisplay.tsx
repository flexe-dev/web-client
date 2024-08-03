import { UserTextPost } from "@/lib/interface";
import { TextDisplayContent } from "./TextDisplayContext";

interface Props {
  post: UserTextPost;
}

export const TextPostDisplay = ({ post }: Props) => {
  return (
    <div className="w-full border-b border-x rounded-b-md">
      <TextDisplayContent post={post} />
    </div>
  );
};
