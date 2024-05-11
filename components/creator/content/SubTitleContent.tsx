import { ContentBlockProp } from "@/lib/interface";
import React, { useEffect, useState } from "react";
import { SortableItem, DragHandle } from "@/components/dnd/Sortable";
import { Input } from "@/components/ui/input";
import ContentWrapper from "./ContentWrapper";
import { usePostCreator } from "@/components/context/PostCreatorProvider";

export const SubTitleContent = (props: ContentBlockProp) => {
  const { value, id } = props;
  const { onValueChange, setActiveStylingTool } = usePostCreator();

  return (
    <SortableItem id={id}>
      <ContentWrapper id={id}>
        <Input
          onClick={() => setActiveStylingTool({ id: id, type: "subtitle" })}
          value={value as string}
          onChange={(e) => onValueChange(id, e.target.value)}
          placeholder="Enter a subtitle"
          className="border-none text-xl bg-transparent font-bold h-12"
        />
      </ContentWrapper>
    </SortableItem>
  );
};
