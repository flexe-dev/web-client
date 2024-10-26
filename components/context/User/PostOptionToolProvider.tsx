"use client";

import ArchivePostModal from "@/components/ui/Posts/Shared/Modals/ArchivePostModal";
import BoostPostModal from "@/components/ui/Posts/Shared/Modals/BoostPostModal";
import DeletePostModal from "@/components/ui/Posts/Shared/Modals/DeletePostModal";
import PinPostModal from "@/components/ui/Posts/Shared/Modals/PinPostModal";
import ReportPostModal from "@/components/ui/Posts/Shared/Modals/ReportPostModal";
import SharePostModal from "@/components/ui/Posts/Shared/Modals/SharePostModal";
import { PostTools } from "@/components/ui/Posts/Shared/PostTools";
import { Dialog } from "@/components/ui/Shared/dialog";
import { ChildNodeProps, Post, PostType } from "@/lib/interface";
import { useSession } from "next-auth/react";
import React, {
  JSX,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PostToolOptions = [
  "delete",
  "archive",
  "report",
  "share",
  "boost",
  "pin",
] as const;

// Optional Callback Functions passed for each action
export type ModalToolCallback = {
  [tool in PostToolOptionsType]?: () => void;
};

interface Props extends ChildNodeProps {
  post: Post;
  callbacks?: ModalToolCallback;
}

export interface ToolModalProp {
  post: Post;
  userToken?: string;
  open: boolean;
  modalCloseCallback: () => void;
  parentOptionalCallback?: () => void;
}

type PostToolOptionsType = (typeof PostToolOptions)[number];

const renderedDialog: Record<
  PostToolOptionsType,
  (props: ToolModalProp) => JSX.Element
> = {
  delete: DeletePostModal,
  archive: ArchivePostModal,
  report: ReportPostModal,
  share: SharePostModal,
  boost: BoostPostModal,
  pin: PinPostModal,
};

interface PostOptionToolState {
  tool: PostToolOptionsType | undefined;
  setTool: React.Dispatch<
    React.SetStateAction<PostToolOptionsType | undefined>
  >;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: PostType | undefined;
}

const initialState: PostOptionToolState = {
  tool: undefined,
  setTool: () => {},
  dialogOpen: false,
  setDialogOpen: () => {},
  type: undefined,
};

export const PostOptionToolContext =
  createContext<PostOptionToolState>(initialState);

export const PostToolsProvider = ({ post, callbacks, children }: Props) => {
  const [tool, setTool] = useState<PostToolOptionsType | undefined>(undefined);
  const { data } = useSession();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setDialogOpen(false);
    setTool(undefined);
  };

  useEffect(() => {
    if (!tool) return;
    setDialogOpen(true);
  }, [tool]);

  return (
    <PostOptionToolContext.Provider
      value={{
        type: post.postType,
        tool,
        setTool,
        dialogOpen,
        setDialogOpen,
      }}
    >
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <PostTools post={post}>{children}</PostTools>
        {tool ? (
          renderedDialog[tool]({
            post,
            open: dialogOpen,
            userToken: data?.token,
            modalCloseCallback: handleModalClose,
            parentOptionalCallback: callbacks ? callbacks[tool] : undefined,
          })
        ) : (
          <></>
        )}
      </Dialog>
    </PostOptionToolContext.Provider>
  );
};

export const usePostTools = () => {
  const context = useContext(PostOptionToolContext);
  if (context === undefined) {
    throw new Error(
      "usePostTools must be used within a PostOptionToolProvider"
    );
  }
  return context;
};
