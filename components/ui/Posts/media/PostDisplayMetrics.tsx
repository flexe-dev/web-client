"use client";

import { ChildNodeProps, PostInteractionLookup } from "@/lib/interface";
import { cn, isAuthenticated, renderMetric } from "@/lib/util/utils";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import { UseLoginModal } from "@/components/context/User/LoginModalProvider";
import { usePostMetrics } from "@/components/context/User/PostInteractionContext";
import { useUserInteractions } from "@/components/context/UserInteraction/UserInteractionsProvider";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "../../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";
import {
  HoverStylingColours,
  MetricButtonProps,
} from "../text/TextPostMetricsDisplay";

interface Props {
  commentOnClick: () => void;
  commentPanelOpen: boolean;
}

export const PostDisplayMetrics: React.FC<Props> = ({
  commentOnClick,
  commentPanelOpen,
}) => {
  const { likedPosts, savedPosts } = useUserInteractions();
  const { status } = useSession();
  const { metrics, likePost, unlikePost, postId, savePost, unsavePost } =
    usePostMetrics();
  const { likeCount, commentCount, saveCount } = metrics;

  const hasPriorInteraction = (
    interactions: PostInteractionLookup[]
  ): boolean => {
    return interactions.some((post) => post.postId === postId);
  };

  const existingLike = hasPriorInteraction(likedPosts);
  const existingSave = hasPriorInteraction(savedPosts);

  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed bottom-12 right-12 md:left-auto md:-right-8 md:absolute flex flex-col items-center md:top-[calc(45%-5rem)]"
        )}
      >
        <MetricButton
          status={status}
          active={existingLike}
          onClick={existingLike ? unlikePost : likePost}
          hoverTheme="red"
          tooltipText="Like"
        >
          <MetricContent
            value={likeCount}
            Icon={HeartIcon}
            active={existingLike}
            hoverTheme="red"
          />
        </MetricButton>
        <CommentMetricButton
          hoverTheme="blue"
          value={commentCount}
          commentOnClick={commentOnClick}
          commentPanelOpen={commentPanelOpen}
        />
        <MetricButton
          status={status}
          onClick={existingSave ? unsavePost : savePost}
          active={existingSave}
          hoverTheme="yellow"
          tooltipText="Save"
        >
          <MetricContent
            value={saveCount}
            Icon={BookmarkIcon}
            hoverTheme="yellow"
            active={existingSave}
          />
        </MetricButton>
        <MetricButton
          status={status}
          onClick={() => {
            toast("Cry about it");
          }}
          hoverTheme="green"
          tooltipText="Share"
        >
          <MetricContent value={999} Icon={ShareIcon} hoverTheme="green" />
        </MetricButton>
      </div>
    </TooltipProvider>
  );
};

interface ButtonStyling {
  border: string;
  activeBorder: string;
}

const HoverStyling: Record<HoverStylingColours, ButtonStyling> = {
  red: {
    border: "hover:border-red-500/80",
    activeBorder:
      "border-red-500/80 hover:border-red-500/50 group-hover:border-red-500/50",
  },
  yellow: {
    border: "hover:border-yellow-500/80",
    activeBorder:
      "border-yellow-500/80 hover:border-yellow-500/50 group-hover:border-yellow-500/50",
  },
  green: {
    border: "hover:border-green-500/80",
    activeBorder:
      "border-green-500/80 hover:border-green-500/50 group-hover:border-green-500/50",
  },
  blue: {
    border: "hover:border-blue-500/80",
    activeBorder:
      "border-blue-500/80 hover:border-blue-500/50 group-hover:border-blue-500/50",
  },
};

interface MediaMetricButtonProps
  extends Omit<MetricButtonProps, "value" | "Icon">,
    ChildNodeProps {}

export const MetricButton: React.FC<MediaMetricButtonProps> = ({
  onClick,
  active,
  hoverTheme,
  tooltipText,
  children,
  status,
  isComment,
}) => {
  const { border, activeBorder } = HoverStyling[hoverTheme];
  const { setOpen } = UseLoginModal();

  const handleOnClick = () => {
    if (!isAuthenticated(status) && !isComment) {
      setOpen(true);
      return;
    }

    onClick();
  };

  return (
    <Tooltip>
      {tooltipText && (
        <>
          <TooltipContent
            key={"tooltip-md"}
            className="ml-8 mt-2 hidden md:block"
            side="right"
          >
            {tooltipText}
          </TooltipContent>
          <TooltipContent
            key={"tooltip-sm"}
            className="ml-8 mt-2 block md:hidden"
            side={"left"}
          >
            {tooltipText}
          </TooltipContent>
        </>
      )}
      <TooltipTrigger asChild>
        <Button
          key={nanoid()}
          className={cn(
            "flex shadow-lg my-1 transition-colors relative flex-col items-center justify-center h-14 w-14 backdrop-blur-xl bg-background/40 hover:bg-background/50 md:bg-background border-[2.5px] rounded-full group",
            border,
            active ? activeBorder : "md:border-border"
          )}
          variant={"outline"}
          size={"icon"}
          onClick={handleOnClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
    </Tooltip>
  );
};

type MetricContentProps = Omit<
  MetricButtonProps,
  "tooltipText" | "onClick" | "status"
>;
interface ContentProps extends MetricContentProps {
  preview?: true;
}

export const MetricContent: React.FC<ContentProps> = ({
  value,
  Icon,
  active,
  hoverTheme,
  preview,
}) => {
  const { border, activeBorder } = HoverStyling[hoverTheme];
  return (
    <>
      <Icon className="stroke-primary h-6 md:stroke-muted-foreground group-hover:stroke-primary" />
      <div
        className={cn(
          "absolute transition-colors rounded-full font-bold w-12 py-1 border-[2px] flex items-center justify-center bg-background",
          `group-${border}`,
          active && `${activeBorder}`,
          preview ? "-bottom-3 text-xs py-[0.125rem] w-10" : "-right-8 -top-2 "
        )}
      >
        {renderMetric(value)}
      </div>
    </>
  );
};

interface CommentMetricButton extends Props {
  value: number;
  hoverTheme: HoverStylingColours;
}

const CommentMetricButton: React.FC<CommentMetricButton> = ({
  commentOnClick,
  commentPanelOpen,
  value,
  hoverTheme,
}) => {
  const { border } = HoverStyling[hoverTheme];
  const { status } = useSession();
  return (
    <MetricButton
      status={status}
      isComment={true}
      onClick={commentOnClick}
      hoverTheme="blue"
      tooltipText="Comment"
    >
      <AnimatePresence mode="wait">
        {commentPanelOpen ? (
          <motion.div
            key={"panel-open-icon"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <ChevronLeftIcon className="h-7 transition-opacity" />
          </motion.div>
        ) : (
          <motion.div
            key={"panel-closed-icon"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <ChatBubbleOvalLeftEllipsisIcon className="stroke-primary h-6 md:stroke-muted-foreground group-hover:stroke-primary" />
            <div
              className={cn(
                "absolute -right-8 -top-2 transition-colors rounded-full font-bold w-12 py-1 border-[2px] flex items-center justify-center bg-background",
                `group-${border}`
              )}
            >
              {renderMetric(value)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MetricButton>
  );
};
