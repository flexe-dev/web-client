"use client";

import { ContentBlockProp, Document, PostUserMedia } from "@/lib/interface";
import {
  Active,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  Over,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { nanoid } from "nanoid";
import React, { createContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BlockID } from "../creator/blocks/Blocks";
import {
  DefaultMedia,
  DefaultSubtitle,
  DefaultText,
  DefaultTitle,
} from "../creator/content/DefaultStyling";
import { useDocumentCreator } from "./DocumentCreatorProvider";

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

export const carouselRelatedValues = ["image", "carousel"];

export const PostDragContext =
  createContext<PostDragProviderState>(initialState);

export const checkContentThreshold = (active: Active, over: Over): boolean => {
  if (!over || !active.rect.current.translated) return false;
  return (
    active.rect?.current?.translated?.bottom - over.rect.top >= 20 &&
    over.rect.bottom - active.rect?.current?.translated?.bottom >= 20
  );
};

export const checkImageCarouselHandling = (
  active: Active,
  over: Over
): boolean => {
  const activeValid = carouselRelatedValues.some((value) =>
    (active.id as string).includes(value)
  );
  const overValid = carouselRelatedValues.some((value) =>
    (over.id as string).includes(value)
  );
  return activeValid && overValid;
};

export const PostDragProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeDragID, setActiveDragID] = useState<UniqueIdentifier | null>(
    null
  );
  const fixedSidebar = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setSidebarOpen } = useDocumentCreator();
  const {
    document,
    setDocument,
    content: uploadedContent,
  } = useDocumentCreator();
  const [originalDocumentState, setOriginalDocumentState] = useState<
    Document | undefined
  >();
  const handleDragStart = (e: DragStartEvent) => {
    setActiveDragID(e.active.id);
    setOriginalDocumentState(document);
    fixedSidebar && setSidebarOpen(false);
  };

  const RenderNewItem: Record<BlockID, ContentBlockProp> = {
    "draggable-block-title": {
      id: `draggable-content-text-${nanoid()}`,
      value: {
        contentValue: "Sub-Title",
      },
      style: DefaultTitle,
      type: "TEXT",
    },
    "draggable-block-subtitle": {
      id: `draggable-content-text-${nanoid()}`,
      value: {
        contentValue: "Sub-Title",
      },
      style: DefaultSubtitle,
      type: "TEXT",
    },
    "draggable-block-text": {
      id: `draggable-content-text-${nanoid()}`,
      value: {
        contentValue: "Text",
      },
      style: DefaultText,
      type: "TEXT",
    },
    "draggable-block-image": {
      id: `draggable-content-image-${nanoid()}`,
      style: DefaultMedia,
      type: "IMAGE",
    },
    "draggable-block-video": {
      id: `draggable-content-video-${nanoid()}`,
      options: {
        playOnHover: false,
      },
      style: DefaultMedia,
      type: "VIDEO",
    },
  };

  const findMediaInUploaded = (id: string): PostUserMedia | undefined => {
    return uploadedContent.find((media) => media.content.id === id);
  };

  const handleInsertUploadedMedia = (blockID: string): ContentBlockProp => {
    //format: draggable-block-user-image-<id>
    const mediaTypes = ["image", "video", "gif"];
    const [_, type, id] = blockID.split("||");
    const content = findMediaInUploaded(id);

    if (!mediaTypes.includes(type) || !content) {
      return RenderNewItem["draggable-block-image"];
    }

    return {
      id: `draggable-content-${type}-${nanoid()}`,
      value: {
        contentValue: content,
      },
      type: type.toUpperCase() as "IMAGE" | "VIDEO",
      style: DefaultMedia,
      options: {
        playOnHover: type === "video" ? false : undefined,
      },
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
      if (checkImageCarouselHandling(active, over)) {
        //Special Case for Image Carousel
        if (checkContentThreshold(active, over)) {
          //Need to Generate a New Carousel Object
          if (over.id.toString().includes("image")) {
            const originalImageContent = document.find(
              (doc) => doc.id === over.id
            );
            const [_, type, id] = (active.id as string).split("||");
            const content = findMediaInUploaded(id);
            if (!content || !originalImageContent?.value) return;
            const newCarouselBlock: ContentBlockProp = {
              id: `draggable-content-carousel-${nanoid()}}`,
              value: {
                contentValue: [
                  originalImageContent?.value.contentValue as PostUserMedia,
                  content,
                ],
              },
              type: "CAROUSEL",
              options: {
                carouselAutoplay: false,
                carouselLoop: true,
                carouselDuration: 5000,
                carouselStopOnMouseEnter: true,
                activeIndex: 0,
              },
              style: originalImageContent.style,
            };
            setDocument((items) => {
              const overIndex = items.findIndex((doc) => doc.id === over.id);
              return [
                ...items.slice(0, overIndex),
                newCarouselBlock,
                ...items.slice(overIndex + 1, items.length),
              ];
            });
          }
          //Need to Append Image Data to End of Carousel
          else {
            const imageCarousel = document.find((doc) => doc.id === over.id);
            const [_, type, id] = (active.id as string).split("||");
            const content = findMediaInUploaded(id);
            if (!content || !imageCarousel) return;
            const newImages: PostUserMedia[] = [
              ...(imageCarousel.value?.contentValue as PostUserMedia[]),

              content,
            ];
            const newCarouselBlock: ContentBlockProp = {
              ...imageCarousel,
              value: {
                contentValue: newImages,
              },
            };
            setDocument((items) => {
              const overIndex = items.findIndex((doc) => doc.id === over.id);
              return [
                ...items.slice(0, overIndex),
                newCarouselBlock,
                ...items.slice(overIndex + 1, items.length),
              ];
            });
          }
          return;
        }
      }

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

  const clearGhostBlock = () => {
    if (document.find((doc) => doc.id === "draggable-content-new-block")) {
      setDocument((prev) => {
        return prev.filter((doc) => doc.id !== "draggable-content-new-block");
      });
    }
  };

  const handleDragMove = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) {
      clearGhostBlock();
      return;
    }

    if (active.id === over.id || over.id == "draggable-content-new-block")
      return;
    //Handle In Container Manipulation
    if (
      (active.id as string).includes("draggable-block") &&
      (over.id as string).includes("draggable-content") &&
      over.id !== "draggable-content-new-block"
    ) {
      //Handle Dragging an Image into another Image to Form a Carousel
      if (checkImageCarouselHandling(active, over)) {
        //Check If its within an acceptable threshold
        if (checkContentThreshold(active, over)) {
          clearGhostBlock();
          //todo: Visual Indication that this is a valid drop
          return;
        }
      }
      const newContentBlock: ContentBlockProp = {
        id: "draggable-content-new-block",
        value: {
          contentValue: "New Block",
        },
        type: "PREVIEW",
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
        modifiers={[]}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
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
