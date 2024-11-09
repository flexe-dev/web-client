import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/Shared/avatar";
import { timeAgo } from "@/lib/util/dateutils";
import { FC } from "react";
import { UserHoverCard } from "../../User/UserHoverCard";
import { Post } from "@/lib/interfaces/postTypes";
import { UserDetails } from "@/lib/interfaces/userTypes";
import { GetNameInitials } from "@/lib/util/userUtils";

interface Props {
  post: Post;
  user: UserDetails;
}

export const PostPreviewUserDetails: FC<Props> = ({ post, user }) => {
  return (
    <section className="flex space-x-1 items-center mb-2">
      <UserHoverCard user={user}>
        <Avatar className="w-10 h-10 mr-3 hover:brightness-75 transition-all">
          <AvatarImage
            className="object-cover"
            src={user.image ?? process.env.NEXT_PUBLIC_FALLBACK_PHOTO}
          />
        </Avatar>
      </UserHoverCard>
      <div className=" leading-tight">
        <div className="flex">
          <UserHoverCard user={user}>
            <span className="hover:underline cursor-pointer hover:text-blue-500">
              {user.username}
            </span>
          </UserHoverCard>
          <div className="ml-1 space-x-1 text-secondary-header flex items-center">
            <span>•</span>
            <span>{timeAgo(post.auxData.dateCreated)}</span>
          </div>
        </div>
        <span className="text-xs text-secondary-header">{user.job}</span>
      </div>
    </section>
  );
};

export const PostMainDisplayUserDetails: FC<Props> = ({ post, user }) => {
  return (
    <UserHoverCard user={user}>
      <div className="flex items-center">
        <Avatar>
          <AvatarImage
            src={user.image ?? process.env.NEXT_PUBLIC_DEFAULT_PHOTO}
          />
          <AvatarFallback>{GetNameInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <div className="flex">
            <span className="hover:underline hover:text-blue-500">
              {user.name}
            </span>

            <span className="mx-2">·</span>
            <span>{timeAgo(post.auxData.dateCreated)}</span>
            {post.auxData.dateUpdated && (
              <div className="ml-2 text-tertiary text-sm">
                - Edited {timeAgo(post.auxData.dateUpdated)}
              </div>
            )}
          </div>
          <div className="flex text-secondary-header">
            <span>@{user.username}</span>
            {user.job && <span className="mx-2">·</span>}
            <span>{user.job}</span>
          </div>
        </div>
      </div>
    </UserHoverCard>
  );
};
