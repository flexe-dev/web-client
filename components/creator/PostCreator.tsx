"use client";

import { PostUserMedia } from "@/lib/interface";
import { DocumentCreatorProvider } from "../context/PostCreation/DocumentCreatorProvider";
import { PostCreatorAuxProvider } from "../context/PostCreation/MediaPostMetaDataProvider";
import { PostDragProvider } from "../context/PostCreation/PostDragProvider";
import PostContent from "./PostContent";

interface Props {
  postContent: PostUserMedia[];
}

const DocumentCreator = (props: Props) => {
  return (
    <PostCreatorAuxProvider>
      <DocumentCreatorProvider content={props.postContent}>
        <div className="w-full flex relative">
          <PostDragProvider>
            <PostContent />
          </PostDragProvider>
        </div>
      </DocumentCreatorProvider>
    </PostCreatorAuxProvider>
  );
};

export default DocumentCreator;
