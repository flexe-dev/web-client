"use client";

import { createContext, useContext, useState } from "react";
import {
  ChildNodeProps,
  PostAuxilliaryData,
  PostUserMedia,
} from "@/lib/interface";
import { PostStatus } from "@prisma/client";
interface PostCreatorAuxProviderState extends PostAuxilliaryData {
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
  postStatus: PostStatus.DRAFT,
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
  postData?: PostAuxilliaryData;
}

export const PostCreatorAuxProvider = ({ children, postData }: Props) => {
  const [id, setID] = useState<string | undefined>(postData?.id ?? undefined);
  const [title, setTitle] = useState<string>(postData?.title ?? "");
  const [tags, setTags] = useState<string[]>(postData?.tags ?? []);
  const [postStatus, setPostStatus] = useState<PostStatus>(
    postData?.postStatus ?? PostStatus.DRAFT
  );
  const [tech, setTech] = useState<string[]>(postData?.tech ?? []);
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
