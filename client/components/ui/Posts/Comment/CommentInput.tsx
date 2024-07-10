"use client";

import { useAccount } from "@/components/context/AccountProvider";
import { usePostComments } from "@/components/context/PostCommentContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GenerateCommentObject } from "@/lib/commentUtils";
import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CommentInput = () => {
  const { account } = useAccount();
  const { addComment, postID, replyTarget, setReplyTarget } = usePostComments();
  const [comment, setComment] = useState<string>("");

  if (!account) return null;

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const onSubmit = () => {
    const newNode = GenerateCommentObject(
      postID,
      account,
      comment,
      replyTarget?.comment?.id
    );
    addComment(newNode, replyTarget?.root);
    setComment("");
    //Idk Probably Scroll to the new comment
  };

  return (
    <div className={cn("border-t", replyTarget ? "h-[8rem]" : "h-[6rem]")}>
      {replyTarget && (
        <div className="relative h-[2rem] border-b w-full flex items-center py-2">
          <span className="ml-3 text-sm">
            Replying To: {replyTarget.user.user.name}
          </span>
          <Button
            onClick={() => setReplyTarget(undefined)}
            variant={"ghost"}
            size={"icon"}
            className="absolute w-8 h-8 flex items-center right-2"
          >
            <XMarkIcon className="stroke-primary w-6 h-6" />
          </Button>
        </div>
      )}
      <div className="flex items-center h-auto">
        <Textarea
          value={comment}
          onChange={handleValueChange}
          className={cn(
            "rounded-none border-0 resize-none overflow-y-auto focus-visible:outline-none h-[6rem] focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
          placeholder="Add a comment"
        />
        <Button
          onClick={onSubmit}
          className="rounded-none border-0 h-auto border-l w-[4rem]"
          variant={"outline"}
        >
          {replyTarget ? "Reply" : "Post"}
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
