"use client";

import { UserNetwork } from "@/lib/interface";
import { cn } from "@/lib/util/utils";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "../button";
import { NetworkDisplayList } from "./NetworkDisplayList";

interface Props {
  network: UserNetwork;
}

interface TabProps extends Props {
  showFriends: boolean;
}

export const networkTabs = [
  "followers",
  "following",
  "friends",
  "groups",
] as const;
export type NetworkTabs = (typeof networkTabs)[number];
export type UserNetworkTabs = Exclude<NetworkTabs, "groups">;

export const UserNetworkConnections: React.FC<Props> = ({ network }) => {
  const { data } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as NetworkTabs | null;

  useEffect(() => {
    if (!tab || !networkTabs.includes(tab)) {
      router.replace(`/network/${network.username}?tab=followers`);
    }
  }, [tab, router, network.username]);

  return (
    <div className="flex flex-col w-full px-8 py-4">
      <UserNetworkTabHeader
        showFriends={data?.user.username === network.username}
        network={network}
      />
      {tab === "groups" ? (
        <UserGroups />
      ) : (
        <NetworkDisplayList network={network} display={tab!} />
      )}
    </div>
  );
};

export const UserNetworkTabHeader: React.FC<TabProps> = ({
  showFriends,
  network,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") as NetworkTabs | null;

  return (
    <div className="flex justify-center w-full h-fit sticky top-[5rem] bg-background">
      {networkTabs
        .filter((tab) => showFriends || tab !== "friends")
        .map((tab) => (
          <Button
            asChild
            onClick={() =>
              window.history.pushState(
                null,
                "",
                `/network/${network.username}?tab=${tab}`
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
  return <></>;
};

export const UserGroups = () => {
  return <></>;
};
