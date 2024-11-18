import {
  MediaDocument,
  MediaPost,
  PostAuxilliaryData,
} from "@/lib/interfaces/postTypes";
import { Dispatch, SetStateAction } from "react";

export interface MediaMetadataProviderState
  extends Pick<MediaDocument, "thumbnail" | "title" | "postStatus">,
    Pick<PostAuxilliaryData, "tags"> {
  id: string | undefined;
  onTagDelete: (tag: string) => void;
  setThumbnail: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setTags: Dispatch<SetStateAction<string[]>>;
  setID: Dispatch<SetStateAction<string | undefined>>;
  setDocumentMetadata: (post: MediaPost) => void;
}

export const mediaMetadataInitialState: MediaMetadataProviderState = {
  id: undefined,
  tags: [],
  thumbnail: "",
  title: "",
  postStatus: "DRAFT",
  onTagDelete: () => {},
  setID: () => {},
  setThumbnail: () => {},
  setTitle: () => {},
  setTags: () => {},
  setDocumentMetadata: () => {},
};
