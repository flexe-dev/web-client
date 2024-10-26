import { ChildNodeProps, UserDetails } from "@/lib/interface";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../Shared/hover-card";

interface Props extends ChildNodeProps {
  user: UserDetails;
}

export const UserHoverCard = ({ children, user }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/${user.username}`}>{children}</Link>
      </HoverCardTrigger>
      <HoverCardContent className="m-4">
        User details and whatnot
      </HoverCardContent>
    </HoverCard>
  );
};
