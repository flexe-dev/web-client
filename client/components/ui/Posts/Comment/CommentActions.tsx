import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "../../button";
import { DropdownMenu, DropdownMenuTrigger } from "../../dropdown-menu";

export const CommentActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="absolute right-2 w-8 h-8"
        >
          <EllipsisHorizontalIcon className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
