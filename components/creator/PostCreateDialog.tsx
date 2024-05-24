import React, { SetStateAction } from "react";
import {
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { useAccount } from "../context/AccountProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GetNameInitials } from "../ui/User/UserAvatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { DocumentIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface DialogProps {
  dispatch: React.Dispatch<SetStateAction<boolean>>;
}

const PostCreateDialog = ({ dispatch }: DialogProps) => {
  const { user } = useAccount();
  return (
    <DialogPortal>
<<<<<<< HEAD
      <DialogOverlay className="bg-black/30" />
=======
      <DialogOverlay />
>>>>>>> d92e31248ae4f10c2e31a25f558d85b160c2e17c
      <DialogContent className="w-full min-w-[37rem]">
        <DialogHeader className="mb-4 text-2xl font-bold">
          Create a new post
        </DialogHeader>
        <DialogDescription className="flex flex-col space-y-2">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={user?.image ?? process.env.NEXT_PUBLIC_DEFAULT_PHOTO}
                alt={user?.name}
              />
              <AvatarFallback>{GetNameInitials(user?.name)}</AvatarFallback>
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
<<<<<<< HEAD
          <div className="mt-2 w-full flex justify-center space-x-4">
=======
          <div className="w-full flex justify-center space-x-4">
>>>>>>> d92e31248ae4f10c2e31a25f558d85b160c2e17c
            <Link href={"/new/media"}>
              <Button
                className="flex space-x-2"
                onClick={() => dispatch(false)}
<<<<<<< HEAD
                variant={"outline"}
=======
>>>>>>> d92e31248ae4f10c2e31a25f558d85b160c2e17c
              >
                <PhotoIcon className="w-6 h-6" />
                <span>Media Editor</span>
              </Button>
            </Link>

            <Link href={"/new/text"}>
              <Button
<<<<<<< HEAD
                variant={"outline"}
=======
>>>>>>> d92e31248ae4f10c2e31a25f558d85b160c2e17c
                className="flex space-x-2"
                onClick={() => dispatch(false)}
              >
                <DocumentIcon className="w-6 h-6" />
                <span>Text Editor</span>
              </Button>
            </Link>
          </div>
        </DialogDescription>
      </DialogContent>
    </DialogPortal>
  );
};

export default PostCreateDialog;
