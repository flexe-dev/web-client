"use client";

import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { MediaPost, PostStatus } from "@/lib/interfaces/postTypes";
import { createContext, useContext, useState } from "react";
import {
  mediaMetadataInitialState,
  MediaMetadataProviderState,
} from "./MedaMetadataState";

export const PostCreatorAuxContext = createContext<MediaMetadataProviderState>(
  mediaMetadataInitialState
);

interface Props extends ChildNodeProps {
  post?: MediaPost;
}

export const PostCreatorAuxProvider = ({ children, post }: Props) => {
  const [id, setID] = useState<string | undefined>(post?.id);
  const [title, setTitle] = useState<string>(
    post?.document.title ?? mediaMetadataInitialState.title
  );
  const [tags, setTags] = useState<string[]>(
    post?.auxData?.tags ?? mediaMetadataInitialState.tags
  );
  const [postStatus, setPostStatus] = useState<PostStatus>(
    post?.document.postStatus ?? mediaMetadataInitialState.postStatus
  );

  const [thumbnail, setThumbnail] = useState<string>(
    post?.document?.thumbnail ?? mediaMetadataInitialState.thumbnail
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
