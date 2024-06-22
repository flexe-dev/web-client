"use client";

import { useAccount } from "../../context/AccountProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { UserDropdown } from "./UserDropdown";

export const GetNameInitials = (name?: string) => {
  if (!name) return "";
  return name
    ?.split(" ")
    .map((n) => n[0])
    .join("");
};

function UserAvatar() {
  const { user, profile } = useAccount();

  if (user) {
    return (
      <div className="flex items-center">
        <h2 className="mr-4 mt-2 md:hidden">{user.name}</h2>
        <UserDropdown user={user}>
          <Avatar className="border h-11 w-11 cursor-pointer hover:brightness-75 transition-all  mr-2">
            <AvatarImage
              className="object-cover"
              src={user.image ?? process.env.NEXT_PUBLIC_FALLBACK_PHOTO}
            />
            <AvatarFallback>{GetNameInitials(user.name ?? "")}</AvatarFallback>
          </Avatar>
        </UserDropdown>
      </div>
    );
  }
}

export default UserAvatar;
