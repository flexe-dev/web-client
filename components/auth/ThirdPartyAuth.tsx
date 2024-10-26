"use client";

import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/Shared/button";

import { ClassNameProp } from "@/lib/interface";
import { cn } from "@/lib/util/utils";
import { signIn } from "next-auth/react";

interface ThirdPartyProps extends ClassNameProp {
  iconClass?: string;
  text?: string;
  callback?: string;
}

const ThirdParty: React.FC<ThirdPartyProps> = ({
  className,
  iconClass,
  text,
  callback,
}) => {
  return (
    <>
      <div className={cn("w-full flex h-fit items-center", className)}>
        <div className="h-[2px] flex flex-grow bg-foreground rounded-lg"></div>
        <div className="px-4">
          {"Or"} {!text && " continue with"}
        </div>
        <div className="h-[2px] flex flex-grow bg-foreground rounded-lg"></div>
      </div>
      <section className=" space-y-2">
        <Button
          onClick={() => signIn("github", { callbackUrl: callback ?? "/" })}
          variant={"outline"}
          className="w-full font-semibold relative"
        >
          <FaGithub className={cn("text-base", iconClass)} />
          <span className="ml-2">{text} GitHub</span>
        </Button>
        <Button
          onClick={() => signIn("google", { callbackUrl: callback ?? "/" })}
          variant={"outline"}
          className="w-full font-semibold relative"
        >
          <FaGoogle className={cn("text-base", iconClass)} />
          <span className="ml-2">{text} Google</span>
        </Button>
      </section>
    </>
  );
};

export default ThirdParty;
