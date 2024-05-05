"use client";

import { ChildNodeProps } from "@/lib/interface";
import React, { createContext, useEffect, useState } from "react";
import { images } from "@/lib/placeholder";
import {
  Content,
  ImageBlockContent,
  TextBlockContent,
  TitleBlockContent,
} from "@/lib/models/Content";

interface PostCreatorProviderState {
  previewMode: boolean;
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  document: Content[];
  setDocument: React.Dispatch<React.SetStateAction<Content[]>>;
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
    setDocument((prev) => prev.filter((block) => block.id));
  };
  const [document, setDocument] = useState<Content[]>([
    new TitleBlockContent("draggable-content-1", onDelete),
    new TextBlockContent("draggable-content-2", onDelete),
    new ImageBlockContent(
      "draggable-content-3",
      images[0].src as string,
      onDelete
    ),
  ]);

  useEffect(() => {
    console.log(document);
  }, [document]);

  return (
    <PostCreatorContext.Provider
      value={{
        document,
        setDocument,
        previewMode,
        setPreviewMode,
        onDelete,
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
