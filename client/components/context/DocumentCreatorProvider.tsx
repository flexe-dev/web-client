"use client";

import {
  ChildNodeProps,
  ContentStyling,
  ContentValue,
  Document,
  OptionKeyValues,
  OptionKeys,
  PostUserMedia,
} from "@/lib/interface";
import { nanoid } from "nanoid";
import React, { CSSProperties, createContext, useState } from "react";
import { DefaultTitle } from "../creator/content/DefaultStyling";

interface DocumentCreatorProviderState {
  //Context States
  document: Document;
  content: PostUserMedia[];
  previewMode: boolean;
  showDeletionConfirmation: boolean;
  sidebarOpen: boolean;
  activeStylingTool: ContentStyling | null;
  //Context Callbacks
  onStyleChange: (id: string, style: CSSProperties) => void;
  onValueChange: (id: string, value: ContentValue) => void;
  onOptionsChange: (
    id: string,
    option: OptionKeys,
    value: OptionKeyValues
  ) => void;
  onDelete: (id: string) => void;
  //Context State Dispatches
  setPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  setDocument: React.Dispatch<React.SetStateAction<Document>>;
  setShowDeletionConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveStylingTool: React.Dispatch<
    React.SetStateAction<ContentStyling | null>
  >;
  setContent: React.Dispatch<React.SetStateAction<PostUserMedia[]>>;
}

const defaultDocumentState: Document = [
  {
    id: `draggable-content-title-${nanoid()}`,
    value: { contentValue: "Title" },
    style: DefaultTitle,
    type: "TEXT",
  },
];

const initialState: DocumentCreatorProviderState = {
  document: [],
  content: [],
  previewMode: false,
  showDeletionConfirmation: true,
  sidebarOpen: true,
  activeStylingTool: null,

  onDelete: () => {},
  onValueChange: () => {},
  onStyleChange: () => {},
  onOptionsChange: () => {},

  setDocument: () => {},
  setPreviewMode: () => {},
  setShowDeletionConfirmation: () => {},
  setSidebarOpen: () => {},
  setActiveStylingTool: () => {},
  setContent: () => {},
};

export const DocumentCreatorContext =
  createContext<DocumentCreatorProviderState>(initialState);

interface Props extends ChildNodeProps {
  content: PostUserMedia[];
  document?: Document;
}

export const DocumentCreatorProvider = ({
  children,
  content: propsContent,
  document: postDocument,
}: Props) => {
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [showDeletionConfirmation, setShowDeletionConfirmation] =
    useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [document, setDocument] = useState<Document>(
    postDocument ?? defaultDocumentState
  );

  const [activeStylingTool, setActiveStylingTool] =
    useState<ContentStyling | null>(null);
  const [content, setContent] = useState<PostUserMedia[]>(propsContent);
  const onDelete = (id: string) => {
    setDocument((prev) => prev.filter((block) => block.id !== id));
  };

  const onValueChange = (id: string, value: ContentValue) => {
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

  const onOptionsChange = (
    id: string,
    option: OptionKeys,
    value: OptionKeyValues
  ) => {
    setDocument((prev) =>
      prev.map((block) => {
        if (block.id === id) {
          return { ...block, options: { ...block.options, [option]: value } };
        }
        return block;
      })
    );
  };

  return (
    <DocumentCreatorContext.Provider
      value={{
        document,
        content,
        setContent,
        setDocument,
        previewMode,
        setPreviewMode,
        onDelete,
        onValueChange,
        onOptionsChange,
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
    </DocumentCreatorContext.Provider>
  );
};

export const useDocumentCreator = () => {
  const context = React.useContext(DocumentCreatorContext);
  if (context === undefined) {
    throw new Error(
      "useDocumentCreator must be used within a DocumentCreatorProvider"
    );
  }
  return context;
};
