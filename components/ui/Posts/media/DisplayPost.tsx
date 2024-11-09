import { PreviewView } from "@/components/creator/blocks/BlockPreview";
import { CarouselView } from "@/components/creator/content/CarouselContent";
import { ImageView } from "@/components/creator/content/ImageContent";
import { TextView } from "@/components/creator/content/TextContent";
import { VideoView } from "@/components/creator/content/VideoContent";
import { ClassNameProp } from "@/lib/interfaces/componentTypes";
import {
  ContentBlockType,
  ContentComponent,
} from "@/lib/interfaces/documentTypes";
import { MediaPost } from "@/lib/interfaces/postTypes";
import { cn } from "@/lib/util/utils";
import { FC } from "react";

interface Props extends ClassNameProp {
  post: MediaPost;
}

export const RenderContentComponent: Record<
  ContentBlockType,
  ContentComponent
> = {
  CAROUSEL: CarouselView,
  IMAGE: ImageView,
  VIDEO: VideoView,
  TEXT: TextView,
  PREVIEW: PreviewView,
};

const DisplayPost: FC<Props> = ({ post, className }) => {
  const { document } = post;
  return (
    <div className={cn("flex flex-col py-4 px-8 ", className)}>
      {document.document.map((content) => {
        if (!content.type) return;
        const Component = RenderContentComponent[content.type];
        return <Component key={content.id} {...content} />;
      })}
    </div>
  );
};

export default DisplayPost;
