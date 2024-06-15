import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { UserPost } from "@/lib/interface";
import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect } from "react";
import { useProfileViewer } from "../context/UserProfileProvider";
import { Button } from "../ui/button";
import { Tooltip, TooltipProvider } from "../ui/tooltip";
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
          <DialogContent className="p-0 min-w-[80%] lg:max-w-[90%] max-h-[80%] overscroll-none overflow-x-hidden overflow-y-scroll">
            <div className="sticky top-0 w-full flex justify-center items-center z-[80] h-[3rem] bg-background border-b-2">
              <UserPostOptions post={selectedPost}>
                {isOwnProfile && (
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="absolute left-2 h-8"
                  >
                    <EllipsisHorizontalIcon className="w-6 h-6" />
                  </Button>
                )}
              </UserPostOptions>
              <Link href={`/post/media/${selectedPost.id}`}>
                <Button variant={"link"}>
                  <h2 className="w-[15rem] truncate">
                    {selectedPost.auxData.title}{" "}
                  </h2>
                </Button>
              </Link>
              <DialogClose className="absolute right-2">
                <Button size={"icon"} className="h-8" variant={"ghost"}>
                  <XMarkIcon className="h-6" />
                </Button>
              </DialogClose>
            </div>
            <div className="flex relative -my-4">
              <PostAuxData selectedPost={selectedPost} />

              <DisplayPost post={selectedPost} />
            </div>
          </DialogContent>
        </Dialog>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PostDisplayModal;
