"use client";

import { useAccountUser } from "@/components/context/User/AccountUserProvider";
import { usePostComments } from "@/components/context/User/PostCommentContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GenerateCommentObject } from "@/lib/util/commentUtils";
import { cn, nullIfEmpty } from "@/lib/util/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CommentInput = () => {
  const { account } = useAccountUser();
  const { addComment, postID, replyTarget, setReplyTarget, type } =
    usePostComments();
  const [comment, setComment] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [displayCommentActions, setDisplayCommentActions] =
    useState<boolean>(false);

  useEffect(() => {
    if (!replyTarget) return;

    inputRef.current?.focus();
    type === "TEXT" &&
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [replyTarget]);

  if (!account) return null;

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const onSubmit = () => {
    if (!nullIfEmpty(comment)) {
      toast.error("Your comment cannot be empty");
      return;
    }

    const newNode = GenerateCommentObject(
      postID,
      account,
      comment,
      replyTarget?.comment?.id
    );
    addComment(newNode, replyTarget?.root);
    setComment("");
    setDisplayCommentActions(false);
    inputRef.current?.blur();
    //Idk Probably Scroll to the new comment
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  const onCancel = () => {
    setReplyTarget(undefined);
    setDisplayCommentActions(false);
    setComment("");
  };

  const cancelReplyTarget = () => {
    setReplyTarget(undefined);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("border-t w-full")}>
      {replyTarget && (
        <div className="relative h-[2.5rem] border-b w-full flex items-center py-2">
          <span className="ml-3 text-sm">
            Replying To: {replyTarget.user.user.name}
          </span>
          <Button
            onClick={cancelReplyTarget}
            variant={"ghost"}
            size={"icon"}
            className="absolute w-8 h-8 flex items-center right-2"
          >
            <XMarkIcon className="stroke-primary w-6 h-6" />
          </Button>
        </div>
      )}

      <div className="flex flex-col h-auto">
        <Textarea
          ref={inputRef}
          onFocus={() => setDisplayCommentActions(true)}
          value={comment}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={handleValueChange}
          className={cn(
            "rounded-none border-0 resize-none overflow-y-auto focus-visible:outline-none h-16 focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
          placeholder="Add a comment"
        />
        {displayCommentActions && (
          <div className=" flex justify-end pr-4 mt-2 mb-4">
            <Button variant={"destructive"} onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSubmit} className="ml-2" variant={"outline"}>
              {replyTarget ? "Reply" : "Post"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentInput;
