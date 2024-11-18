"use client";

import { useAccountPost } from "@/components/context/User/AccountProvider/AccountPostProvider";
import { ToolModalProp } from "@/components/context/User/PostTools/PostToolsInitialState";

import { Button } from "@/components/ui/Shared/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/Shared/dialog";
import { DeletePost } from "@/controllers/PostController";
import { postTypeMap } from "@/lib/interfaces/postTypes";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "sonner";

const DeletePostModal = (props: ToolModalProp) => {
  const { modalCloseCallback, parentOptionalCallback, post, userToken } = props;
  const { userPosts, setUserPosts } = useAccountPost();
  const { id, postType } = post;

  const onDelete = async () => {
    if (!userPosts || !id || !userToken) return;

    toast.promise(DeletePost(id, postType, userToken), {
      loading: "Deleting post...",
      success: () => {
        setUserPosts({
          ...userPosts,
          [postTypeMap[postType]]: userPosts[postTypeMap[postType]].filter(
            (post) => post.id !== id
          ),
        });

        parentOptionalCallback?.();
        modalCloseCallback();
        return "Post Deleted successfully!";
      },
      error: () => {
        modalCloseCallback();
        return "Failed to delete post";
      },
    });
  };

  return (
    <DialogPortal>
      <DialogOverlay className="bg-black/30" />
      <DialogContent>
        <DialogHeader>Delete This Post?</DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant={"outline"} onClick={modalCloseCallback}>
            Cancel
          </Button>
          <Button variant={"destructive"} onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  );
};

export default DeletePostModal;
