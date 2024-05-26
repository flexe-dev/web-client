"use client";

import {
  ChildNodeProps,
  ContentStyling,
  PostContentBlock,
  PostUserMedia,
} from "@/lib/interface";
import React, { CSSProperties, createContext, useState } from "react";
import { nanoid } from "nanoid";
import { TextContent } from "../creator/content/TextContent";
import { DefaultTitle } from "../creator/content/DefaultStyling";

interface PostCreatorProviderState {
  //Context States
  document: PostContentBlock[];
  content: PostUserMedia[];
  previewMode: boolean;
  showDeletionConfirmation: boolean;
  sidebarOpen: boolean;
  activeStylingTool: ContentStyling | null;
  //Context Callbacks
  onStyleChange: (id: string, style: CSSProperties) => void;
  onValueChange: (id: string, value: string) => void;
  onVideoHoverChange: (id: string, playOnHover: boolean) => void;
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
  onVideoHoverChange: () => {},

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
      content: TextContent,
      style: DefaultTitle,
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

  const onStyleChange = (id: string, style: CSSProperties) => {
    setDocument((prev) =>
      prev.map((block) => {
        if (block.id === id) {
          return { ...block, style };
        }
        return block;
      })
    );
  };

  const onVideoHoverChange = (id: string, playOnHover: boolean) => {
    setDocument((prev) =>
      prev.map((block) => {
        if (block.id === id) {
          return { ...block, playOnHover };
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
        onVideoHoverChange,
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
