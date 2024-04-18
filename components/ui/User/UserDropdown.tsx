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
import { ChildNodeProps, LinkProps } from "@/lib/interface";
interface UserDropdownProps extends ChildNodeProps {
  user: User;
}

export const UserDropdown = ({ children, user }: UserDropdownProps) => {
  const links: LinkProps[] = [
    {
      href: `/${user.username}`,
      label: "Profile",
      icon: <UserCircleIcon className="stroke-secondary-header w-6 h-6" />,
    },
    {
      href: "/",
      label: "Settings",
      icon: <CogIcon className="stroke-secondary-header w-6 h-6" />,
    },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className=" mt-2">
        <DropdownMenuLabel className="flex flex-col items-center text-secondary-header px-4">
          <span>{user.name}</span>
          <span className="text-xs text-tertiary truncate w-fit max-w-32">
            @{user.username}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {links.map((link) => {
          return (
            <DropdownMenuItem key={`dropdown-link-${link.label}`}>
              <Link href={link.href} className="group flex space-x-3">
                {link.icon}
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
