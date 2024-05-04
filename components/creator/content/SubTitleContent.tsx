import { ContentBlockProp } from "@/lib/interface";
import React, { useEffect } from "react";
import { SortableItem, DragHandle } from "@/components/dnd/Sortable";
import { Input } from "@/components/ui/input";
import ContentWrapper from "./ContentWrapper";
const SubTitleContent = (props: ContentBlockProp) => {
  const { value, valueCallback, onDelete, id } = props;
  const [contentValue, setContentValue] = [value, valueCallback];
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    valueCallback(event.target.value);
    setContentValue(event.target.value);
  };

  return (
    <SortableItem id={id}>
      <ContentWrapper>
        <Input
          value={value}
          onChange={(e) => handleOnChange(e)}
          placeholder="Enter a subtitle"
          className="border-none text-xl bg-transparent font-bold h-16"
        />
      </ContentWrapper>
    </SortableItem>
  );
};

export default SubTitleContent;
