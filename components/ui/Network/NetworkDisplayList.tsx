import {
  ChildNodeProps,
  ClassNameProp,
  UserConnection,
  UserDetails,
  UserNetwork,
} from "@/lib/interface";
import { getUserFriends } from "@/lib/util/networkUtils";
import { cn, GetNameInitials } from "@/lib/util/utils";
import {
  BriefcaseIcon,
  UserMinusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Shared/avatar";
import { UserHoverCard } from "../User/UserHoverCard";
import { NetworkConnectButton } from "./NetworkConnectButton";
import {
  NetworkHiddenInformation,
  UserNetworkTabs,
} from "./UserNetworkConnections";

interface Props {
  network: UserNetwork;
  display: UserNetworkTabs;
  mutuals: UserConnection[];
}

export const NetworkDisplayList: React.FC<Props> = ({
  network,
  display,
  mutuals,
}) => {
  const { data } = useSession();
  const isOwnProfile = data?.user.username === network.user.username;
  const { followers, following } = network;
  const userDisplayList: Record<UserNetworkTabs, UserConnection[]> = {
    followers: network.followers,
    following: network.following,
    mutuals: mutuals,
    friends: getUserFriends(following, followers),
  };

  if (display === "friends" && !isOwnProfile)
    return <NetworkHiddenInformation />;

  if (!userDisplayList[display] || userDisplayList[display].length === 0)
    return <EmptyListDisplay tab={display} />;

  return userDisplayList[display].map((user) => (
    <UserDisplay
      isOwnProfile={isOwnProfile}
      key={user.root.userId}
      user={user}
      tab={display}
    />
  ));
};

interface UserDisplayProps {
  user: UserConnection;
  tab: UserNetworkTabs;
  isOwnProfile: boolean;
}

const TabConnectionTerm: Record<UserNetworkTabs, string> = {
  followers: "Followed",
  following: "Following",
  friends: "Friends",
  mutuals: "Mutual Connections",
};

interface EmptyDisplayListProps {
  tab: UserNetworkTabs;
}

const EmptyListDisplay: FC<EmptyDisplayListProps> = ({ tab }) => {
  return (
    <div className="flex items-center m-4">
      <UserMinusIcon className="w-8 h-8 text-secondary-header" />
      <span className="ml-2 text-secondary-header">No users found</span>
    </div>
  );
};

const UserDisplay: React.FC<UserDisplayProps> = ({
  user,
  tab,
  isOwnProfile,
}) => {
  const { root: details, timestamp, mutual } = user;
  const [connectionDate, setConnectionDate] = React.useState<Date | null>(
    new Date(timestamp)
  );

  return (
    <div className="flex relative pt-4 mt-4 pb-6 border-b items-center">
      <Link href={`/${details.username}`}>
        <Avatar className="w-14 h-14 hover:brightness-75 transition-all">
          <AvatarImage src={details.image} className="object-cover" />
          <AvatarFallback>{GetNameInitials(details.name)}</AvatarFallback>
        </Avatar>
      </Link>
      <div className=" ml-4 flex flex-col justify-center">
        <Link href={`/${details.username}`} className="transition-all group">
          <div className="lg:flex">
            <div className="group-hover:text-tertiary">{details.name}</div>
            <span className="hidden lg:block group-hover:text-tertiary">
              {" • "}
            </span>
            <div className="text-sm lg:text-base text-secondary-header group-hover:text-tertiary">
              @{details.username}
            </div>
          </div>
        </Link>
        <NetworkMetaData display={!!details.job}>
          <BriefcaseIcon className="hidden lg:block  w-4 h-4" />
          <span className="lg:mt-1 lg:ml-2 text-xs ">{details.job}</span>
        </NetworkMetaData>
        <NetworkMetaData display={isOwnProfile} className="hidden lg:flex">
          <UsersIcon className="hidden lg:block w-4 h-4" />
          <span className="lg:ml-2 ">
            {TabConnectionTerm[tab]} since{" "}
            {connectionDate?.toLocaleDateString()}
          </span>
        </NetworkMetaData>
        <MutualConnections mutuals={mutual} user={user} />
      </div>
      <div className="absolute right-4">
        <NetworkConnectButton dateCallback={setConnectionDate} user={details} />
      </div>
    </div>
  );
};

interface MutualConnectionProps {
  user: UserConnection;
  mutuals: UserDetails[];
}

const MutualConnections: FC<MutualConnectionProps> = ({ mutuals, user }) => {
  const { data } = useSession();
  const isUserProfile = data?.user.id === user.root.userId;
  if (!mutuals || mutuals.length === 0 || isUserProfile) return null;

  const { username } = user.root;

  return (
    <div className="flex items-center mt-1">
      <div className="flex -space-x-1 mr-2">
        {mutuals.slice(0, 3).map((mutual) => {
          return (
            <UserHoverCard user={mutual}>
              <Avatar className="w-4 h-4">
                <AvatarImage src={mutual.image} className="object-cover" />
                <AvatarFallback>{GetNameInitials(mutual.name)}</AvatarFallback>
              </Avatar>
            </UserHoverCard>
          );
        })}
      </div>
      <Link
        className="flex text-sm hover:underline text-secondary-header "
        href={`/network/${username}?tab=mutuals`}
      >
        <span className="mr-1">{mutuals.length}</span>
        <span>mutual connection{mutuals.length > 1 ? "s" : ""}</span>
      </Link>
    </div>
  );
};

interface MetadataProps extends ChildNodeProps, ClassNameProp {
  display: boolean;
}

const NetworkMetaData: FC<MetadataProps> = ({
  display,
  children,
  className,
}) => {
  return (
    display && (
      <div
        className={cn(
          "mt-1 flex text-secondary-header items-center text-xs",
          className
        )}
      >
        {children}
      </div>
    )
  );
};
