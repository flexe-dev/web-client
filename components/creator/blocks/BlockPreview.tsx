import { SortableItem } from "@/components/dnd/Sortable";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentBlockProp } from "@/lib/interface";

import React from "react";

const BlockPreview = (props: ContentBlockProp) => {
  return (
    <SortableItem id={props.id}>
      <Skeleton className="h-16 w-full" />
    </SortableItem>
  );
};

export default BlockPreview;
