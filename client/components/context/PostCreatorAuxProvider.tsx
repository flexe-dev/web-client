"use client";

import {
  ChildNodeProps,
  PostAuxilliaryData,
  PostStatus,
  PostUserMedia,
  UserPost,
} from "@/lib/interface";
import { createContext, useContext, useState } from "react";
interface PostCreatorAuxProviderState
  extends Omit<PostAuxilliaryData, "userID"> {
  id: string | undefined;
  onTagDelete: (tag: string) => void;
  onTechDelete: (tech: string) => void;
  setThumbnail: React.Dispatch<React.SetStateAction<PostUserMedia | undefined>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setTech: React.Dispatch<React.SetStateAction<string[]>>;
  setID: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const initialState: PostCreatorAuxProviderState = {
  id: undefined,
  title: "",
  tags: [],
  tech: [],
  thumbnail: undefined,
  postStatus: "DRAFT",
  onTagDelete: () => {},
  onTechDelete: () => {},
  setID: () => {},
  setThumbnail: () => {},
  setTitle: () => {},
  setTags: () => {},
  setTech: () => {},
};

export const PostCreatorAuxContext =
  createContext<PostCreatorAuxProviderState>(initialState);

interface Props extends ChildNodeProps {
  post?: UserPost;
}

export const PostCreatorAuxProvider = ({ children, post }: Props) => {
  const [id, setID] = useState<string | undefined>(post?.id ?? undefined);
  const [title, setTitle] = useState<string>(post?.auxData?.title ?? "");
  const [tags, setTags] = useState<string[]>(post?.auxData?.tags ?? []);
  const [postStatus, setPostStatus] = useState<PostStatus>(
    post?.auxData?.postStatus ?? "DRAFT"
  );
  const [tech, setTech] = useState<string[]>(post?.auxData?.tech ?? []);
  const [thumbnail, setThumbnail] = useState<PostUserMedia | undefined>(
    undefined
  );

  const onTagDelete = (deleteNode: string) => {
    setTags(tags.filter((t) => t !== deleteNode));
  };

  const onTechDelete = (deletedNode: string) => {
    setTech(tech.filter((t) => t !== deletedNode));
  };

  return (
    <PostCreatorAuxContext.Provider
      value={{
        id,
        title,
        tags,
        tech,
        thumbnail,
        postStatus,
        setID,
        setTitle,
        setTags,
        setTech,
        setThumbnail,
        onTagDelete,
        onTechDelete,
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
