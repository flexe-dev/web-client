"use client";

import ArchivePostModal from "@/components/ui/Posts/Modals/ArchivePostModal";
import BoostPostModal from "@/components/ui/Posts/Modals/BoostPostModal";
import DeletePostModal from "@/components/ui/Posts/Modals/DeletePostModal";
import PinPostModal from "@/components/ui/Posts/Modals/PinPostModal";
import ReportPostModal from "@/components/ui/Posts/Modals/ReportPostModal";
import SharePostModal from "@/components/ui/Posts/Modals/SharePostModal";
import { MediaPostTools } from "@/components/ui/Posts/media/MediaPostTools";
import { TextPostTools } from "@/components/ui/Posts/text/TextPostTools";
import { Dialog } from "@/components/ui/dialog";
import { ChildNodeProps, PostType } from "@/lib/interface";
import { useSession } from "next-auth/react";
import React, {
  JSX,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props extends ChildNodeProps {
  postId: string;
  postType: PostType;
}

export interface ToolModalProp {
  postId: string;
  postType: PostType;
  userToken?: string;
  open: boolean;
  callback: () => void;
}

const PostToolOptions = [
  "delete",
  "archive",
  "report",
  "share",
  "boost",
  "pin",
] as const;

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

const renderedToolSet: Record<
  PostType,
  (props: Omit<Props, "postType">) => JSX.Element
> = {
  MEDIA: MediaPostTools,
  TEXT: TextPostTools,
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

export const PostToolsProvider = ({ postId, postType, children }: Props) => {
  const [tool, setTool] = useState<PostToolOptionsType | undefined>(undefined);
  const { data } = useSession();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const Toolset = renderedToolSet[postType];

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
        tool,
        setTool,
        dialogOpen,
        setDialogOpen,
        type: postType,
      }}
    >
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Toolset postId={postId}>{children}</Toolset>
        {tool ? (
          renderedDialog[tool]({
            postId,
            postType,
            open: dialogOpen,
            userToken: data?.token,
            callback: handleModalClose,
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
