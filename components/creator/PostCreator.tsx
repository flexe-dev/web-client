"use client";

import { PostUserMedia } from "@/lib/interfaces/documentTypes";
import { DocumentCreatorProvider } from "../context/PostCreation/DocumentCreator/DocumentCreatorProvider";
import { PostCreatorAuxProvider } from "../context/PostCreation/MediaMetadata/MediaPostMetadataProvider";
import { PostDragProvider } from "../context/PostCreation/PostDrag/PostDragProvider";
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
