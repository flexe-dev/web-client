"use client";

import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import {
  ContentStyling,
  ContentValue,
  Document,
  OptionKeys,
  OptionKeyValues,
  PostUserMedia,
} from "@/lib/interfaces/documentTypes";
import React, { createContext, CSSProperties, useState } from "react";
import {
  defaultDocumentState,
  documentCreatorInitialState,
  DocumentCreatorProviderState,
} from "./DocumentCreatorState";

export const DocumentCreatorContext =
  createContext<DocumentCreatorProviderState>(documentCreatorInitialState);

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
