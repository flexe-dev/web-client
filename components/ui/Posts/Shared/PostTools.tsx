"use client";

import { usePostTools } from "@/components/context/User/PostTools/PostOptionToolProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Shared/dropdown-menu";
import { ChildNodeProps, IconType } from "@/lib/interfaces/componentTypes";
import { Post, PostType } from "@/lib/interfaces/postTypes";
import { copyToClipboard } from "@/lib/util/utils";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChevronDoubleUpIcon,
  ClipboardIcon,
  FlagIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon, ForwardIcon, PinIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface Props extends ChildNodeProps {
  post: Post;
}

type ViewOptions = "creator" | "viewer" | "shared";
type PostOptions = "shared" | PostType;

interface PostOption {
  name?: string;
  icon: IconType;
  action?: () => void;
  requiresAuth?: true;
  view: ViewOptions;
  post: PostOptions;
  component?: React.ReactNode;
}

export const PostTools = ({ children, post }: Props) => {
  const { setTool } = usePostTools();
  const { data } = useSession();
  const URLPath = usePathname();

  const { postType, id } = post;
  const isOwnProfile = data?.user.id === post.auxData.userID;

  const actionOptions: PostOption[] = [
    {
      view: "creator",
      post: "shared",
      icon: PencilIcon,
      component: (
        <Link className="flex" href={`/post/edit/${id}`}>
          <PencilIcon className="w-5 h-5 mr-2" />
          <span>Edit Post</span>
        </Link>
      ),
    },

    {
      name: "Delete Post",
      icon: TrashIcon,

      action: () => setTool("delete"),
      view: "creator",
      post: "shared",
    },
    {
      name: "Report Post",
      icon: FlagIcon,
      requiresAuth: true,
      action: () => setTool("report"),
      view: "viewer",
      post: "shared",
    },
    {
      name: "Archive Post",
      icon: ArrowUpTrayIcon,
      action: () => setTool("archive"),
      view: "creator",
      post: "MEDIA",
    },
    {
      view: "shared",
      name: "Share Post",
      icon: ForwardIcon,
      requiresAuth: true,
      action: () => setTool("share"),
      post: "shared",
    },
    {
      view: "shared",
      post: "shared",
      name: "Copy Link",
      icon: ClipboardIcon,
      action: () => {
        copyToClipboard(URLPath);
        toast.success("Link Copied to Clipboard");
      },
    },
  ];

  const toolOptions: PostOption[] = [
    {
      view: "creator",
      post: "shared",
      icon: ChartBarIcon,
      component: (
        <Link className="flex" href={`/post/insights/${post.id}`}>
          <ChartBarIcon className="w-5 h-5 mr-2" />
          <span>Post Insights</span>
        </Link>
      ),
    },
    {
      view: "creator",
      post: "MEDIA",
      name: "Boost Post",
      icon: ChevronDoubleUpIcon,
      action: () => setTool("boost"),
    },
    {
      name: "Pin Post",
      icon: PinIcon,
      view: "creator",
      post: "MEDIA",
      action: () => setTool("pin"),
    },
  ];

  const canViewAction = (option: PostOption): boolean => {
    if (option.requiresAuth && !data?.user) return false;
    if (option.view === "creator" && !isOwnProfile) return false;
    if (option.view === "viewer" && isOwnProfile) return false;

    return true;
  };

  const relevantPostType = (option: PostOption): boolean => {
    if (option.post === "shared") return true;
    return postType === option.post;
  };

  if (!post?.id) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex"
            key={`post-option-save`}
            onClick={() => {
              toast.success("saved");
            }}
          >
            <BookmarkIcon className="w-5 h-5 mr-2" />
            <span>Save Post</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          {actionOptions.map((option, index) => {
            if (!canViewAction(option) || !relevantPostType(option))
              return null;
            return (
              <DropdownMenuItem
                key={`post-option-${index}`}
                onClick={(e) => {
                  e.stopPropagation();
                  option.action?.();
                }}
              >
                {option.component ?? (
                  <>
                    <option.icon className="w-5 h-5 mr-2" />
                    <span>{option.name}</span>
                  </>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        {isOwnProfile && (
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            {toolOptions.map(
              (option, index) =>
                relevantPostType(option) && (
                  <DropdownMenuItem
                    key={`post-option-${index}`}
                    onClick={option.action}
                  >
                    {option.component ?? (
                      <>
                        <option.icon className="w-5 h-5 mr-2" />
                        <span>{option.name}</span>
                      </>
                    )}
                  </DropdownMenuItem>
                )
            )}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
