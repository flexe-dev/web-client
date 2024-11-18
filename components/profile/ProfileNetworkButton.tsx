"use client";

import { NetworkStatus, UserDetails } from "@/lib/interfaces/userTypes";
import {
  generateUserDetailNode,
  getNetworkStatus,
} from "@/lib/util/networkUtils";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { UseLoginModal } from "../context/User/LoginModalHandler/LoginModalProvider";
import { useProfileUserViewer } from "../context/UserInteraction/ProfileViewUserProvider";
import { useUserInteractions } from "../context/UserInteraction/UserInteractionsProvider";
import { Button } from "../ui/Shared/button";
import { Dialog } from "../ui/Shared/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/Shared/dropdown-menu";
import { Skeleton } from "../ui/Shared/skeleton";

export const networkStatusRenderMap: Record<NetworkStatus, string> = {
  friends: "Friends",
  following: "Following",
  followed: "Follow Back",
  none: "Follow",
};

export const ProfileNetworkButton = () => {
  const { status } = useSession();
  const {
    userNode,
    followingUsers,
    followedByUsers,
    followUser,
    unfollowUser,
  } = useUserInteractions();

  const { fetchedUser, setFetchedUser } = useProfileUserViewer();

  if (status === "unauthenticated") {
    return <UnauthorizedProfileNetworkButton />;
  }

  if (!fetchedUser || !userNode)
    return <Skeleton className="h-10 px-4 py-2 w-16 mt-2" />;

  const networkStatus: NetworkStatus = getNetworkStatus(
    fetchedUser.user.id,
    followingUsers,
    followedByUsers
  );

  const handleFollow = () => {
    if (!fetchedUser.profile) return;
    const user: UserDetails = generateUserDetailNode(fetchedUser);
    followUser(user);
    setFetchedUser({
      ...fetchedUser,
      profile: {
        ...fetchedUser.profile,
        followers: fetchedUser.profile.followers + 1,
      },
    });
  };

  const handleUnfollow = () => {
    if (!fetchedUser.profile) return;

    unfollowUser(fetchedUser.user.id);
    setFetchedUser({
      ...fetchedUser,
      profile: {
        ...fetchedUser.profile,
        followers: fetchedUser.profile.followers - 1,
      },
    });
  };

  if (networkStatus === "none" || networkStatus === "followed") {
    return (
      <Button variant={"outline"} onClick={handleFollow}>
        {networkStatusRenderMap[networkStatus]}
      </Button>
    );
  }

  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"secondary"}
            className="flex relative items-center justify-start w-28"
          >
            {networkStatusRenderMap[networkStatus]}
            <ChevronDownIcon className="absolute right-2 w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleUnfollow}>Unfollow</DropdownMenuItem>
          <DropdownMenuItem>Block</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};

const UnauthorizedProfileNetworkButton = () => {
const { setOpen } = UseLoginModal();
  return (
    <Button onClick={() => setOpen(true)} variant={"outline"}>
      Follow
    </Button>
  );
};
