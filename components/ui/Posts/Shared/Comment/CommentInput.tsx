"use client";

import { useAccountUser } from "@/components/context/User/AccountProvider/AccountUserProvider";
import { usePostComments } from "@/components/context/User/PostComments/PostCommentContext";
import { Button } from "@/components/ui/Shared/button";
import { Textarea } from "@/components/ui/Shared/textarea";
import { UserDetails } from "@/lib/interfaces/userTypes";
import { CreateCommentObject } from "@/lib/util/commentUtils";
import { toUserDetails } from "@/lib/util/userUtils";
import { cn, nullIfEmpty } from "@/lib/util/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CommentInput = () => {
  const { account } = useAccountUser();
  const { addComment, replyToComment, post, replyTarget, setReplyTarget } =
    usePostComments();
  const [comment, setComment] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [displayCommentActions, setDisplayCommentActions] =
    useState<boolean>(false);

  useEffect(() => {
    if (!replyTarget) return;

    // Automatically focus on the input when replying to a comment
    inputRef.current?.focus();

    // On Horizontal views (ie. Text posts, Scroll back up to the input box when replying to a comment)
    post.postType === "TEXT" &&
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [replyTarget]);

  if (!account) return null;

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const onSubmit = () => {
    const user: UserDetails = toUserDetails(account);

    if (!nullIfEmpty(comment)) {
      toast.error("Your comment cannot be empty");
      return;
    }

    const newComment = CreateCommentObject(comment, user, post.id!);

    replyTarget
      ? replyToComment(newComment, user, replyTarget)
      : addComment(newComment, user);

    // Clear metadata
    setReplyTarget(undefined);
    setComment("");
    setDisplayCommentActions(false);
    inputRef.current?.blur();
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
            Replying To: {replyTarget.root.user?.root.name}
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
