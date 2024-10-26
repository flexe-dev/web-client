"use client";

import { SortableItem } from "@/components/dnd/Sortable";
import { Skeleton } from "@/components/ui/Shared/skeleton";
import { ContentBlockProp } from "@/lib/interface";

const BlockPreview = (props: ContentBlockProp) => {
  return (
    <SortableItem id={props.id}>
      <PreviewView {...props} />
    </SortableItem>
  );
};

export const PreviewView = (props: ContentBlockProp) => {
  return <Skeleton className="h-16 w-full" />;
};

export default BlockPreview;
