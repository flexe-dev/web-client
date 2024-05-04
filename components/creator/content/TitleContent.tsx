import { ContentBlockProp } from "@/lib/interface";
import React from "react";
import { SortableItem, DragHandle } from "@/components/dnd/Sortable";
import { Input } from "@/components/ui/input";
import ContentWrapper from "./ContentWrapper";
const TitleContent = (props: ContentBlockProp) => {
  const { value, valueCallback, onDelete, id } = props;
  const [contentValue, setContentValue] = [value, valueCallback];
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    valueCallback(event.target.value);
    setContentValue(event.target.value);
  };

  return (
    <SortableItem id={props.id}>
      <ContentWrapper>
        <Input
          value={value}
          onChange={(e) => handleOnChange(e)}
          placeholder="Title your post"
          className="border-none text-3xl bg-transparent font-bold h-16"
        />
      </ContentWrapper>
    </SortableItem>
  );
};

export default TitleContent;
