import React from "react";
import { Button } from "./button";
import { Avatar } from "./avatar";
import { BgTransitionButton } from "./AnimatedButton";
import Link from "next/link";
function AuthProfile() {
  //todo: Implement User Avatar once Authentication has been implemented
  return (
    <BgTransitionButton className="px-10">
      <Link href={"/auth"}>Sign Up</Link>
    </BgTransitionButton>
  );
}

export default AuthProfile;
