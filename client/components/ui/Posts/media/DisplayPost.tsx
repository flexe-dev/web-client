import { PreviewView } from "@/components/creator/blocks/BlockPreview";
import { CarouselView } from "@/components/creator/content/CarouselContent";
import { ImageView } from "@/components/creator/content/ImageContent";
import { TextView } from "@/components/creator/content/TextContent";
import { VideoView } from "@/components/creator/content/VideoContent";
import { ContentBlockType, ContentComponent, UserPost } from "@/lib/interface";

interface Props {
  post: UserPost;
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

const DisplayPost = ({ post }: Props) => {
  const { document } = post;
  return (
    <div className="flex flex-col py-4">
      {document.map((content) => {
        if (!content.type) return;
        const Component = RenderContentComponent[content.type];
        return <Component key={content.id} {...content} />;
      })}
    </div>
  );
};

export default DisplayPost;
