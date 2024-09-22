import { saveTextPost } from "@/controllers/PostController";
import { TextPost } from "@/lib/interface";
import { GetNameInitials } from "@/lib/utils";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { SetStateAction, useState } from "react";
import { toast } from "sonner";
import { useAccountPost } from "../context/AccountPostProvider";
import { useAccountUser } from "../context/AccountUserProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

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
      const textPost: Omit<TextPost, "metrics"> = {
        id: undefined,
        userID: user?.id,
        createdAt: new Date(),
        textpost: newTextPost,
      };
      toast.promise(saveTextPost(textPost, data.token), {
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
