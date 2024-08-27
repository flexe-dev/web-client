"use client";

import { PostToolsProvider } from "@/components/context/PostOptionToolProvider";
import { timeAgo } from "@/lib/dateutils";
import { PostType, UserDisplay } from "@/lib/interface";
import { cn, GetNameInitials } from "@/lib/utils";
import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { Button } from "../../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";
import { UserHoverCard } from "../../UserHoverCard";

interface Props {
  account: UserDisplay;
  datePosted: Date;
  updatedDate?: Date;
  postID: string;
  type: PostType;
}

export const HeaderContent = (props: Props) => {
  const { account, datePosted, updatedDate, type, postID } = props;
  const { user, profile } = account;
  return (
    <>
      <TooltipProvider>
        <div
          className={cn(
            "sticky top-[5rem] flex border-b w-full items-center h-[5rem] backdrop-blur-xl z-[30]",
            type === "MEDIA"
              ? "md:pl-[4rem] xl:pl-0"
              : "mt-6 rounded-t-md border-x border-t"
          )}
        >
          <PreviousPage />
          <UserHoverCard account={account}>
            <div className="flex items-center">
              <Avatar>
                <AvatarImage
                  src={user.image ?? process.env.NEXT_PUBLIC_DEFAULT_PHOTO}
                />
                <AvatarFallback>{GetNameInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <div className="flex">
                  <span>{user.name}</span>
                  <span className="mx-2">·</span>
                  <span>{timeAgo(datePosted)}</span>
                  {updatedDate && (
                    <div className="ml-2 text-tertiary text-sm">
                      - Edited {timeAgo(updatedDate)}
                    </div>
                  )}
                </div>
                <div className="flex text-secondary-header">
                  <span>@{user.username}</span>
                  {profile?.job && <span className="mx-2">·</span>}
                  <span>{profile?.job}</span>
                </div>
              </div>
            </div>
          </UserHoverCard>
          <PostToolsProvider postType={type} postId={postID}>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="absolute right-8"
            >
              <EllipsisHorizontalIcon className="w-7 h-7" />
            </Button>
          </PostToolsProvider>
        </div>
      </TooltipProvider>
    </>
  );
};

const PreviousPage = () => {
  const router = useRouter();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="ml-4 mr-8"
          onClick={router.back}
        >
          <ArrowLeftIcon className="w-8 h-8" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">Go Back</TooltipContent>
    </Tooltip>
  );
};
