import { ChildNodeProps, IconType, UserPost } from "@/lib/interface";
import {
  ChartBarIcon,
  ChevronDoubleUpIcon,
  ClipboardIcon,
  FlagIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import { PinIcon } from "lucide-react";
import { useProfileViewer } from "@/components/context/UserProfileProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props extends ChildNodeProps {
  post: UserPost;
}

interface PostOption {
  name: string;
  icon: IconType;
  action: () => void;
  creatorOnly?: true | undefined;
  viewerOnly?: true | undefined;
}

const actionOptions: PostOption[] = [
  {
    name: "Edit Post",
    icon: PencilIcon,
    action: () => console.log("Edit Post"),
    creatorOnly: true,
  },
  {
    name: "Delete Post",
    icon: TrashIcon,
    action: () => console.log("Delete Post"),
    creatorOnly: true,
  },
  {
    name: "View Post",
    icon: ViewfinderCircleIcon,
    action: () => console.log("View Full Post"),
  },
  {
    name: "Report Post",
    icon: FlagIcon,
    action: () => console.log("Report Post"),
    viewerOnly: true,
  },
  {
    name: "Share Post",
    icon: ShareIcon,
    action: () => console.log("Share Post"),
  },
  {
    name: "Copy Link",
    icon: ClipboardIcon,
    action: () => console.log("Copy Link"),
  },
];

const toolOptions: PostOption[] = [
  {
    name: "Post Insights",
    icon: ChartBarIcon,
    action: () => console.log("Post Insights"),
  },
  {
    name: "Boost Post",
    icon: ChevronDoubleUpIcon,
    action: () => console.log("Boost Post"),
  },
  {
    name: "Pin Post",
    icon: PinIcon,
    action: () => console.log("Pin Post"),
  },
];

const UserPostOptions = ({ children, post }: Props) => {
  const { isOwnProfile } = useProfileViewer();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionOptions.map((option, index) => {
            if (
              (option.creatorOnly && !isOwnProfile) ||
              (option.viewerOnly && isOwnProfile)
            ) {
              return null;
            }
            return (
              <DropdownMenuItem
                key={`post-option-${index}`}
                onClick={option.action}
              >
                <option.icon className="w-5 h-5 mr-2" />
                <span>{option.name}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        {isOwnProfile && (
          <DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Tools</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {toolOptions.map((option, index) => (
              <DropdownMenuItem
                key={`post-option-${index}`}
                onClick={option.action}
              >
                <option.icon className="w-5 h-5 mr-2" />
                <span>{option.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserPostOptions;
