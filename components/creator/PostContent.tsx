"use client";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import React, { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CreatePost } from "@/lib/interface";
import ContentSidebar, { dropAnimationConfig } from "./ContentSidebar";
import Blocks, { BlockID } from "./blocks/Blocks";
import { useBlockDrag } from "../context/PostDragProvider";
import { usePostCreator } from "../context/PostCreatorProvider";

interface Props {
  postContent: CreatePost[];
}

const PostContent = (props: Props) => {
  const { document } = usePostCreator();
  const { isOver, over, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const { activeDragID } = useBlockDrag();

  const getRenderedDragOverlay = (id: string): React.ReactNode => {
    if (id.includes("draggable-block")) return <Blocks id={id as BlockID} />;
    if (id.includes("draggable-content"))
      return document.find((doc) => doc.id === id)?.content ?? <></>;
  };

  return (
    <>
      <ContentSidebar postContent={props.postContent} />
      <section className="w-full justify-center h-full flex">
        <section className="w-full flex flex-col space-y-4 py-12 px-8 container border border-dashed rounded-md my-6 lg:my-12 mx-6">
          <SortableContext
            id="droppable-post-content"
            strategy={verticalListSortingStrategy}
            items={document.map((document) => document.id)}
          >
            {document.map((document, index) => {
              return (
                <React.Fragment key={`document-component-${index}`}>
                  {document.content}
                </React.Fragment>
              );
            })}
          </SortableContext>
        </section>
      </section>

      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeDragID ? getRenderedDragOverlay(activeDragID as string) : null}
      </DragOverlay>
    </>
  );
};

export default PostContent;
