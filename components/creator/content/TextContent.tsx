import { DragHandle, SortableItem } from "@/components/dnd/Sortable";
import { ContentBlockProp } from "@/lib/interface";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import { usePostCreator } from "@/components/context/PostCreatorProvider";
import { Input } from "@/components/ui/input";

export const TextContent = (props: ContentBlockProp) => {
  const { onValueChange, onStyleChange } = usePostCreator();
  const { value, id, style } = props;
  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange(id, event.target.value);
    onStyleChange(id, {
      ...style,
      height: `${event.target.scrollHeight}px`,
    });
  };

  return (
    <SortableItem id={id}>
      <ContentWrapper id={id} type="text">
        <Textarea
          style={style}
          value={value as string}
          rows={1}
          onChange={(e) => handleValueChange(e)}
          placeholder="Write a quick description about your post"
          className="min-h-[50px] overflow-y-hidden text-primary border-none placeholder-muted bg-transparent py-2 px-4 resize-none "
        />
      </ContentWrapper>
    </SortableItem>
  );
};
