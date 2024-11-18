import { useAccountUser } from "@/components/context/User/AccountProvider/AccountUserProvider";
import { UseLoginModal } from "@/components/context/User/LoginModalHandler/LoginModalProvider";
import { usePostComments } from "@/components/context/User/PostComments/PostCommentContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/Shared/avatar";
import { Button } from "@/components/ui/Shared/button";
import { UserHoverCard } from "@/components/ui/User/UserHoverCard";
import { LinkedComment, ReactionType } from "@/lib/interfaces/commentTypes";
import { CalculateCommentMetric } from "@/lib/util/commentUtils";
import { timeAgo } from "@/lib/util/dateutils";
import {
  GetNameInitials,
  isAuthenticated,
  toUserDetails,
} from "@/lib/util/userUtils";
import { cn } from "@/lib/util/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { CommentActions } from "./Actions/CommentActions";
import { CommentEditor } from "./CommentEditor";
import { ReplyThread } from "./Tree/CommentTree";

export interface LinkedCommentProps {
  comment: LinkedComment;
}

export const Comment: FC<LinkedCommentProps> = (props) => {
  const { comment } = props;

  console.log(comment);
  const { replyTarget } = usePostComments();

  return (
    <div className="flex h-full w-full">
      {!comment.isRoot && <ReplyThread />}
      <div
        className={cn(
          `flex flex-col w-full p-4 transition-all`,
          replyTarget?.root.id === comment.root.id && "bg-secondary/50",
          !comment.isRoot && "rounded-l-md"
        )}
      >
        <CommentHeader {...props} />
        <CommentBody {...props} />
        <CommentFooter {...props} />
      </div>
    </div>
  );
};

const CommentHeader: FC<LinkedCommentProps> = ({ comment }) => {
  const { createdAt } = comment;
  const { user, dateUpdated } = comment.root;

  return (
    <div className="flex items-center">
      <UserHoverCard user={user?.root}>
        <Avatar className="hover:brightness-75 transition-all">
          <AvatarImage
            src={user?.root.image ?? process.env.NEXT_PUBLIC_DEFAULT_PHOTO}
          />
          {user && (
            <AvatarFallback>{GetNameInitials(user.root.name)}</AvatarFallback>
          )}
        </Avatar>
      </UserHoverCard>
      <div className="ml-2">
        <UserHoverCard user={user?.root}>
          <div className="font-semibold hover:underline">
            {user?.root.name ?? "[Removed]"}
          </div>
        </UserHoverCard>
        <div className="flex ">
          <div className="text-sm text-secondary-header">
            {timeAgo(new Date(createdAt))}
          </div>
          {dateUpdated && (
            <div className="ml-2 text-tertiary text-sm">
              - Edited {timeAgo(dateUpdated)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentBody: FC<LinkedCommentProps> = ({ comment }) => {
  const { editTarget } = usePostComments();

  return editTarget?.root.id === comment.root.id ? (
    <CommentEditor comment={comment} />
  ) : (
    <div className="mt-2">{comment.root.content}</div>
  );
};

const CommentFooter: FC<LinkedCommentProps> = ({ comment }) => {
  const {
    commentReactions,
    removeReaction,
    setReplyTarget,
    handleCommentReaction,
  } = usePostComments();
  const { status } = useSession();
  const { setOpen } = UseLoginModal();
  const { account } = useAccountUser();

  const userCommentReaction: ReactionType | undefined = commentReactions.get(
    comment.root.id
  )?.reactionType;

  const handleUserReactionAction = (type: ReactionType): void => {
    if (!isAuthenticated(status)) {
      setOpen(true);
      return;
    }

    //User has pre-existing reaction matching Button action (ie. Like -> Like)
    userCommentReaction === type
      ? removeReaction(comment)
      : handleCommentReaction(
          comment,
          type,
          toUserDetails(account!),
          //Reversion of pre-existing opposite reaction (ie. Removing a previous existing dislike when liking if such exists)
          !!userCommentReaction
        );
  };

  const handleReplyCallback = () => {
    if (!isAuthenticated(status)) {
      //Open Logic Action Modal
      setOpen(true);
      return;
    }

    setReplyTarget(comment);
  };

  return (
    <div className="flex items-center relative pt-2 ml-4 mr-3">
      <div className="flex w-fit items-center">
        <Button
          //Action changes between Reaction (Dislike) and Reaction Removal
          onClick={() => handleUserReactionAction("DISLIKE")}
          className="h-8 w-8 mr-2"
          size={"icon"}
          variant={"ghost"}
          disabled={comment.root.status !== "PUBLIC"}
        >
          <ArrowDownIcon
            className={cn(
              ` h-5`,
              userCommentReaction === "DISLIKE" &&
                "stroke-orange-700 dark:stroke-orange-500"
            )}
          />
        </Button>
        <span className="w-7 text-secondary-header text-sm">
          {CalculateCommentMetric(comment)}
        </span>
        <Button
          //Action changes between Reaction (Like) and Reaction Removal
          onClick={() => handleUserReactionAction("LIKE")}
          className="h-8 w-8 mr-2"
          size={"icon"}
          variant={"ghost"}
          disabled={comment.root.status !== "PUBLIC"}
        >
          <ArrowUpIcon
            className={cn(
              ` h-5`,
              userCommentReaction === "LIKE" &&
                "stroke-orange-700 dark:stroke-orange-500"
            )}
          />
        </Button>
      </div>
      <Button
        onClick={handleReplyCallback}
        variant={"ghost"}
        className="ml-6 px-2 w-fit h-7 font-bold"
      >
        Reply
      </Button>
      <CommentActions comment={comment} />
    </div>
  );
};
