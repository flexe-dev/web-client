import React from "react";

import { Button } from "../ui/button";
import { FaGithub, FaGitlab } from "react-icons/fa";
function ThirdParty() {
  return (
    <>
      <div className="w-full flex mt-8 h-fit items-center">
        <div className="h-[2px] flex flex-grow bg-foreground rounded-lg"></div>
        <div className="px-4">or continue with</div>
        <div className="h-[2px] flex flex-grow bg-foreground rounded-lg"></div>
      </div>
      <section className="mt-8 space-y-2">
        <Button variant={"outline"} className="w-full font-semibold">
          <FaGithub className="text-base" />
          <span className="ml-2">GitHub</span>
        </Button>
        <Button variant={"outline"} className="w-full font-semibold">
          <FaGitlab className="text-base" />
          <span className="ml-2">GitLab</span>
        </Button>
      </section>
    </>
  );
}

export default ThirdParty;
