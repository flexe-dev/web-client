"use client";

import PostCreateDialog from "@/components/creator/PostCreateDialog";
import { ChildNodeProps, LinkProps } from "@/lib/interface";
import {
  CogIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { LogoutIcon } from "../../icons/LogoutIcon";
import { Dialog, DialogTrigger } from "../Shared/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../Shared/dropdown-menu";
interface UserDropdownProps extends ChildNodeProps {
  user?: User;
}

export const UserDropdown = ({ children, user }: UserDropdownProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const links: LinkProps[] = [
    {
      href: `/${user?.username}`,
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
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        {user && (
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
                <DropdownMenuItem asChild key={`dropdown-link-${link.label}`}>
                  <Link
                    href={link.href}
                    className="group cursor-pointer w-full h-full flex space-x-3"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="cursor-pointer flex space-x-3"
                onClick={() => setDialogOpen(true)}
              >
                <PlusCircleIcon className="stroke-secondary-header w-6 h-6" />
                <span>New Post</span>
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer flex space-x-3"
              onClick={() => signOut()}
            >
              <LogoutIcon className="stroke-secondary-header" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      <PostCreateDialog dispatch={setDialogOpen} />
    </Dialog>
  );
};
