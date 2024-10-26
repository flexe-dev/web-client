import { usePostComments } from "@/components/context/User/PostCommentContext";
import { Button } from "@/components/ui/Shared/button";
import { Textarea } from "@/components/ui/Shared/textarea";
import { CommentNode } from "@/lib/interface";
import { useState } from "react";
import { CommentProps } from "./CommentTree";

export const CommentEditor = (props: CommentProps) => {
  const { commentNode, root } = props;
  const { editComment, setEditTarget } = usePostComments();
  const [commentContent, setCommentContent] = useState<string>(
    commentNode.comment.content
  );

  const onCancel = () => {
    setEditTarget(undefined);
  };

  const onSave = () => {
    const updatedNode: CommentNode = {
      ...commentNode,
      comment: {
        ...commentNode.comment,
        content: commentContent,
        dateUpdated: new Date(),
      },
    };
    editComment(updatedNode, root);
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
