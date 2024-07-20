"use client";

import { usePostComments } from "@/components/context/PostCommentContext";
import { getTotalChildren } from "@/lib/commentUtils";
import { timeAgo } from "@/lib/dateutils";
import { CommentNode, CommentReactType } from "@/lib/interface";
import { cn, GetNameInitials } from "@/lib/utils";
import {
  ArrowDownIcon,
  ArrowRightCircleIcon,
  ArrowUpIcon,
  ChatBubbleLeftEllipsisIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { Button } from "../../button";
import { Skeleton } from "../../skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";
import { UserHoverCard } from "../../UserHoverCard";
import { CommentActions } from "./CommentActions";
import { CommentEditor } from "./CommentEditor";

interface CommentTreeProps {
  maxLevel: number;
  maxCommentReplies: number;
}

export interface CommentProps {
  commentNode: CommentNode;
  reply: boolean;
  root: CommentNode;
}

interface CommentThreadProps extends CommentProps, CommentTreeProps {
  level: number;
}

interface CommentReplyProps extends CommentThreadProps, CommentTreeProps {
  showMore: boolean;
}

export const CommentTree = (props: CommentTreeProps) => {
  const { comments } = usePostComments();
  return comments.length > 0 ? (
    <div className="h-auto flex-grow overflow-y-auto overflow-x-hidden overscroll-contain w-full">
      {comments.map((comment, index) => {
        return (
          <CommentThread
            {...props}
            key={`comment-thread-${index}`}
            commentNode={comment}
            root={comment}
            reply={false}
            level={0}
          />
        );
      })}
    </div>
  ) : (
    <EmptyCommentTemplate />
  );
};

const CommentThread = (props: CommentThreadProps) => {
  const { commentNode, root, level, maxCommentReplies, maxLevel, reply } =
    props;
  const { comment, children, user } = commentNode;
  const childTotal = getTotalChildren(commentNode);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <TooltipProvider>
      <div>
        <CommentBlock {...props} />
        {children.length > 0 &&
          (!collapse ? (
            level < maxLevel ? (
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
                <ThreadReplies {...props} showMore={showMore} />
                {!showMore && children.length > maxCommentReplies && (
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
              <div className="py-1 bg-background -translate-x-4">
                <Button
                  className="flex bg-background  my-1 py-2 px-1"
                  variant={"ghost"}
                >
                  {" "}
                  <ArrowRightCircleIcon className="w-6 h-6 mr-2 " /> See More
                  Replies
                </Button>
              </div>
            )
          ) : (
            <div className="flex">
              {level > 0 && <ReplyThread />}
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
            </div>
          ))}
      </div>
    </TooltipProvider>
  );
};

const ThreadReplies = (props: CommentReplyProps) => {
  const { level, commentNode, root, showMore, maxCommentReplies, maxLevel } =
    props;
  const { children } = commentNode;
  return children
    .slice(0, showMore ? children.length : maxCommentReplies)
    .map((child, index) => {
      return (
        <CommentThread
          maxCommentReplies={maxCommentReplies}
          maxLevel={maxLevel}
          level={level + 1}
          key={`comment-thread-${index}`}
          commentNode={child}
          root={root}
          reply={true}
        />
      );
    });
};

const CommentBlock = (props: CommentProps) => {
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

const CommentFooter = ({ commentNode, root }: CommentProps) => {
  const { comment, user } = commentNode;
  const {
    setReplyTarget,
    likeComment,
    dislikeComment,
    commentReactions,
    removeReaction,
  } = usePostComments();
  const { reactions, loading } = commentReactions;
  // const userReact = reactions.get(comment.id);
  const userReact = reactions.get(comment.id);
  if (loading) return <Skeleton className="h-6 w-full mx-4" />;

  const reactFunction: Record<
    CommentReactType,
    (node: CommentNode, root: CommentNode, opposite: boolean) => void
  > = {
    LIKE: likeComment,
    DISLIKE: dislikeComment,
  };

  const handleButtonState = (
    type: CommentReactType,
    node: CommentNode,
    root: CommentNode
  ): void => {
    userReact === type
      ? removeReaction(node, root)
      : reactFunction[type](node, root, !!userReact);
  };

  return (
    <div className="flex items-center relative pt-2 ml-4">
      <div className="flex w-fit items-center">
        <Button
          onClick={() => handleButtonState("DISLIKE", commentNode, root)}
          className="h-8 w-8 mr-2"
          size={"icon"}
          variant={"ghost"}
        >
          <ArrowDownIcon
            className={cn(
              ` h-5`,
              userReact === "DISLIKE" &&
                "stroke-orange-700 dark:stroke-orange-500"
            )}
          />
        </Button>
        <span className="w-7 text-secondary-header text-sm">
          {comment.likes - comment.dislikes}
        </span>
        <Button
          onClick={() => handleButtonState("LIKE", commentNode, root)}
          className="h-8 w-8 mr-2"
          size={"icon"}
          variant={"ghost"}
        >
          <ArrowUpIcon
            className={cn(
              ` h-5`,
              userReact === "LIKE" && "stroke-orange-700 dark:stroke-orange-500"
            )}
          />
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

const CommentHeader = (props: CommentProps) => {
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

const CommentBody = (props: CommentProps) => {
  const { commentNode } = props;
  const { editTarget } = usePostComments();
  const { comment } = commentNode;
  return editTarget?.node.comment.id === comment.id ? (
    <CommentEditor {...props} />
  ) : (
    <div className="mt-2">{comment.content}</div>
  );
};

const EmptyCommentTemplate = () => {
  return (
    <div className="flex justify-center min-h-[6rem] py-16 h-auto flex-grow items-center">
      <div>
        <ChatBubbleLeftEllipsisIcon className="w-16 h-16" />
      </div>
      <div className="ml-8">
        <div className="text-lg font-bold">
          No one has responded to this post yet
        </div>
        <div className="text-secondary-header">
          Share some thoughts and get a conversation started
        </div>
      </div>
    </div>
  );
};
