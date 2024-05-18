"use client";

import React, { createContext, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { usePostCreator } from "./PostCreatorProvider";
import BlockPreview from "../creator/blocks/BlockPreview";
import { BlockID } from "../creator/blocks/Blocks";
import { nanoid } from "nanoid";
import { PostContentBlock } from "@/lib/interface";
import { TextContent } from "../creator/content/TextContent";
import { ImageContent } from "../creator/content/ImageContent";
import { useMediaQuery } from "react-responsive";
import VideoContent from "../creator/content/VideoContent";
import {
  DefaultSubtitle,
  DefaultText,
  DefaultTitle,
} from "../creator/content/DefaultStyling";

interface PostDragProviderState {
  activeDragID: UniqueIdentifier | null;
  setActiveDragID: React.Dispatch<
    React.SetStateAction<UniqueIdentifier | null>
  >;
}

const initialState: PostDragProviderState = {
  activeDragID: null,
  setActiveDragID: () => {},
};

export const PostDragContext =
  createContext<PostDragProviderState>(initialState);

export const PostDragProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeDragID, setActiveDragID] = useState<UniqueIdentifier | null>(
    null
  );
  const fixedSidebar = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setSidebarOpen } = usePostCreator();
  const { document, setDocument, content: uploadedContent } = usePostCreator();
  const [originalDocumentState, setOriginalDocumentState] = useState<
    PostContentBlock[] | undefined
  >();
  const handleDragStart = (e: DragStartEvent) => {
    setActiveDragID(e.active.id);
    setOriginalDocumentState(document);
    fixedSidebar && setSidebarOpen(false);
  };

  const RenderNewItem: Record<BlockID, PostContentBlock> = {
    "draggable-block-title": {
      id: `draggable-content-text-${nanoid()}`,
      value: "Title",
      content: TextContent,
      style: DefaultTitle,
    },
    "draggable-block-subtitle": {
      id: `draggable-content-text-${nanoid()}`,
      value: "Sub-Title",
      content: TextContent,
      style: DefaultSubtitle,
    },
    "draggable-block-text": {
      id: `draggable-content-text-${nanoid()}`,
      value: "Text",
      content: TextContent,
      style: DefaultText,
    },
    "draggable-block-image": {
      id: `draggable-content-image-${nanoid()}`,
      content: ImageContent,
    },
    "draggable-block-video": {
      id: `draggable-content-video-${nanoid()}`,
      content: ImageContent,
    },
  };

  const handleInsertUploadedMedia = (blockID: string): PostContentBlock => {
    //format: draggable-block-user-image-<id>
    const mediaTypes = ["image", "video", "gif"];
    const [_, type, id] = blockID.split("||");
    const content = uploadedContent.find((media) => media.content.id === id);

    if (!mediaTypes.includes(type) || !content) {
      return RenderNewItem["draggable-block-image"];
    }

    return {
      id: `draggable-content-${type}-${nanoid()}`,
      value: content,
      content: type === "video" ? VideoContent : ImageContent,
    };
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if ((active.id as string).includes("draggable-block")) {
      fixedSidebar && setSidebarOpen(true);
    }

    if (!over || active.id === over.id) {
      setActiveDragID(null);
      setDocument(originalDocumentState!);
      return;
    }
    // Handle In Container Manipulation
    if (
      (active.id as string).includes("draggable-content") &&
      (over.id as string).includes("draggable-content")
    ) {
      const activeIndex = document.findIndex((doc) => doc.id === active.id);
      const overIndex = document.findIndex((doc) => doc.id === over.id);
      if (activeIndex === -1 || overIndex === -1) return;
      setDocument((prev) => arrayMove(prev, activeIndex, overIndex));
      return;
    }

    if (
      (active.id as string).includes("draggable-block") &&
      (over.id as string).includes("draggable-content")
    ) {
      const newBlock = document.findIndex(
        (doc) => doc.id === "draggable-content-new-block"
      );
      if (newBlock === -1) return;
      //Insert new content block based on insertion

      setDocument((prev) => [
        ...prev.slice(0, newBlock),
        !(active.id as string).includes("user")
          ? RenderNewItem[active.id as BlockID]
          : handleInsertUploadedMedia(active.id as string),
        ...prev.slice(newBlock + 1, prev.length),
      ]);
    }
    setActiveDragID(null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) {
      if (document.find((doc) => doc.id === "draggable-content-new-block")) {
        setDocument((prev) => {
          return prev.filter((doc) => doc.id !== "draggable-content-new-block");
        });
      }
      return;
    }

    if (active.id === over.id || over.id == "draggable-content-new-block")
      return;
    //Handle In Container Manipulation
    if (
      (active.id as string).includes("draggable-block") &&
      (over.id as string).includes("draggable-content")
    ) {
      const newContentBlock: PostContentBlock = {
        id: "draggable-content-new-block",
        value: "",
        content: BlockPreview,
      };
      setDocument((items) => {
        const overIndex = items.findIndex((doc) => doc.id === over.id);
        let newIndex: number;
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top +
            active.rect.current.translated.height / 2 >
            over.rect.top + over.rect.height / 2;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : items.length + 1;
        return [
          ...items
            .slice(0, newIndex)
            .filter((item) => item.id !== "draggable-content-new-block"),
          newContentBlock,
          ...items
            .slice(newIndex, items.length)
            .filter((item) => item.id !== "draggable-content-new-block"),
        ];
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <PostDragContext.Provider
      value={{
        activeDragID,
        setActiveDragID,
      }}
    >
      <DndContext
        sensors={sensors}
        id="Document-Creator-Drag-Context"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={
          activeDragID && (activeDragID as string).includes("draggable-content")
            ? closestCenter
            : undefined
        }
      >
        {children}
      </DndContext>
    </PostDragContext.Provider>
  );
};

export const useBlockDrag = () => {
  const context = React.useContext(PostDragContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
