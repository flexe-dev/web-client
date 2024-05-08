"use client";

import { ChildNodeProps, PostContentBlock } from "@/lib/interface";
import React, { createContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { TitleContent } from "../creator/content/TitleContent";

interface PostCreatorProviderState {
  previewMode: boolean;
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  document: PostContentBlock[];
  setDocument: React.Dispatch<React.SetStateAction<PostContentBlock[]>>;
  onDelete: (id: string) => void;
  onValueChange: (id: string, value: string) => void;
  onStyleChange: (id: string, style: Record<string, string>) => void;
  showDeletionConfirmation: boolean;
  setShowDeletionConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  //todo: set up more creator tools here
}

const initialState: PostCreatorProviderState = {
  document: [],
  setDocument: () => {},
  previewMode: false,
  setPreviewMode: () => {},
  onDelete: () => {},
  onValueChange: () => {},
  onStyleChange: () => {},
  showDeletionConfirmation: true,
  setShowDeletionConfirmation: () => {},
  sidebarOpen: true,
  setSidebarOpen: () => {},
};

export const PostCreatorContext =
  createContext<PostCreatorProviderState>(initialState);

export const PostCreatorProvider = ({ children }: ChildNodeProps) => {
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [showDeletionConfirmation, setShowDeletionConfirmation] =
    useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [document, setDocument] = useState<PostContentBlock[]>([
    {
      id: `draggable-content-title-${nanoid()}`,
      value: "Title",
      content: TitleContent,
    },
  ]);

  const onDelete = (id: string) => {
    setDocument((prev) => prev.filter((block) => block.id !== id));
  };

  const onValueChange = (id: string, value: string) => {
    setDocument((prev) =>
      prev.map((block) => {
        if (block.id === id) {
          return { ...block, value };
        }
        return block;
      })
    );
  };

  const onStyleChange = (id: string, style: Record<string, string>) => {
    setDocument((prev) =>
      prev.map((block) => {
        if (block.id === id) {
          return { ...block, style };
        }
        return block;
      })
    );
  };

  return (
    <PostCreatorContext.Provider
      value={{
        document,
        setDocument,
        previewMode,
        setPreviewMode,
        onDelete,
        onValueChange,
        showDeletionConfirmation,
        setShowDeletionConfirmation,
        sidebarOpen,
        setSidebarOpen,
        onStyleChange,
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
