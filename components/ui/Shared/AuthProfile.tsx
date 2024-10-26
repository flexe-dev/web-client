"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import UserAvatar from "../User/UserAvatar";
import { BgTransitionButton } from "./AnimatedButton";
function AuthProfile() {
  const { data: session } = useSession();
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
