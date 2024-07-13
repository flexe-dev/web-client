"use client";

import { usePostComments } from "@/components/context/PostCommentContext";
import { getTotalChildren } from "@/lib/commentUtils";
import { timeAgo } from "@/lib/dateutils";
import { CommentNode } from "@/lib/interface";
import { cn, GetNameInitials } from "@/lib/utils";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { Button } from "../../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";
import { UserHoverCard } from "../../UserHoverCard";
import { CommentActions } from "./CommentActions";

interface Props {
  commentNode: CommentNode;
  root: CommentNode;
  reply: boolean;
}

export const CommentTree = () => {
  const { comments } = usePostComments();
  return (
    <div className="h-auto flex-grow overflow-y-auto overflow-x-hidden overscroll-contain pb-4">
      {comments.map((comment, index) => {
        return (
          <CommentThread
            key={`comment-thread-${index}`}
            commentNode={comment}
            root={comment}
            reply={false}
          />
        );
      })}
    </div>
  );
};

const CommentThread = (props: Props) => {
  const { commentNode, root } = props;
  const { comment, children, user } = commentNode;
  const childTotal = getTotalChildren(commentNode);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const MAX_COMMENT_DISPLAY = 4;
  return (
    <TooltipProvider>
      <div>
        <CommentBlock {...props} />
        {children.length > 0 &&
          (!collapse ? (
            <div className="ml-6 border-l-2 relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => setCollapse(true)}
                    className="absolute w-8 h-8 -left-4 top-2 bg-background flex items-center"
                  >
                    <MinusCircleIcon className="w-6 h-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Hide {childTotal} {childTotal > 1 ? "replies" : "reply"}
                </TooltipContent>
              </Tooltip>
              {children
                .slice(0, showMore ? children.length : MAX_COMMENT_DISPLAY)
                .map((child, index) => {
                  return (
                    <CommentThread
                      key={`comment-thread-${index}`}
                      commentNode={child}
                      root={root}
                      reply={true}
                    />
                  );
                })}
              {!showMore && children.length > MAX_COMMENT_DISPLAY && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => setShowMore(true)}
                      className="absolute w-8 h-8 -left-4 bottom-2 bg-background flex items-center"
                    >
                      <PlusCircleIcon className="w-6 h-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Show more replies
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          ) : (
            <Button
              variant={"ghost"}
              onClick={() => setCollapse(false)}
              className="bg-background flex items-center ml-4"
            >
              <PlusCircleIcon className="w-6 h-6 mr-2" />
              <div>
                Show {childTotal} {childTotal > 1 ? "replies" : "reply"}{" "}
              </div>
            </Button>
          ))}
      </div>
    </TooltipProvider>
  );
};

const CommentBlock = (props: Props) => {
  const { commentNode, reply } = props;
  const { comment, user: account } = commentNode;
  const { replyTarget } = usePostComments();

  return (
    <div className="flex h-full w-full">
      {reply && <ReplyThread />}
      <div
        className={cn(
          `flex flex-col w-full p-4 transition-all`,
          replyTarget?.comment.id === comment.id && "bg-secondary/50",
          reply && "rounded-l-md"
        )}
      >
        <CommentHeader {...props} />
        <CommentBody {...props} />
        <CommentFooter {...props} />
      </div>
    </div>
  );
};

const ReplyThread = () => {
  return (
    <div className="min-w-4 flex items-center">
      <div className="h-[1px] bg-border w-full"></div>
    </div>
  );
};

const CommentFooter = ({ commentNode, root }: Props) => {
  const { comment, user } = commentNode;
  const { setReplyTarget, likeComment } = usePostComments();
  return (
    <div className="flex items-center relative pt-2 ml-4">
      <div className="flex w-fit items-center">
        <Button className="h-7 w-7 mr-2" size={"icon"} variant={"ghost"}>
          <ArrowDownIcon className=" h-5" />
        </Button>
        <span className="w-5 text-secondary-header text-sm">
          {comment.likes - comment.dislikes}
        </span>
        <Button
          onClick={() => likeComment(commentNode, root)}
          className="h-7 w-7 ml-2"
          size={"icon"}
          variant={"ghost"}
        >
          <ArrowUpIcon className="h-5" />
        </Button>
      </div>
      <Button
        onClick={() => setReplyTarget({ comment, user, root })}
        variant={"ghost"}
        className="ml-6 px-2 w-fit h-7 font-bold"
      >
        Reply
      </Button>
      <CommentActions node={commentNode} root={root} />
    </div>
  );
};

const CommentHeader = (props: Props) => {
  const { commentNode } = props;
  const { user: account, comment } = commentNode;
  const { user } = account;

  if (!user) return;

  return (
    <div className="flex items-center">
      <UserHoverCard account={account}>
        <Avatar className="hover:brightness-75 transition-all">
          <AvatarImage
            src={user?.image ?? process.env.NEXT_PUBLIC_DEFAULT_PHOTO}
          />
          <AvatarFallback>{GetNameInitials(user.name)}</AvatarFallback>
        </Avatar>
      </UserHoverCard>
      <div className="ml-2">
        <UserHoverCard account={account}>
          <div className="font-semibold hover:underline">{user.name}</div>
        </UserHoverCard>
        <div className="flex ">
          <div className="text-sm text-secondary-header">
            {timeAgo(new Date(comment.dateCreated))}
          </div>
          {comment.dateUpdated && (
            <div className="ml-2 text-tertiary text-sm">
              - Edited {timeAgo(comment.dateUpdated)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentBody = ({ commentNode }: Props) => {
  const { comment } = commentNode;
  return <div className="mt-2">{comment.content}</div>;
};
