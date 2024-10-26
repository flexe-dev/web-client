import { UserInteractionRelationship, UserNetwork } from "@/lib/interface";
import { getUserFriends } from "@/lib/util/networkUtils";
import { GetNameInitials } from "@/lib/util/utils";
import { BriefcaseIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Shared/avatar";
import { NetworkConnectButton } from "./NetworkConnectButton";
import {
  NetworkHiddenInformation,
  UserNetworkTabs,
} from "./UserNetworkConnections";

interface Props {
  network: UserNetwork;
  display: UserNetworkTabs;
}

export const NetworkDisplayList: React.FC<Props> = ({ network, display }) => {
  const { data } = useSession();
  const { followers, following } = network;
  const userDisplayList: Record<
    UserNetworkTabs,
    UserInteractionRelationship[]
  > = {
    followers: network.followers,
    following: network.following,
    friends: getUserFriends(following, followers),
  };

  if (display === "friends" && data?.user.username !== network.username)
    return <NetworkHiddenInformation />;

  return userDisplayList[display].map((user) => (
    <UserDisplay key={user.user.userId} user={user} tab={display} />
  ));
};

interface UserDisplayProps {
  user: UserInteractionRelationship;
  tab: UserNetworkTabs;
}

const TabConnectionTerm: Record<UserNetworkTabs, string> = {
  followers: "Followed",
  following: "Following",
  friends: "Friends",
};

const UserDisplay: React.FC<UserDisplayProps> = ({ user, tab }) => {
  const { user: details, timestamp } = user;
  const [connectionDate, setConnectionDate] = React.useState<Date | null>(
    timestamp
  );

  return (
    <div className="flex relative pt-4 mt-4 pb-6 border-b">
      <Link href={`/${details.username}`}>
        <Avatar className="w-14 h-14 hover:brightness-75 transition-all">
          <AvatarImage src={details.image} className="object-cover" />
          <AvatarFallback>{GetNameInitials(details.name)}</AvatarFallback>
        </Avatar>
      </Link>
      <div className=" ml-4 flex flex-col">
        <Link
          href={`/${details.username}`}
          className="mb-1 transition-all group"
        >
          <span className="group-hover:text-tertiary">{details.name}</span>
          <span className="group-hover:text-tertiary">{" • "}</span>
          <span className="text-secondary-header group-hover:text-tertiary">
            @{details.username}
          </span>
        </Link>
        {details.job && (
          <div className="flex text-secondary-header items-center">
            <BriefcaseIcon className="w-4 h-4" />
            <span className="mt-1 ml-2 text-xs ">{details.job}</span>
          </div>
        )}
        <div className="flex mt-1 text-xs text-secondary-header">
          <UsersIcon className="w-4 h-4" />
          <span className="ml-2 ">
            {TabConnectionTerm[tab]} since{" "}
            {new Date(timestamp).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="absolute right-4">
        <NetworkConnectButton dateCallback={setConnectionDate} user={details} />
      </div>
    </div>
  );
};
