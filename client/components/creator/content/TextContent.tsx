import { useDocumentCreator } from "@/components/context/DocumentCreatorProvider";
import { SortableItem } from "@/components/dnd/Sortable";
import { Textarea } from "@/components/ui/textarea";
import { ContentBlockProp } from "@/lib/interface";
import React from "react";
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
        <Textarea
          style={style}
          value={value?.contentValue as string}
          rows={1}
          onChange={(e) => handleValueChange(e)}
          placeholder="Write a quick description about your post"
          className="min-h-[50px] overflow-y-hidden text-primary border-none placeholder-muted bg-transparent py-2 px-4 resize-none "
        />
      </ContentWrapper>
    </SortableItem>
  );
};

//View Only Component
export const TextView = (props: ContentBlockProp) => {
  const { value, style } = props;
  return (
    <div
      className="min-h-[50px] border-none bg-transparent py-2 px-4 overflow-hidden resize-none"
      style={style}
    >
      {value?.contentValue as String}
    </div>
  );
};
