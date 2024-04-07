"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { useAccount } from "../../context/AccountProvider";
import { UserDropdown } from "./UserDropdown";

function UserAvatar() {
  const { user, profile } = useAccount();

  if (profile) {
    return (
      <div className="flex items-center">
        <h2 className="mr-4 mt-2 md:hidden">{profile.name}</h2>
        <UserDropdown user={user}>
          <Avatar className="border h-11 w-11 cursor-pointer hover:brightness-75 transition-all  mr-2">
            <AvatarImage className="object-cover" src={profile.image} />
            <AvatarFallback>
              {profile?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </UserDropdown>
      </div>
    );
  }
}

export default UserAvatar;
