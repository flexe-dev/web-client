"use client";

import React from "react";
import { PostUserMedia } from "@/lib/interface";
import { PostDragProvider } from "../context/PostDragProvider";
import PostContent from "./PostContent";
import { DocumentCreatorProvider } from "../context/DocumentCreatorProvider";
import { PostCreatorAuxProvider } from "../context/PostCreatorAuxProvider";

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
