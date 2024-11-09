"use client";

import { PostToolsProvider } from "@/components/context/User/PostOptionToolProvider";
import { Post } from "@/lib/interfaces/postTypes";
import { UserDisplay } from "@/lib/interfaces/userTypes";
import { toUserDetails } from "@/lib/util/userUtils";
import { cn } from "@/lib/util/utils";
import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Button } from "../../../Shared/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../Shared/tooltip";
import { PostMainDisplayUserDetails } from "../PostUserDetails";

interface Props {
  account: UserDisplay;
  post: Post;
}

export const HeaderContent = (props: Props) => {
  const { account, post } = props;
  const { postType } = post;

  return (
    <>
      <TooltipProvider>
        <div
          className={cn(
            "sticky top-[5rem] flex border-b w-full items-center h-[5rem] backdrop-blur-xl z-[30]",
            postType === "MEDIA"
              ? "md:pl-[4rem] xl:pl-0"
              : "mt-6 rounded-t-md border-x border-t"
          )}
        >
          <PreviousPage />
          <PostMainDisplayUserDetails
            post={post}
            user={toUserDetails(account)}
          />
          <PostToolsProvider post={post} key={`post-header-tool-${post.id}`}>
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
