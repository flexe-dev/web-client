import { UseLoginModal } from "@/components/context/LoginModalProvider";
import { useUserInteractions } from "@/components/context/UserInteractionsProvider";
import { networkStatusRenderMap } from "@/components/profile/ProfileNetworkButton";
import { UserDetails } from "@/lib/interface";
import { getNetworkStatus } from "@/lib/networkUtils";
import { isAuthenticated } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../button";

interface Props {
  user: UserDetails;
  dateCallback?: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const NetworkConnectButton: React.FC<Props> = ({
  user,
  dateCallback,
}) => {
  const { status, data } = useSession();
  const { followUser, followedByUsers, followingUsers, unfollowUser } =
    useUserInteractions();

  if (data?.user.username === user.username) return null;

  if (!isAuthenticated(status)) return <UnauthorisedButton />;

  const networkStatus = getNetworkStatus(
    user.userId,
    followingUsers,
    followedByUsers
  );

  if (networkStatus === "followed" || networkStatus === "none") {
    return (
      <Button
        onClick={() => {
          followUser(user);
          dateCallback && dateCallback(new Date());
        }}
        variant={"outline"}
        size={"sm"}
      >
        {networkStatusRenderMap[networkStatus]}
      </Button>
    );
  }

  return (
    <Button
      onClick={() => {
        unfollowUser(user.userId);
        dateCallback && dateCallback(null);
      }}
      variant={"outline"}
      size={"sm"}
    >
      {networkStatusRenderMap[networkStatus]}
    </Button>
  );
};

const UnauthorisedButton = () => {
  const { setOpen } = UseLoginModal();

  return (
    <Button onClick={() => setOpen(true)} variant={"outline"} size={"sm"}>
      Follow
    </Button>
  );
};
