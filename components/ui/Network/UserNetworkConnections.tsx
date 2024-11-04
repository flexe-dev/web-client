"use client";

import { useUserInteractions } from "@/components/context/UserInteraction/UserInteractionsProvider";
import { UserNetwork } from "@/lib/interface";
import { getMutualConnections } from "@/lib/util/networkUtils";
import { cn } from "@/lib/util/utils";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "../Shared/button";
import { NetworkDisplayList } from "./NetworkDisplayList";

interface Props {
  network: UserNetwork;
}

interface NetworkTabProps extends Props {
  visibleTabs: NetworkTabs[];
}

export const networkTabs = [
  "followers",
  "following",
  "friends",
  "mutuals",
  "groups",
] as const;
export type NetworkTabs = (typeof networkTabs)[number];
export type UserNetworkTabs = Exclude<NetworkTabs, "groups">;

export const UserNetworkConnections: React.FC<Props> = ({ network }) => {
  const { data } = useSession();
  const { followingUsers } = useUserInteractions();
  const mutualConnections = getMutualConnections(
    followingUsers,
    network.followers
  );

  const isUser = data?.user?.id === network.user.userId;
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as NetworkTabs | null;
  const { username } = network.user;

  //Handle Conditional Tab Logic
  const visibleTabs = networkTabs.filter((tab) => {
    if (tab === "mutuals") return !isUser && mutualConnections.length > 0;
    if (tab === "friends") return isUser;
    return true;
  });

  useEffect(() => {
    if (!tab || !networkTabs.includes(tab)) {
      router.replace(`/network/${username}?tab=followers`);
    }
  }, [tab, router, username]);

  if (!tab) return null;

  return (
    <div className="flex flex-col w-full px-8 py-4">
      <UserNetworkTabHeader visibleTabs={visibleTabs} network={network} />
      {tab === "groups" ? (
        <UserGroups />
      ) : (
        <NetworkDisplayList
          mutuals={mutualConnections}
          network={network}
          display={tab!}
        />
      )}
    </div>
  );
};

export const UserNetworkTabHeader: React.FC<NetworkTabProps> = ({
  network,
  visibleTabs,
}) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") as NetworkTabs | null;

  return (
    <div className="flex justify-center w-full h-fit sticky top-[5rem] bg-background">
      {visibleTabs.map((tab) => (
        <Button
          asChild
          onClick={() =>
            window.history.pushState(
              null,
              "",
              `/network/${network.user.username}?tab=${tab}`
            )
          }
          key={`network-tab-${tab}`}
          variant={"link"}
          className={cn(
            "w-full py-2 rounded-none border-b-2 hover:no-underline",
            activeTab === tab && "border-b-primary"
          )}
        >
          <div className="capitalize">{tab}</div>
        </Button>
      ))}
    </div>
  );
};

export const NetworkHiddenInformation = () => {
  return <>This is hidden information lmao</>;
};

export const UserGroups = () => {
  return <></>;
};
