import { DragHandle, SortableItem } from "@/components/dnd/Sortable";
import { ContentBlockProp } from "@/lib/interface";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import ContentWrapper from "./ContentWrapper";

const TextContent = (props: ContentBlockProp) => {
  const { value, onChange, onDelete, id } = props;
  const [contentValue, setContentValue] = useState(value);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
    setContentValue(event.target.value);
  };

  useEffect(() => {
    setContentValue(value);
  }, [value]);

  return (
    <SortableItem id={props.id}>
      <ContentWrapper>
        <Textarea
          value={contentValue}
          onChange={(e) => handleOnChange(e)}
          placeholder="Write a quick description about your post"
          className="border-none placeholder-muted bg-transparent text-secondary-header max-h-[10rem]"
        />
      </ContentWrapper>
    </SortableItem>
  );
};

export default TextContent;
