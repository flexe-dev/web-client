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
import { signOut, useSession } from "next-auth/react";
import { LogoutIcon } from "../icons/LogoutIcon";

function UserAvatar() {
  const { data: session } = useSession();

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="border cursor-pointer hover:brightness-75 transition-all">
            <AvatarImage src={session.user?.image ?? ""} />
            <AvatarFallback>
              {session.user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuLabel className="text-secondary-header px-4">
            {session.user.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex space-x-4"
            onClick={() => signOut()}
          >
            <LogoutIcon className="stroke-secondary-header"/>
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}

export default UserAvatar;
