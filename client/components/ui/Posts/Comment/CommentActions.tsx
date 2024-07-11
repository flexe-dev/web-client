import { useAccount } from "@/components/context/AccountProvider";
import { usePostComments } from "@/components/context/PostCommentContext";
import { CommentNode, IconType } from "@/lib/interface";
import {
  EllipsisHorizontalIcon,
  FlagIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Button } from "../../button";
import { Dialog } from "../../dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { CommentActionConfirmModal } from "./CommentActionConfirmModal";

type CommentActionAccess = "viewer" | "creator" | "poster";

interface CommentPostAction {
  name?: string;
  icon: IconType;
  access: CommentActionAccess[];
  action?: () => void;
  component?: React.ReactNode;
}

interface Props {
  node: CommentNode;
  root: CommentNode;
}

export type CommentAction = "delete" | "report" | "pin";

export const CommentActions = (props: Props) => {
  const { account } = useAccount();
  const { deleteComment, reportComment } = usePostComments();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [action, setAction] = useState<CommentAction | undefined>();

  useEffect(() => {
    if (!action) return;
    setModalOpen(true);
  }, [action]);

  if (!account) return null;

  const { node, root } = props;
  const { user, textPosts, mediaPosts } = account;

  const actionOptions: CommentPostAction[] = [
    {
      name: "Edit",
      icon: PencilIcon,
      access: ["creator"],
      action: () => console.log("Edit Comment"),
    },
    {
      name: "Delete",
      icon: TrashIcon,
      access: ["creator", "poster"],
      action: () => deleteComment(node, root),
    },
    {
      name: "Report",
      icon: FlagIcon,
      access: ["viewer", "poster"],
      action: () => reportComment(node),
    },
    {
      name: "Pin",
      icon: MapPinIcon,
      access: ["poster"],
      action: () => console.log("Pin Comment"),
    },
  ];

  const generateCommentActionPermission = (): CommentActionAccess => {
    if (user.id === node.comment.userId) return "creator";
    if (
      mediaPosts
        .map((post) => post.id)
        .concat(textPosts.map((post) => post.id))
        .includes(node.comment.postId)
    )
      return "poster";

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
      <CommentActionConfirmModal callback={handleModalClose} type={action}/>
    </Dialog>
  );
};
