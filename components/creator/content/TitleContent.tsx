import { ContentBlockProp } from "@/lib/interface";
import React from "react";
import { SortableItem } from "@/components/dnd/Sortable";
import { Input } from "@/components/ui/input";
import ContentWrapper from "./ContentWrapper";
import { usePostCreator } from "@/components/context/PostCreatorProvider";

export const TitleContent = (props: ContentBlockProp) => {
  const { value, id } = props;
  const { previewMode, onDelete, onValueChange } = usePostCreator();

  return (
    <SortableItem id={id}>
      <ContentWrapper id={id}>
        <Input
          value={value}
          onChange={(e) => onValueChange(id, e.target.value)}
          placeholder="Title your post"
          className="border-none text-3xl bg-transparent font-bold h-12"
        />
      </ContentWrapper>
    </SortableItem>
  );
};
