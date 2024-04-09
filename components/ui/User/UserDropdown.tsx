import React from "react";
import Link from "next/link";
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
import { LinkProps } from "@/lib/interface";
interface UserDropdownProps {
  children: React.ReactNode;
  user: User;
}

const links: LinkProps[] = [
  {
    href: "/profile",
    label: "Profile",
    icon: <UserCircleIcon className="stroke-secondary-header w-6 h-6" />,
  },
  {
    href: "/",
    label: "Settings",
    icon: <CogIcon className="stroke-secondary-header w-6 h-6" />,
  },
];

export const UserDropdown = ({ children, user }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="z-[90] mt-2">
        <DropdownMenuLabel className="flex flex-col items-center text-secondary-header px-4">
          <span>{user.name}</span>
          <span className="text-xs text-tertiary truncate w-fit max-w-32">
            @{user.username}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {links.map((link) => {
          return (
            <DropdownMenuItem className="flex space-x-3">
              {link.icon}
              <Link
                key={`dropdown-link${link.label}`}
                href={link.href}
                className="group "
              >
                <span>{link.label}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex space-x-3" onClick={() => signOut()}>
          <LogoutIcon className="stroke-secondary-header" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
