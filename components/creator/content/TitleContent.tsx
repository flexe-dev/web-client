import { ContentBlockProp } from "@/lib/interface";
import React, { useEffect, useState } from "react";
import { SortableItem, DragHandle } from "@/components/dnd/Sortable";
import { Input } from "@/components/ui/input";
import ContentWrapper from "./ContentWrapper";
const TitleContent = (props: ContentBlockProp) => {
  const { value, onChange, onDelete, id } = props;
  const [contentValue, setContentValue] = useState(value);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    setContentValue(event.target.value);
  };

  useEffect(() => {
    setContentValue(value);
  }, [value]);

  return (
    <SortableItem id={props.id}>
      <ContentWrapper>
        <Input
          value={contentValue}
          onChange={(e) => handleOnChange(e)}
          placeholder="Title your post"
          className="border-none text-3xl bg-transparent font-bold h-16"
        />
      </ContentWrapper>
    </SortableItem>
  );
};

export default TitleContent;
