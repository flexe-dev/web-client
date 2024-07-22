import { Skeleton } from "@/components/ui/skeleton";
import { PostType } from "@/lib/interface";

interface Props {
  type: PostType;
}

export const CommentPanelLoading = ({ type }: Props) => {
  const RenderedSkeleton: Record<PostType, React.ReactNode> = {
    MEDIA: <MediaCommentPanelSkeleton />,
    TEXT: <TextCommentPanelSkeleton />,
  };

  return RenderedSkeleton[type];
};

const MediaCommentPanelSkeleton = () => {
  return (
    <div className="relative h-screen w-[4rem] border-r rounded-t-none">
      <div className="absolute h-16 w-16 rounded-full border md:top-[calc(50%-7.5rem)] bg-background -right-8 "></div>
    </div>
  );
};

const TextCommentPanelSkeleton = () => {
  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto flex space-y-12 flex-col items-center mt-12 px-16">
      <Skeleton className="w-1/2 h-[10rem]" />
      <Skeleton className="w-1/2 h-[10rem]" />
      <Skeleton className="w-1/2 h-[10rem]" />
    </div>
  );
};
