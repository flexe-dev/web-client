import { useAccountPost } from "@/components/context/User/AccountProvider/AccountPostProvider";
import { useAccountUser } from "@/components/context/User/AccountProvider/AccountUserProvider";
import { usePostComments } from "@/components/context/User/PostComments/PostCommentContext";
import { Button } from "@/components/ui/Shared/button";
import { Dialog } from "@/components/ui/Shared/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Shared/dropdown-menu";
import { IconType } from "@/lib/interfaces/componentTypes";
import {
  EllipsisHorizontalIcon,
  FlagIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { EyeOffIcon } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { LinkedCommentProps } from "../Comment";
import { CommentActionConfirmModal } from "./CommentActionConfirmModal";

type CommentActionAccess = "viewer" | "creator" | "poster";

interface CommentPostAction {
  name?: string;
  icon: IconType;
  access: CommentActionAccess[];
  action?: () => void;
  component?: React.ReactNode;
}

export type CommentAction = "delete" | "report" | "pin";

export const CommentActions: FC<LinkedCommentProps> = ({ comment }) => {
  const { account } = useAccountUser();
  const { userPosts } = useAccountPost();
  const { setEditTarget, post } = usePostComments();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [action, setAction] = useState<CommentAction | undefined>();

  useEffect(() => {
    if (!action) return;
    setModalOpen(true);
  }, [action]);

  if (!account || !userPosts) return null;

  const { user } = account;

  const actionOptions: CommentPostAction[] = [
    {
      name: "Edit",
      icon: PencilIcon,
      access: ["creator"],
      action: () => setEditTarget(comment),
    },
    {
      name: "Delete",
      icon: TrashIcon,
      access: ["creator", "poster"],
      action: () => setAction("delete"),
    },
    {
      name: "Hide",
      icon: EyeOffIcon,
      access: ["creator"],
      action: () => console.log("yuh"),
    },
    {
      name: "Report",
      icon: FlagIcon,
      access: ["viewer", "poster"],
      action: () => setAction("report"),
    },
    {
      name: "Pin",
      icon: MapPinIcon,
      access: ["poster"],
      action: () => setAction("pin"),
    },
  ];

  const generateCommentActionPermission = (): CommentActionAccess => {
    // If the user is the creator of the comment

    if (user.id === comment.root.userId) return "creator";
    // If the user is the poster of the post
    if (user.id === post.auxData.userID) return "poster";

    return "viewer";
  };

  const userPermission: CommentActionAccess = generateCommentActionPermission();

  const handleModalClose = () => {
    setModalOpen(false);
    setAction(undefined);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="absolute right-2 w-8 h-8"
          >
            <EllipsisHorizontalIcon className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {actionOptions.map(
            (option, index) =>
              option.access.includes(userPermission) && (
                <DropdownMenuItem
                  key={index}
                  onClick={option.action}
                  className="flex items-center space-x-2"
                >
                  <option.icon className="w-5 h-5" />
                  <span>{option.name}</span>
                </DropdownMenuItem>
              )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <CommentActionConfirmModal
        comment={comment}
        callback={handleModalClose}
        type={action}
      />
    </Dialog>
  );
};
