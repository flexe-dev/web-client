"use client";

import { useUserInteractions } from "@/components/context/UserInteractionsProvider";
import { IconType } from "@/lib/interface";
import { getUserFriends } from "@/lib/networkUtils";
import { cn, isAuthenticated } from "@/lib/utils";
import {
  ChatBubbleLeftEllipsisIcon,
  CodeBracketIcon,
  EyeIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export const NetworkSidebar = () => {
  const { status } = useSession();

  return (
    <aside className="w-5/6 md:w-1/3 lg:w-1/4 md:h-screen-without-header md:sticky top-[5rem] pt-6 md:py-12 px-6 lg:px-8 mx-auto md:ml-6">
      {isAuthenticated(status) ? (
        <UserNetworkContent />
      ) : (
        <UnauthorizedNetworkSidebar />
      )}
    </aside>
  );
};

export const UnauthorizedNetworkSidebar = () => {
  return <></>;
};

interface UserNetworkContent {
  title: string;
  icon: IconType;
  link: string;
  value: number;
  tab?: string;
}

export const UserNetworkContent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const tab = searchParams.get("tab");
  const { data } = useSession();
  const { followedByUsers, followingUsers } = useUserInteractions();

  if (!data) return;
  const { user } = data;

  const [_1, _2, username] = pathname.split("/");
  const isUser = user.username === username;

  const NetworkContent: UserNetworkContent[] = [
    {
      title: "Followers",
      icon: UserIcon,
      link: `/network/${user.username}?tab=followers`,
      value: followedByUsers.length,
      tab: "followers",
    },
    {
      title: "Following",
      icon: EyeIcon,
      link: `/network/${user.username}?tab=following`,
      value: followingUsers.length,
      tab: "following",
    },
    {
      title: "Friends",
      icon: UserGroupIcon,
      link: `/network/${user.username}/?tab=friends`,
      value: getUserFriends(followingUsers, followedByUsers).length,
      tab: "friends",
    },
    {
      title: "Groups",
      icon: CodeBracketIcon,
      link: `/network/${user.username}/?tab=groups`,
      value: 2,
      tab: "groups",
    },
    {
      title: "Messages",
      icon: ChatBubbleLeftEllipsisIcon,
      link: "/",
      value: 3,
    },
  ];

  return (
    <div className="w-full border-2 rounded-md pt-4 px-4">
      <div className=" pl-1 pb-2">
        <h1 className="font-bold text-xl">My Network</h1>
      </div>
      <section className="flex flex-col group">
        {NetworkContent.map((content, index) => (
          <Link
            href={content.link}
            key={index}
            className={cn(
              "flex items-center py-3 first:border-t-2 relative group-hover:text-tertiary hover:group-hover:text-primary border-t"
            )}
          >
            <content.icon
              className={cn(
                "w-6 h-6 mr-4 transition-all",
                content.tab === tab && isUser && "stroke-2"
              )}
            />

            <h2
              className={cn(
                "font-semibold text-secondary-header group-hover:text-inherit transition-all mr-6",
                content.tab === tab && isUser && "text-primary font-bold"
              )}
            >
              {content.title}
            </h2>
            <div
              className={cn(
                "absolute right-2 transition-all",
                content.tab === tab && isUser && "font-bold "
              )}
            >
              {content.value}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};
