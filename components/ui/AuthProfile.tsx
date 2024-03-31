"use client";

import React from "react";

import { BgTransitionButton } from "./AnimatedButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserAvatar from "./User/UserAvatar";
function AuthProfile() {
  const { data: session } = useSession();
  //todo: Implement User Avatar once Authentication has been implemented
  if (session) {
    return <UserAvatar />;
  }
  return (
    <Link href={"/auth/login"}>
      <BgTransitionButton className="px-10">Join Now</BgTransitionButton>
    </Link>
  );
}

export default AuthProfile;
