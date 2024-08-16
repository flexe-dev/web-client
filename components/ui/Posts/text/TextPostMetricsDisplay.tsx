import { usePostMetrics } from "@/components/context/PostInteractionContext";
import { useUserInteractions } from "@/components/context/UserInteractionsProvider";
import { IconType, PostInteractionLookup } from "@/lib/interface";
import { cn } from "@/lib/utils";
import {
  BookmarkIcon,
  ChatBubbleLeftEllipsisIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "../../button";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../../tooltip";

export const TextPostMetricsDisplay = () => {
  const { metrics, likePost, unlikePost, postId, savePost, unsavePost } =
    usePostMetrics();
  const { likedPosts, savedPosts } = useUserInteractions();
  const router = useRouter();

  const { likeCount, commentCount, saveCount } = metrics;

  const hasPriorInteraction = (
    interactions: PostInteractionLookup[]
  ): boolean => {
    return interactions.some((post) => post.postId === postId);
  };

  const existingLike = hasPriorInteraction(likedPosts);
  const existingSave = hasPriorInteraction(savedPosts);

  const InteractionButtons: MetricButtonProps[] = [
    {
      onClick: existingLike ? unlikePost : likePost,
      value: likeCount,
      Icon: HeartIcon,
      tooltipText: "Like",
      hoverTheme: "red",
      active: existingLike,
    },
    {
      onClick: () => {
        router.push(`/post/status/${postId}`);
      },
      value: commentCount,
      Icon: ChatBubbleLeftEllipsisIcon,
      tooltipText: "Comment",
      hoverTheme: "blue",
    },
    {
      onClick: existingSave ? unsavePost : savePost,
      value: saveCount,
      Icon: BookmarkIcon,
      tooltipText: "Save",
      hoverTheme: "yellow",
      active: existingSave,
    },
    {
      onClick: () => {
        toast("Not Implemented (Cry about it)");
      },
      value: 0,
      Icon: ShareIcon,
      tooltipText: "Share",
      hoverTheme: "green",
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex w-full items-center overflow-hidden">
        {InteractionButtons.map((button, index) => (
          <MetricsActionButton key={index} {...button} />
        ))}
      </div>
    </TooltipProvider>
  );
};

interface HoverColourStyling {
  stroke: string;
  text: string;
  background: string;
  border: string;
  active: string;
}

export type HoverStylingColours = "red" | "green" | "yellow" | "blue";

const HoverStyling: Record<HoverStylingColours, HoverColourStyling> = {
  red: {
    stroke: "group-hover:stroke-red-500",
    text: "group-hover:text-red-500",
    background: "hover:bg-red-800/20",
    border: "hover:border-t-red-700/30",
    active: "bg-red-800/20 hover:bg-red-700/10",
  },
  green: {
    stroke: "group-hover:stroke-green-600",
    text: "group-hover:text-green-600",
    background: "hover:bg-green-800/20",
    border: "hover:border-t-green-700/30",
    active: "bg-green-800/20 hover:bg-green-700/10",
  },
  yellow: {
    stroke: "group-hover:text-yellow-600 dark:group-hover:stroke-yellow-500/60",
    text: "group-hover:text-yellow-600 dark:group-hover:text-yellow-500/60",
    background: "hover:bg-yellow-800/20",
    border: "hover:border-t-yellow-700/30",
    active: "bg-yellow-800/20 hover:bg-yellow-700/10",
  },
  blue: {
    stroke: "group-hover:stroke-blue-500",
    text: "group-hover:text-blue-500",
    background: "hover:bg-blue-800/20",
    border: "hover:border-t-blue-700/30",
    active: "bg-blue-800/20 hover:bg-blue-700/10",
  },
};

export interface MetricButtonProps {
  hoverTheme: HoverStylingColours;
  onClick: () => void;
  value: number;
  tooltipText?: string;
  Icon: IconType;
  active?: boolean;
}

const MetricsActionButton: React.FC<MetricButtonProps> = ({
  onClick,
  value,
  Icon,
  tooltipText,
  hoverTheme,
  active,
}) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };

  const {
    stroke,
    text,
    background,
    border,
    active: activeBackground,
  } = HoverStyling[hoverTheme];

  return (
    <Tooltip>
      <TooltipContent side="bottom">{tooltipText}</TooltipContent>
      <TooltipTrigger asChild>
        <Button
          className={cn(
            "w-full transition-all rounded-none border-r last:border-r-transparent border-t group",
            background,
            border,
            active && activeBackground
          )}
          variant={"ghost"}
          onClick={handleButtonClick}
        >
          <Icon className={cn("transition-colors mr-2 w-6 h-6", stroke)} />
          <span className={cn("transition-colors", text)}>{value}</span>
        </Button>
      </TooltipTrigger>
    </Tooltip>
  );
};
