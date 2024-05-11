import { DragHandle, SortableItem } from "@/components/dnd/Sortable";
import { ContentBlockProp } from "@/lib/interface";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import { usePostCreator } from "@/components/context/PostCreatorProvider";

export const TextContent = (props: ContentBlockProp) => {
  const { onValueChange, onStyleChange, setActiveStylingTool } =
    usePostCreator();
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
      <ContentWrapper id={id}>
        <Textarea
          onClick={() => setActiveStylingTool({ id: id, type: "text" })}
          style={style}
          value={value as string}
          onChange={(e) => handleValueChange(e)}
          placeholder="Write a quick description about your post"
          className="overflow-hidden border-none placeholder-muted bg-transparent text-secondary-header py-[0.25rem] px-4 resize-none "
        />
      </ContentWrapper>
    </SortableItem>
  );
};
