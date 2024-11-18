import { DefaultTitle } from "@/components/creator/content/DefaultStyling";
import {
  ContentStyling,
  ContentValue,
  Document,
  OptionKeys,
  OptionKeyValues,
  PostUserMedia,
} from "@/lib/interfaces/documentTypes";
import { nanoid } from "nanoid";
import { CSSProperties } from "react";

export interface DocumentCreatorProviderState {
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

export const defaultDocumentState: Document = [
  {
    id: `draggable-content-title-${nanoid()}`,
    value: { contentValue: "Title" },
    style: DefaultTitle,
    type: "TEXT",
  },
];

export const documentCreatorInitialState: DocumentCreatorProviderState = {
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
