"use client";

import { usePostMetrics } from "@/components/context/User/PostInteractionContext";
import { useUserInteractions } from "@/components/context/UserInteraction/UserInteractionsProvider";
import { cn } from "@/lib/util/utils";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ForwardIcon, HeartIcon, MergeIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MetricButtonProps } from "../Text/TextPostMetricsDisplay";
import { MetricButton, MetricContent } from "./PostDisplayMetrics";
import { PostInteractionLookup } from "@/lib/interfaces/interactionTypes";
import { TooltipProvider } from "../../Shared/tooltip";

export const PostPreviewDisplayMetrics = () => {
  const { likedPosts, repostedPosts } = useUserInteractions();
  const { metrics, likePost, unlikePost, postId, repostPost, removeRepost } =
    usePostMetrics();
  const { likeCount, commentCount, repostCount } = metrics;
  const { status } = useSession();
  const hasPriorInteraction = (
    interactions: PostInteractionLookup[]
  ): boolean => {
    return interactions.some((post) => post.postId === postId);
  };
  const router = useRouter();
  const existingLike = hasPriorInteraction(likedPosts);
  const existingRepost = hasPriorInteraction(repostedPosts);

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
      onClick: existingRepost ? removeRepost : repostPost,
      value: repostCount,
      Icon: MergeIcon,
      hoverTheme: "yellow",
      active: existingRepost,
    },
    {
      onClick: () => {
        toast("Not Implemented (Cry about it)");
      },
      value: 0,
      Icon: ForwardIcon,
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
            key={`metric-button-${index}`}
            status={status}
            {...button}
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
