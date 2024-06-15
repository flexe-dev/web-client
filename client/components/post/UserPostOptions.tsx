import { ChildNodeProps, UserPost } from "@/lib/interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props extends ChildNodeProps {
  post: UserPost;
}

const UserPostOptions = ({ children, post }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Metrics</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Post Insights</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Post Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit Post</DropdownMenuItem>
          <DropdownMenuItem>Archive Post</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>Delete Post</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserPostOptions;
