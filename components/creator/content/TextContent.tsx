import { DragHandle, SortableItem } from "@/components/dnd/Sortable";
import { ContentBlockProp, PostContentBlock } from "@/lib/interface";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import ContentWrapper from "./ContentWrapper";

const TextContent = (props: ContentBlockProp) => {
  const { value, valueCallback, onDelete, id } = props;
  const [contentValue, setContentValue] = [value, valueCallback];

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    valueCallback(event.target.value);
    setContentValue(event.target.value);
  };

  return (
    <SortableItem id={props.id}>
      <ContentWrapper>
        <Textarea
          value={value}
          onChange={(e) => handleOnChange(e)}
          placeholder="Write a quick description about your post"
          className="border-none placeholder-muted bg-transparent text-secondary-header max-h-[10rem]"
        />
      </ContentWrapper>
    </SortableItem>
  );
};

export default TextContent;
