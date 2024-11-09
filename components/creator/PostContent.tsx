"use client";

import {
  ContentBlockType,
  ContentComponent,
} from "@/lib/interfaces/documentTypes";
import { DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useDocumentCreator } from "../context/PostCreation/DocumentCreatorProvider";
import { useBlockDrag } from "../context/PostCreation/PostDragProvider";
import { Switch } from "../ui/Shared/switch";
import { CreatorHeader } from "./PostCreatorHeader";
import BlockPreview from "./blocks/BlockPreview";
import Blocks, { BlockID } from "./blocks/Blocks";
import UserImageBlock from "./blocks/UserImageBlock";
import UserVideoBlock from "./blocks/UserVideoBlock";
import { GalleryContent } from "./content/CarouselContent";
import { ImageContent } from "./content/ImageContent";
import { TextContent } from "./content/TextContent";
import { VideoContent } from "./content/VideoContent";
import ContentSidebar, { dropAnimationConfig } from "./sidebar/ContentSidebar";

export const getBlockComponent: Record<ContentBlockType, ContentComponent> = {
  TEXT: TextContent,
  IMAGE: ImageContent,
  VIDEO: VideoContent,
  CAROUSEL: GalleryContent,
  PREVIEW: BlockPreview,
};

const PostContent = () => {
  const {
    document,
    previewMode,
    setPreviewMode,
    content,
    setActiveStylingTool,
  } = useDocumentCreator();
  const { activeDragID } = useBlockDrag();

  const getRenderedDragOverlay = (id: string): React.ReactNode => {
    if (id.includes("draggable-content")) {
      const contentBlock = document.find((block) => block.id === id);
      if (!contentBlock || !contentBlock.type) return null;
      const Component = getBlockComponent[contentBlock.type];

      return (
        <Component
          id={contentBlock.id}
          value={contentBlock.value}
          style={contentBlock.style}
          options={contentBlock.options}
          type={contentBlock.type}
        />
      );
    }
    if (id.includes("user")) {
      const [_, type, contentId] = id.split("||");
      const contentMedia = content.find(
        (media) => media.content.id === contentId
      );
      if (!contentMedia) return null;

      return (
        <div className="opacity-50">
          {type === "video" ? (
            <UserVideoBlock content={contentMedia} dragging />
          ) : (
            <UserImageBlock content={contentMedia} />
          )}
        </div>
      );
    }
    return <Blocks id={id as BlockID} />;
  };

  return (
    <>
      <ContentSidebar />
      <section
        onClick={() => setActiveStylingTool(null)}
        className="z-[20] w-full items-center flex flex-col relative"
      >
        <CreatorHeader />
        <section className="mx-16 lg:mx-6 relative w-full flex flex-col space-y-2 py-12 px-8 container border border-dashed rounded-md my-6 ">
          <div className="absolute flex space-x-2 right-10 top-4">
            <Switch
              checked={previewMode}
              onCheckedChange={() => setPreviewMode(!previewMode)}
            />
            <h3>Preview Mode</h3>
          </div>
          <AnimatePresence>
            <SortableContext
              id="droppable-post-content"
              strategy={verticalListSortingStrategy}
              items={document.map((document) => document.id)}
            >
              {document.map((document, index) => {
                const Component = getBlockComponent[document.type!];
                return (
                  <React.Fragment key={`document-component-${index}`}>
                    <Component
                      id={document.id}
                      value={document.value}
                      style={document.style}
                      options={document.options}
                    />
                  </React.Fragment>
                );
              })}
            </SortableContext>
          </AnimatePresence>
        </section>
      </section>

      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeDragID ? getRenderedDragOverlay(activeDragID as string) : null}
      </DragOverlay>
      <div
        className="z-[10] absolute inset-0"
        onClick={() => setActiveStylingTool(null)}
      />
    </>
  );
};

export default PostContent;
