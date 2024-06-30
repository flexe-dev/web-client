import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { UserPost } from "@/lib/interface";
import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect } from "react";
import { useProfileViewer } from "@/components/context/UserProfileProvider";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import DisplayPost from "./DisplayPost";
import PostAuxData from "./PostAuxData";
import UserPostOptions from "./UserPostOptions";

interface Props {
  callback: () => void;
  selectedPost?: UserPost;
}

const PostDisplayModal = (props: Props) => {
  const { selectedPost, callback } = props;
  const { isOwnProfile } = useProfileViewer();

  useEffect(() => {
    //Retrieve External Post Data (ie. Comments, User Likes, etc)
  }, [selectedPost]);

  if (!selectedPost) return null;

  return (
    <TooltipProvider>
      <Tooltip defaultOpen={false} delayDuration={30}>
        <Dialog open={!!selectedPost} onOpenChange={callback}>
          <DialogContent className="p-0 min-w-[80%] lg:max-w-[90%] h-[80dvh] flex flex-col">
            <div className="w-full flex justify-center items-center z-[80] min-h-[3rem] max-h-[3rem] bg-background border-b-2">
              <UserPostOptions post={selectedPost}>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="absolute left-2 h-8"
                >
                  <EllipsisHorizontalIcon className="w-6 h-6" />
                </Button>
              </UserPostOptions>
              <Link href={`/post/media/${selectedPost.id}`}>
                <h2 className="w-[15rem] truncate text-xl font-bold hover:underline">
                  {selectedPost.auxData.title}{" "}
                </h2>
              </Link>
              <DialogClose className="absolute right-2">
                <Button size={"icon"} className="h-8" variant={"ghost"}>
                  <XMarkIcon className="h-6" />
                </Button>
              </DialogClose>
            </div>
            <div className="flex -mt-4 h-[calc(80dvh-3.125rem)]">
              <PostAuxData selectedPost={selectedPost} />
              <div className="overflow-y-auto overflow-x-hidden w-full">
                <DisplayPost post={selectedPost} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PostDisplayModal;
