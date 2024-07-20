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
  return <Skeleton className="h-screen w-[4rem] rounded-t-none" />;
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
