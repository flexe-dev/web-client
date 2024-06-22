import { DocumentIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { SetStateAction } from "react";
import { useAccount } from "../context/AccountProvider";
import { GetNameInitials } from "../ui/User/UserAvatar";
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
  const { user } = useAccount();
  if (!user) return null;
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
                alt={user.name ?? ""}
              />
              <AvatarFallback>
                {GetNameInitials(user.name ?? "")}
              </AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              className="text-base h-12 max-h-[10rem] w-[30rem]"
            />
          </div>
          <div className="w-full flex justify-end">
            <Button size={"sm"} variant={"outline"} className="mr-1 mt-2">
              Post
            </Button>
          </div>
          <div className="flex w-full items-center mt-2">
            <div className="h-[1px] ml-1 bg-primary w-full" />
            <span className="text-lg w-full mx-2 text-center">
              Or Create With
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

            <Link href={"/new/text"}>
              <Button
                variant={"outline"}
                className="flex space-x-2"
                onClick={() => dispatch(false)}
              >
                <DocumentIcon className="w-6 h-6" />
                <span>Text Editor</span>
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  );
};

export default PostCreateDialog;
