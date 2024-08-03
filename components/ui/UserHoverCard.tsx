import { ChildNodeProps, UserAccount } from "@/lib/interface";
import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

interface Props extends ChildNodeProps {
  account: UserAccount;
}

export const UserHoverCard = ({ children, account }: Props) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/${account.user.username}`}>{children}</Link>
      </HoverCardTrigger>
      <HoverCardContent className="m-4">
        User details and whatnot
      </HoverCardContent>
    </HoverCard>
  );
};
