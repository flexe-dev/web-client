import { saveTextPost } from "@/controllers/PostController";
import { TextContent } from "@/lib/interfaces/postTypes";
import { GenerateTextPost } from "@/lib/util/postUtils";
import { GetNameInitials } from "@/lib/util/userUtils";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { SetStateAction, useState } from "react";
import { toast } from "sonner";
import { useAccountPost } from "../context/User/AccountProvider/AccountPostProvider";
import { useAccountUser } from "../context/User/AccountProvider/AccountUserProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Shared/avatar";
import { Button } from "../ui/Shared/button";
import {
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from "../ui/Shared/dialog";
import { Textarea } from "../ui/Shared/textarea";

interface DialogProps {
  dispatch: React.Dispatch<SetStateAction<boolean>>;
}

const PostCreateDialog = ({ dispatch }: DialogProps) => {
  const { account } = useAccountUser();
  const { data } = useSession();
  const { userPosts, setUserPosts } = useAccountPost();

  const [newTextPost, setNewTextPost] = useState<string>("");

  if (!account || !userPosts) return null;
  const { user } = account;

  const publishTextPost = async () => {
    const response = await handleTextPostPublish();
    if (!response) return;
    dispatch(false);
  };

  const handleTextPostPublish = async (): Promise<boolean> => {
    if (!data?.token) {
      toast.error("You need to be logged in to post");
      return false;
    }

    return new Promise<boolean>((resolve, reject) => {
      const content: TextContent = {
        content: newTextPost,
        media: [],
        userId: data.user.id,
      };

      const post = GenerateTextPost(content, data.user.id);

      toast.promise(saveTextPost(post, data.token), {
        loading: `Posting...`,
        success: (data) => {
          if (!data) return;
          setUserPosts({
            ...userPosts,
            textPosts: [data, ...userPosts.textPosts],
          });
          resolve(true);
          return `Your message has been posted`;
        },
        error: () => {
          reject(false);
          return "Oops! something went wrong";
        },
      });
    });
  };

  return (
    <DialogPortal>
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="w-full min-w-[37rem]">
        <DialogHeader className="mb-4 text-2xl font-bold">
          Create a new post
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={user?.image ?? process.env.NEXT_PUBLIC_DEFAULT_PHOTO}
                alt={user?.name ?? ""}
              />
              <AvatarFallback>{GetNameInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              className="text-base h-12 max-h-[10rem] w-[30rem]"
              onChange={(e) => setNewTextPost(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-end">
            <Button
              size={"sm"}
              variant={"outline"}
              className="mr-1 mt-2"
              onClick={publishTextPost}
            >
              Post
            </Button>
          </div>
          <div className="flex w-full items-center mt-2">
            <div className="h-[1px] ml-1 bg-primary w-full" />
            <span className="text-lg w-full mx-2 text-center">
              Or publish your work with
            </span>
            <div className="h-[1px] mr-1 bg-primary w-full" />
          </div>
          <div className="mt-2 w-full flex justify-center space-x-4">
            <Link href={"/new/media"}>
              <Button
                className="flex space-x-2"
                onClick={() => dispatch(false)}
                variant={"outline"}
              >
                <PhotoIcon className="w-6 h-6" />
                <span>Media Editor</span>
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  );
};

export default PostCreateDialog;
