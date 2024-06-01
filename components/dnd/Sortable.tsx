import React, { createContext, useContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ClassNameProp } from "@/lib/interface";
import { cn } from "@/lib/utils";

interface Props extends ClassNameProp {
  id: UniqueIdentifier;
  isSelfDraggable?: true | undefined;
}

interface Context {
  attributes: DraggableAttributes | null;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: null,
  listeners: undefined,
  ref() {},
});

export function SortableItem({
  children,
  id,
  isSelfDraggable,
  className,
}: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    transition: {
      duration: 500,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
    animateLayoutChanges: () => false,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  return (
    <SortableItemContext.Provider value={context}>
      <div
        className={cn("relative", className)}
        ref={setNodeRef}
        style={style}
        {...(isSelfDraggable ? { ...attributes, ...listeners } : {})}
      >
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}

export function DragHandle({ className }: ClassNameProp) {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <button className={cn(className)} {...attributes} {...listeners} ref={ref}>
      <svg viewBox="0 0 20 20" width="18" className="stroke-primary w-8 h-6">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </button>
  );
}

export function useSortableItem() {
  const context = useContext(SortableItemContext);
  if (context === undefined) {
    throw new Error(
      "useSortableItem must be used within a SortableItemProvider"
    );
  }
  return context;
}
