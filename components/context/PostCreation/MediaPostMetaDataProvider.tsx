"use client";

import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import {
  MediaDocument,
  MediaPost,
  PostAuxilliaryData,
  PostStatus,
} from "@/lib/interfaces/postTypes";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface PostCreatorAuxProviderState
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

const initialState: PostCreatorAuxProviderState = {
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

export const PostCreatorAuxContext =
  createContext<PostCreatorAuxProviderState>(initialState);

interface Props extends ChildNodeProps {
  post?: MediaPost;
}

export const PostCreatorAuxProvider = ({ children, post }: Props) => {
  const [id, setID] = useState<string | undefined>(post?.id);
  const [title, setTitle] = useState<string>(post?.document.title ?? "");
  const [tags, setTags] = useState<string[]>(post?.auxData?.tags ?? []);
  const [postStatus, setPostStatus] = useState<PostStatus>(
    post?.document.postStatus ?? "DRAFT"
  );

  const [thumbnail, setThumbnail] = useState<string>(
    post?.document?.thumbnail ?? ""
  );

  const onTagDelete = (deleteNode: string) => {
    setTags(tags.filter((t) => t !== deleteNode));
  };

  const setDocumentMetadata = (post: MediaPost) => {
    setID(post.id);
    setTitle(post.document.title);
    setTags(post.auxData.tags);
    setThumbnail(post.document.thumbnail);
    setPostStatus(post.document.postStatus);
  };

  return (
    <PostCreatorAuxContext.Provider
      value={{
        id,
        title,
        tags,
        thumbnail,
        postStatus,
        setID,
        setTitle,
        setTags,
        setThumbnail,
        onTagDelete,
        setDocumentMetadata,
      }}
    >
      {children}
    </PostCreatorAuxContext.Provider>
  );
};

export const usePostAuxData = () => {
  const context = useContext(PostCreatorAuxContext);
  if (!context) {
    throw new Error(
      "usePostCreatorAuxCreator must be used within a PostCreatorAuxProvider"
    );
  }
  return context;
};
