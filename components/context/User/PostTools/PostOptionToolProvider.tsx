"use client";

import { PostTools } from "@/components/ui/Posts/Shared/PostTools";
import { Dialog } from "@/components/ui/Shared/dialog";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  PostOptionToolState,
  PostToolContextProps,
  postToolInitialState,
  PostToolModal,
  PostToolOptionsType,
} from "./PostToolsInitialState";

export const PostOptionToolContext =
  createContext<PostOptionToolState>(postToolInitialState);

export const PostToolsProvider = ({
  post,
  callbacks,
  children,
}: PostToolContextProps) => {
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
          PostToolModal[tool]({
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
