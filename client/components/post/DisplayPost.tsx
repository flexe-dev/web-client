import { ContentBlockType, ContentComponent, UserPost } from "@/lib/interface";
import { PreviewView } from "../creator/blocks/BlockPreview";
import { CarouselView } from "../creator/content/CarouselContent";
import { ImageView } from "../creator/content/ImageContent";
import { TextView } from "../creator/content/TextContent";
import { VideoView } from "../creator/content/VideoContent";

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
    <div className="flex flex-col items-center py-4">
      {document.map((content) => {
        if (!content.type) return;
        const Component = RenderContentComponent[content.type];
        return <Component key={content.id} {...content} />;
      })}
    </div>
  );
};

export default DisplayPost;
