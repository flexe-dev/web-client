import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { User } from "@prisma/client";
import { CogIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { LogoutIcon } from "../../icons/LogoutIcon";
import { signOut } from "next-auth/react";
import Link from "next/link";
interface UserDropdownProps {
  children: React.ReactNode;
  user: User;
}

export const UserDropdown = ({ children, user }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-col items-center text-secondary-header px-4">
          <span>{user.name}</span>
          <span className="text-xs text-tertiary truncate w-fit max-w-32">
            @{user.username}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/profile"}>
          <DropdownMenuItem className="flex space-x-3">
            <UserCircleIcon className="stroke-secondary-header w-6 h-6" />
            <span>Account</span>
          </DropdownMenuItem>
        </Link>
        <Link href={"/settings"}>
          <DropdownMenuItem className="flex space-x-3">
            <CogIcon className="stroke-secondary-header w-6 h-6" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex space-x-3" onClick={() => signOut()}>
          <LogoutIcon className="stroke-secondary-header" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
