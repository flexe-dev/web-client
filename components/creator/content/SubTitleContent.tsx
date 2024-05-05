import { ContentBlockProp } from "@/lib/interface";
import React, { useEffect, useState } from "react";
import { SortableItem, DragHandle } from "@/components/dnd/Sortable";
import { Input } from "@/components/ui/input";
import ContentWrapper from "./ContentWrapper";
import { usePostCreator } from "@/components/context/PostCreatorProvider";

export const SubTitleContent = (props: ContentBlockProp) => {
  const { value, id } = props;
  const { previewMode, onDelete, onValueChange } = usePostCreator();
  const [contentValue, setContentValue] = useState(value);

  return (
    <SortableItem id={id}>
      <ContentWrapper>
        <Input
          value={value}
          onChange={(e) => onValueChange(id, e.target.value)}
          placeholder="Enter a subtitle"
          className="border-none text-xl bg-transparent font-bold h-16"
        />
      </ContentWrapper>
    </SortableItem>
  );
};
