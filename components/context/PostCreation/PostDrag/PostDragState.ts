import { UniqueIdentifier } from "@dnd-kit/core";

export interface PostDragProviderState {
  activeDragID: UniqueIdentifier | null;
  setActiveDragID: React.Dispatch<
    React.SetStateAction<UniqueIdentifier | null>
  >;
}

export const postDragInitialState: PostDragProviderState = {
  activeDragID: null,
  setActiveDragID: () => {},
};
