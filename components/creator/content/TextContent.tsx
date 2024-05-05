import { DragHandle, SortableItem } from "@/components/dnd/Sortable";
import { ContentBlockProp } from "@/lib/interface";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import { usePostCreator } from "@/components/context/PostCreatorProvider";

export const TextContent = (props: ContentBlockProp) => {
  const { previewMode, onDelete, onValueChange } = usePostCreator();
  const { value, id } = props;

  return (
    <SortableItem id={props.id}>
      <ContentWrapper>
        <Textarea
          value={value}
          onChange={(e) => onValueChange(id, e.target.value)}
          placeholder="Write a quick description about your post"
          className="border-none placeholder-muted bg-transparent text-secondary-header max-h-[10rem]"
        />
      </ContentWrapper>
    </SortableItem>
  );
};
