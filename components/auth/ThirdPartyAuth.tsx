"use client";

import React from "react";
import { Button } from "../ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { signIn } from "next-auth/react";

function ThirdParty() {
  return (
    <>
      <div className="w-full flex mt-8 h-fit items-center">
        <div className="h-[2px] flex flex-grow bg-foreground rounded-lg"></div>
        <div className="px-4">or continue with</div>
        <div className="h-[2px] flex flex-grow bg-foreground rounded-lg"></div>
      </div>
      <section className="mt-8 space-y-2">
        <Button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          variant={"outline"}
          className="w-full font-semibold"
        >
          <FaGithub className="text-base" />
          <span className="ml-2">GitHub</span>
        </Button>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          variant={"outline"}
          className="w-full font-semibold"
        >
          <FaGoogle className="text-base" />
          <span className="ml-2">Google</span>
        </Button>
      </section>
    </>
  );
}

export default ThirdParty;
