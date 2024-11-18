import { usePostComments } from "@/components/context/User/PostComments/PostCommentContext";
import { Button } from "@/components/ui/Shared/button";
import { Textarea } from "@/components/ui/Shared/textarea";
import { LinkedComment } from "@/lib/interfaces/commentTypes";
import { FC, useState } from "react";
import { LinkedCommentProps } from "./Comment";

export const CommentEditor: FC<LinkedCommentProps> = ({ comment }) => {
  const { editComment, setEditTarget } = usePostComments();
  const [commentContent, setCommentContent] = useState<string>(
    comment.root.content
  );

  const onCancel = () => {
    setEditTarget(undefined);
  };

  const onSave = () => {
    const updatedNode: LinkedComment = {
      ...comment,
      root: {
        ...comment.root,
        content: commentContent,
        dateUpdated: new Date(),
      },
    };
    editComment(updatedNode);
    setEditTarget(undefined);
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  return (
    <div className="mt-3">
      <Textarea
        className="h-fit"
        value={commentContent}
        onChange={onCommentChange}
      />
      <div className="flex">
        <Button onClick={onCancel} variant={"link"}>
          Cancel
        </Button>
        <Button onClick={onSave} variant={"link"}>
          Save
        </Button>
      </div>
    </div>
  );
};
