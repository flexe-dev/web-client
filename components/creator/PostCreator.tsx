import { CreatePost } from "@/lib/interface";
import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ContentSidebar from "./ContentSidebar";
interface Props {
  postContent: CreatePost[];
}

const PostCreator = (props: Props) => {
  return (
    <div className="w-full flex">
      <ContentSidebar postContent={props.postContent} />
      <section className="w-full justify-center h-full flex">
        <section className="w-full items-center py-12 px-8 container border border-dashed rounded-md flex flex-col my-6 lg:my-12 mx-6">
          <Input
            placeholder="Title your post"
            className="text-3xl font-bold h-16"
          />
          <Textarea
            placeholder="Write a quick description about your post"
            className="placeholder-muted text-secondary-header my-4 max-h-[10rem]"
          />
        </section>
      </section>
    </div>
  );
};

export default PostCreator;
