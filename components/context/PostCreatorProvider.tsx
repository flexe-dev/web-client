"use client";

import {
  ChildNodeProps,
  ContentStyling,
  PostContentBlock,
  PostUserMedia,
} from "@/lib/interface";
import React, { createContext, useState } from "react";
import { nanoid } from "nanoid";
import { TitleContent } from "../creator/content/TitleContent";

interface PostCreatorProviderState {
  //Context States
  document: PostContentBlock[];
  content: PostUserMedia[];
  previewMode: boolean;
  showDeletionConfirmation: boolean;
  sidebarOpen: boolean;
  activeStylingTool: ContentStyling | null;
  //Context Callbacks
  onStyleChange: (id: string, style: Record<string, string>) => void;
  onValueChange: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  //Context State Dispatches
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  setDocument: React.Dispatch<React.SetStateAction<PostContentBlock[]>>;
  setShowDeletionConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveStylingTool: React.Dispatch<
    React.SetStateAction<ContentStyling | null>
  >;
  setContent: React.Dispatch<React.SetStateAction<PostUserMedia[]>>;
}

const initialState: PostCreatorProviderState = {
  document: [],
  content: [],
  previewMode: false,
  showDeletionConfirmation: true,
  sidebarOpen: true,
  activeStylingTool: null,

  onDelete: () => {},
  onValueChange: () => {},
  onStyleChange: () => {},

  setDocument: () => {},
  setPreviewMode: () => {},
  setShowDeletionConfirmation: () => {},
  setSidebarOpen: () => {},
  setActiveStylingTool: () => {},
  setContent: () => {},
};

export const PostCreatorContext =
  createContext<PostCreatorProviderState>(initialState);

interface Props extends ChildNodeProps {
  content: PostUserMedia[];
}

export const PostCreatorProvider = ({
  children,
  content: propsContent,
}: Props) => {
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
  const [activeStylingTool, setActiveStylingTool] =
    useState<ContentStyling | null>(null);
  const [content, setContent] = useState<PostUserMedia[]>(propsContent);

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

  console.log(document);

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
        content,
        setContent,
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
        activeStylingTool,
        setActiveStylingTool,
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
