"use client";

import { useAccount } from "@/components/context/AccountProvider";
import { usePostComments } from "@/components/context/PostCommentContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GenerateCommentObject } from "@/lib/commentUtils";
import { useState } from "react";

const CommentInput = () => {
  const { user } = useAccount();
  const { addComment, postID, replyTarget } = usePostComments();
  const [comment, setComment] = useState<string>("");
  const [style, setStyle] = useState<React.CSSProperties>({});

  if (!user) return null;

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
    setStyle({
      height: `${event.target.scrollHeight}px`,
    });
  };

  const onSubmit = () => {
    if (comment.trim() === "") return;
    const newComment = GenerateCommentObject(postID, user.id, comment);
    addComment(newComment);
    setComment("");
  };

  return (
    <div className="border-t h-[8rem]">
      <div className="border-b w-full h-[2rem]"></div>
      <div className="flex items-center">
        <Textarea
          onChange={handleValueChange}
          style={style}
          className="rounded-none border-0 resize-none h-[6rem] overflow-y-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Add a comment"
        />
        <Button
          onClick={onSubmit}
          className="rounded-none border-0 h-full border-l"
          variant={"outline"}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
