"use client";

import { usePostComments } from "@/components/context/User/PostComments/PostCommentContext";
import { Button } from "@/components/ui/Shared/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Shared/tooltip";
import {
  CommentLimitations,
  LinkedComment,
  Comment as TComment,
} from "@/lib/interfaces/commentTypes";
import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import {
  GenerateLinkedComment,
  GetCommentDepthLevel,
  getTotalChildren,
} from "@/lib/util/commentUtils";
import {
  ArrowRightCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { FC, useMemo, useState } from "react";
import { Comment } from "../Comment";

interface CommentTreeProps {
  sizeLimits: CommentLimitations;
}

export interface CommentProps {
  comment: TComment;
}

interface CommentThreadProps extends CommentProps, CommentTreeProps {
  parent?: LinkedComment;
}

interface CommentReplyProps {
  showMore: boolean;
  comment: LinkedComment;
  sizeLimits: CommentLimitations;
}

export const CommentTree: FC<CommentTreeProps> = ({ sizeLimits }) => {
  const { comments } = usePostComments();

  return comments.length > 0 ? (
    <div className="h-auto flex-grow overflow-y-auto overflow-x-hidden overscroll-contain w-full">
      {comments.map((comment, index) => {
        return (
          <CommentThread
            key={`comment-thread-${index}`}
            comment={comment}
            sizeLimits={sizeLimits}
          />
        );
      })}
    </div>
  ) : (
    <EmptyCommentTemplate />
  );
};

const CommentThread: FC<CommentThreadProps> = ({
  comment: node,
  sizeLimits,
  parent,
}) => {
  // Generates a comment object that can be linked to its root node
  const comment = useMemo(() => {
    return GenerateLinkedComment(node, parent);
  }, [node]);

  // Traverses the comment tree to get the total number of children
  const childTotal = useMemo(() => {
    return getTotalChildren(comment);
  }, [node]);

  // Find the depth of the comment within the tree to determine additional child rendering
  const commentDepth = useMemo(() => {
    return GetCommentDepthLevel(comment);
  }, [comment]);

  const [collapse, setCollapse] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  const { root } = comment;

  return (
    <TooltipProvider>
      <Comment comment={comment} />
      {root.children.length > 0 &&
        (!collapse ? (
          commentDepth < sizeLimits.level ? (
            // Display all replies to the comment
            <CommentThreadActions
              collapse={setCollapse}
              childTotal={childTotal}
              directChildrenTotal={root.children.length}
              extend={setShowMore}
              showMore={showMore}
              limits={sizeLimits}
            >
              <ThreadReplies
                comment={comment}
                showMore={showMore}
                sizeLimits={sizeLimits}
              />
            </CommentThreadActions>
          ) : (
            // If the comment depth is greater than the size limit, render a modal containing the entire thread
            <CommentThreadModalOpen />
          )
        ) : (
          // If the comment is collapsed, render a button to expand
          <CommentThreadExpand
            depth={commentDepth}
            collapse={setCollapse}
            childTotal={childTotal}
          />
        ))}
    </TooltipProvider>
  );
};

const ThreadReplies: FC<CommentReplyProps> = ({
  comment,
  showMore,
  sizeLimits,
}) => {
  const { children } = comment.root;

  return children
    .slice(0, showMore ? children.length : sizeLimits.replies)
    .map((child, index) => {
      return (
        <CommentThread
          sizeLimits={sizeLimits}
          parent={comment}
          key={`comment-thread-${index}`}
          comment={child}
        />
      );
    });
};

export const ReplyThread = () => {
  return (
    <div className="min-w-4 flex items-center">
      <div className="h-[1px] bg-border w-full"></div>
    </div>
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

interface CommentCollapseProps {
  collapse: (value: boolean) => void;
  childTotal: number;
}

interface CommentExtendProps {
  extend: (value: boolean) => void;
  showMore: boolean;
  directChildrenTotal: number;
  limits: CommentLimitations;
}

interface CommentExpandProps extends CommentCollapseProps {
  depth: number;
}

interface CommentThreadActionsProps
  extends CommentCollapseProps,
    CommentExtendProps,
    ChildNodeProps {}

const CommentThreadActions: FC<CommentThreadActionsProps> = ({
  children,
  childTotal,
  collapse,
}) => {
  return (
    <div className="ml-6 border-l-2 relative">
      <CommentThreadCollapse childTotal={childTotal} collapse={collapse} />
      {children}
    </div>
  );
};

const CommentThreadCollapse: FC<CommentCollapseProps> = ({
  collapse,
  childTotal,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => collapse(true)}
          className="absolute w-8 h-8 -left-4 top-2 bg-background flex items-center"
        >
          <MinusCircleIcon className="w-6 h-6" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        Hide {childTotal} {childTotal > 1 ? "replies" : "reply"}
      </TooltipContent>
    </Tooltip>
  );
};

const CommentThreadExtend: FC<CommentExtendProps> = ({
  showMore,
  limits,
  directChildrenTotal,
  extend,
}) => {
  if (showMore && directChildrenTotal < limits.replies) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => extend(true)}
          className="absolute w-8 h-8 -left-4 bottom-2 bg-background flex items-center"
        >
          <PlusCircleIcon className="w-6 h-6" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">Show more replies</TooltipContent>
    </Tooltip>
  );
};

const CommentThreadExpand: FC<CommentExpandProps> = ({
  collapse,
  childTotal,
  depth,
}) => {
  return (
    <div className="flex">
      {depth > 0 && <ReplyThread />}
      <Button
        variant={"ghost"}
        onClick={() => collapse(false)}
        className="bg-background flex items-center ml-4"
      >
        <PlusCircleIcon className="w-6 h-6 mr-2" />
        <div>
          Show {childTotal} {childTotal > 1 ? "replies" : "reply"}{" "}
        </div>
      </Button>
    </div>
  );
};

const CommentThreadModalOpen = () => {
  return (
    <div className="py-1 bg-background -translate-x-4">
      <Button className="flex bg-background  my-1 py-2 px-1" variant={"ghost"}>
        {" "}
        <ArrowRightCircleIcon className="w-6 h-6 mr-2 " /> See More Replies
      </Button>
    </div>
  );
};
