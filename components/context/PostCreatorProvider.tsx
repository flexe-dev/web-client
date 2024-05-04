"use client";

import { ChildNodeProps, PostContentBlock } from "@/lib/interface";
import React, { createContext, useState } from "react";
import ImageContent from "../creator/content/ImageContent";
import TextContent from "../creator/content/TextContent";
import TitleContent from "../creator/content/TitleContent";

interface PostCreatorProviderState {
  previewMode: boolean;
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  document: PostContentBlock[];
  setDocument: React.Dispatch<React.SetStateAction<PostContentBlock[]>>;
  onDelete: (id: string) => void;
  //todo: set up more creator tools here
}

const initialState: PostCreatorProviderState = {
  document: [],
  setDocument: () => {},
  previewMode: false,
  setPreviewMode: () => {},
  onDelete: () => {},
};

export const PostCreatorContext =
  createContext<PostCreatorProviderState>(initialState);

export const PostCreatorProvider = ({ children }: ChildNodeProps) => {
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const onDelete = (id: string) => {
    setDocument((prev) => prev.filter((block) => block.id !== id));
  };
  const [document, setDocument] = useState<PostContentBlock[]>([
    {
      id: "draggable-content-1",
      content: <TitleContent id="draggable-content-1" onDelete={onDelete} />,
    },
    {
      id: "draggable-content-2",
      content: <TextContent id="draggable-content-2" onDelete={onDelete} />,
    },
    {
      id: "draggable-content-3",
      content: <ImageContent id="draggable-content-3" onDelete={onDelete} />,
    },
  ]);
  return (
    <PostCreatorContext.Provider
      value={{
        document,
        setDocument,
        previewMode,
        setPreviewMode,
        onDelete
      }}
    >
      {children}
    </PostCreatorContext.Provider>
  );
};

export const usePostCreator = () => {
  const context = React.useContext(PostCreatorContext);
  if (context === undefined) {
    throw new Error("usePostCreator must be used within a PostCreatorProvider");
  }
  return context;
};
