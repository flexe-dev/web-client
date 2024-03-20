"use client";

import React from "react";
import { Button } from "./button";
import { Avatar } from "./avatar";
import { BgTransitionButton } from "./AnimatedButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
function AuthProfile() {
  const { data: session } = useSession();
  //todo: Implement User Avatar once Authentication has been implemented
  if (session) {
    return (
      <>
        {session.user?.name}
        <Button className="px-10">
          <Link href={"/auth/logout"}>Sign Out</Link>
        </Button>
      </>
    );
  }
  return (
    <BgTransitionButton className="px-10">
      <Link href={"/auth/register"}>Sign Up</Link>
    </BgTransitionButton>
  );
}

export default AuthProfile;
