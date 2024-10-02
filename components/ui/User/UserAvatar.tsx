"use client";

import { useAccountUser } from "@/components/context/User/AccountUserProvider";
import { GetNameInitials } from "@/lib/util/utils";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { UserDropdown } from "./UserDropdown";

function UserAvatar() {
  const { data } = useSession();
  const { account } = useAccountUser();

  return (
    <div className="flex items-center">
      <h2 className="mr-4 mt-2 md:hidden">{data?.user.name}</h2>
      <UserDropdown user={data?.user}>
        <Avatar className="border h-11 w-11 cursor-pointer hover:brightness-75 transition-all  mr-2">
          <AvatarImage
            className="object-cover"
            //Im sorry
            src={
              account?.user.image ??
              data?.user.image ??
              process.env.NEXT_PUBLIC_FALLBACK_PHOTO
            }
          />
          <AvatarFallback>{GetNameInitials(data?.user.name)}</AvatarFallback>
        </Avatar>
      </UserDropdown>
    </div>
  );
}

export default UserAvatar;
