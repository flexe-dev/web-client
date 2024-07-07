import { usePostComments } from "@/components/context/PostCommentContext";
import { timeAgo } from "@/lib/dateutils";
import { Comment, CommentNode, UserAccount } from "@/lib/interface";
import { GetNameInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { UserHoverCard } from "../../UserHoverCard";

interface Props {
  commentNode: CommentNode;
  hasParent: boolean;
}

interface CommentProps {
  comment: Comment;
  user: UserAccount;
  reply: boolean;
}

export const CommentTree = () => {
  const { comments } = usePostComments();
  return (
    <div className="w-full flex-grow">
      {comments.map((comment, index) => {
        return (
          <CommentThread
            key={`comment-thread-${index}`}
            commentNode={comment}
            hasParent={false}
          />
        );
      })}
    </div>
  );
};

const CommentThread = ({ commentNode, hasParent }: Props) => {
  const { comment, children, user } = commentNode;
  return (
    <div>
      <CommentBlock comment={comment} reply={hasParent} user={user} />
      <div className="ml-6 border-l-2">
        {children.map((child, index) => {
          return (
            <CommentThread
              key={`comment-thread-${index}`}
              commentNode={child}
              hasParent={true}
            />
          );
        })}
      </div>
    </div>
  );
};

const CommentBlock = (props: CommentProps) => {
  const { user: account, reply, comment } = props;
  const { user } = account;
  return (
    <div className="flex h-full w-full py-2">
      {reply && <ReplyThread />}
      <div className="flex flex-col w-full px-4">
        <CommentHeader {...props} />
        <CommentBody {...props} />
        <CommentFooter {...props} />
      </div>
    </div>
  );
};

const ReplyThread = () => {
  return (
    <div className="w-4 flex items-center">
      <div className="h-[1px] bg-border w-full"></div>
    </div>
  );
};

const CommentFooter = ({ comment }: CommentProps) => {
  return <div></div>;
};

const CommentHeader = ({ user: account, comment }: CommentProps) => {
  const { user } = account;
  return (
    <div className="flex items-center">
      <UserHoverCard account={account}>
        <Avatar>
          <AvatarImage
            src={user.image ?? process.env.NEXT_PUBLIC_DEFAULT_PHOTO}
          />
          <AvatarFallback>{GetNameInitials(user.name)}</AvatarFallback>
        </Avatar>
      </UserHoverCard>
      <div className="ml-2">
        <UserHoverCard account={account}>
          <div className="font-semibold">{user.name}</div>
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

const CommentBody = ({ comment }: CommentProps) => {
  return <div className="mt-2">{comment.content}</div>;
};
