import { Skeleton } from "@/components/ui/Shared/skeleton";

export const LoadingPost = () => {
  return (
    <div className="w-full">
      <div className="rounded-none border-b w-full h-[5rem]" />
      <div className="w-full h-screen flex space-y-12 flex-col items-center mt-12 px-16">
        <Skeleton className="w-1/2 h-[10rem]" />
        <Skeleton className="w-1/2 h-[30rem]" />
        <Skeleton className="w-1/2 h-[20rem]" />
      </div>
    </div>
  );
};
