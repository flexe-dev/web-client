"use client";

import React from "react";
import { Button } from "./button";
import { Avatar } from "./avatar";
import { BgTransitionButton } from "./AnimatedButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";
function AuthProfile() {
  const { data: session } = useSession();
  //todo: Implement User Avatar once Authentication has been implemented
  if (session) {
    return <UserAvatar />;
  }
  return (
    <BgTransitionButton className="px-10">
      <Link href={"/auth/register"}>Sign Up</Link>
    </BgTransitionButton>
  );
}

export default AuthProfile;
