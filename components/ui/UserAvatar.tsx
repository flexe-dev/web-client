"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { signOut } from "next-auth/react";
import { LogoutIcon } from "../icons/LogoutIcon";
import { useAccount } from "../context/AccountProvider";

function UserAvatar() {
  const { user } = useAccount();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="border cursor-pointer hover:brightness-75 transition-all">
            <AvatarImage className="object-cover" src={user.image ?? ""} />
            <AvatarFallback>
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuLabel className="text-secondary-header px-4">
            {user.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex space-x-4"
            onClick={() => signOut()}
          >
            <LogoutIcon className="stroke-secondary-header" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}

export default UserAvatar;
