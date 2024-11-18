"use client";

import { useDocumentCreator } from "@/components/context/PostCreation/DocumentCreator/DocumentCreatorProvider";
import { SortableItem } from "@/components/dnd/Sortable";
import { Textarea } from "@/components/ui/Shared/textarea";
import { ContentBlockProp } from "@/lib/interfaces/documentTypes";
import React from "react";
import Linkify from "react-linkify";
import ContentWrapper from "./ContentWrapper";

//Editable Component
export const TextContent = (props: ContentBlockProp) => {
  const { onValueChange, onStyleChange } = useDocumentCreator();
  const { value, id, style } = props;
  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange(id, {
      contentValue: event.target.value,
    });
    onStyleChange(id, {
      ...style,
      height: `${event.target.scrollHeight}px`,
    });
  };

  return (
    <SortableItem id={id}>
      <ContentWrapper id={id} type="text">
        <Linkify>
          <Textarea
            style={style}
            value={value?.contentValue as string}
            rows={1}
            onChange={(e) => handleValueChange(e)}
            placeholder="Write a quick description about your post"
            className="min-h-[50px] overflow-y-hidden text-primary border-none placeholder-muted bg-transparent py-2 px-4 resize-none "
          />
        </Linkify>
      </ContentWrapper>
    </SortableItem>
  );
};

//View Only Component
export const TextView = (props: ContentBlockProp) => {
  const { value, style } = props;
  return (
    <Linkify>
      <div
        className="min-h-[50px] break-all !h-fit border-none bg-transparent py-2 px-4 overflow-hidden resize-none"
        style={style}
      >
        {value?.contentValue as String}
      </div>
    </Linkify>
  );
};
