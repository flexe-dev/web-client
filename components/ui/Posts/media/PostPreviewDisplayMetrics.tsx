"use client";

import { usePostMetrics } from "@/components/context/PostInteractionContext";
import { useUserInteractions } from "@/components/context/UserInteractionsProvider";
import { PostInteractionLookup } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { BookmarkIcon, HeartIcon, ShareIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MetricButtonProps } from "../text/TextPostMetricsDisplay";
import { MetricButton, MetricContent } from "./PostDisplayMetrics";

export const PostPreviewDisplayMetrics = () => {
  const { likedPosts, savedPosts } = useUserInteractions();
  const { metrics, likePost, unlikePost, postId, savePost, unsavePost } =
    usePostMetrics();
  const { likeCount, commentCount, saveCount } = metrics;
  const { status } = useSession();
  const hasPriorInteraction = (
    interactions: PostInteractionLookup[]
  ): boolean => {
    return interactions.some((post) => post.postId === postId);
  };
  const router = useRouter();
  const existingLike = hasPriorInteraction(likedPosts);
  const existingSave = hasPriorInteraction(savedPosts);

  const InteractionButtons: Omit<MetricButtonProps, "status">[] = [
    {
      onClick: existingLike ? unlikePost : likePost,
      value: likeCount,
      Icon: HeartIcon,
      hoverTheme: "red",
      active: existingLike,
    },
    {
      onClick: () => {
        router.push(`/post/media/${postId}?c=t`);
      },
      value: commentCount,
      Icon: ChatBubbleLeftEllipsisIcon,
      hoverTheme: "blue",
      isComment: true,
    },
    {
      onClick: existingSave ? unsavePost : savePost,
      value: saveCount,
      Icon: BookmarkIcon,
      hoverTheme: "yellow",
      active: existingSave,
    },
    {
      onClick: () => {
        toast("Not Implemented (Cry about it)");
      },
      value: 0,
      Icon: ShareIcon,
      hoverTheme: "green",
    },
  ];

  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed translate-x-[-50%] md:translate-x-0 left-[50%] right-auto bottom-8 md:-left-8 md:absolute flex md:flex-col items-center space-x-2 md:space-x-0 z-[80] md:top-[calc(45%-5rem)]"
        )}
      >
        {InteractionButtons.map((button, index) => (
          <MetricButton
            status={status}
            {...button}
            key={`metric-button-${index}`}
          >
            <div className="hidden md:block">
              <MetricContent {...button} />
            </div>
            <div className="block md:hidden">
              <MetricContent {...button} preview />
            </div>
          </MetricButton>
        ))}
      </div>
    </TooltipProvider>
  );
};
