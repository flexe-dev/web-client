import { useDocumentCreator } from "@/components/context/PostCreation/DocumentCreatorProvider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import ImageBlock from "../blocks/ImageBlock";
import UserImageBlock from "../blocks/UserImageBlock";
import UserMediaBlock from "../blocks/UserMediaBlock";
import UserVideoBlock from "../blocks/UserVideoBlock";
import VideoBlock from "../blocks/VideoBlock";
import { PostContentType, PostUserMediaThumbnail } from "@/lib/interface";

interface ThumbnailProps {
  thumbnailObject: PostUserMediaThumbnail[];
}

const ContentTab = (props: ThumbnailProps) => {
  const content = ["block", "uploaded"] as const;
  type ContentType = (typeof content)[number];
  const [renderedContent, setRenderedContent] = useState<ContentType>("block");
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="w-full text-center mb-4 font-semibold py-2 border-b-2">
        {renderedContent === "block" ? "Visuals" : "Uploaded"}
      </h2>
      {renderedContent === "block" ? (
        <>
          <div
            className="relative w-5/6 max-w-[83.33%] ml-2 mr-4 my-2 h-[8rem] cursor-pointer rounded-md border-2 border-transparent hover:border-primary"
            onClick={() => {
              setRenderedContent("uploaded");
            }}
          >
            <UserMediaBlock
              thumbnail={props.thumbnailObject?.at(0)?.thumbnail}
            />
          </div>
          <ImageBlock />
          <VideoBlock />
        </>
      ) : (
        <>
          <div className="cursor-pointer w-full">
            <Button
              variant={"ghost"}
              onClick={() => {
                setRenderedContent("block");
              }}
              className="flex space-x-2 items-center justify-start ml-2"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back</span>
            </Button>
          </div>
          <ScrollArea className="h-[73dvh] w-full">
            <UserMediaBlocks thumbnailObject={props.thumbnailObject} />
          </ScrollArea>
        </>
      )}
    </section>
  );
};

const UserMediaBlocks = (props: ThumbnailProps) => {
  const { thumbnailObject: postContent } = props;
  const { content } = useDocumentCreator();
  return content.map((content, index) => {
    if (content.content.format === PostContentType.VIDEO) {
      return (
        <UserVideoBlock
          key={index}
          content={content}
          thumbnail={
            postContent[index]?.thumbnail ??
            process.env.NEXT_PUBLIC_FALLBACK_PHOTO
          }
        />
      );
    }
    return (
      <UserImageBlock
        key={index}
        content={content}
        thumbnail={
          postContent[index]?.thumbnail ??
          process.env.NEXT_PUBLIC_FALLBACK_PHOTO
        }
      />
    );
  });
};

export default ContentTab;
