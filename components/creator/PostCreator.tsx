import { CreatePost } from "@/lib/interface";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ContentSidebar from "./ContentSidebar";
import { useDroppable } from "@dnd-kit/core";
import { PostDragProvider } from "../context/PostDragProvider";
interface Props {
  postContent: CreatePost[];
}

const PostCreator = (props: Props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const [document, setDocument] = useState<React.ReactNode[]>([
    <Input placeholder="Title your post" className="text-3xl font-bold h-16" />,
    <Textarea
      placeholder="Write a quick description about your post"
      className="placeholder-muted text-secondary-header my-4 max-h-[10rem]"
    />,
  ]);

  return (
    <PostDragProvider>
      <div className="w-full flex">
        <ContentSidebar postContent={props.postContent} />
        <section className="w-full justify-center h-full flex">
          <section
            ref={setNodeRef}
            className="w-full items-center py-12 px-8 container border border-dashed rounded-md flex flex-col my-6 lg:my-12 mx-6"
          >
            {document.map((content, index) => {
              return (
                <React.Fragment key={`document-component-${index}`}>
                  {content}
                </React.Fragment>
              );
            })}
          </section>
        </section>
      </div>
    </PostDragProvider>
  );
};

export default PostCreator;
