"use client";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ThirdParty from "./ThirdPartyAuth";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    signIn("credentials", { email, password, callbackUrl: "/" });
  };

  useEffect(() => {
    if (!error) return;
    console.log(error);
    switch (error) {
      case "CredentialsSignin":
        console.log("hai");
        setTimeout(
          () =>
            toast.error("Invalid email or password", { position: "top-right" }),
          10
        );
        break;
      case "OAuthAccountNotLinked":
        setTimeout(
          () =>
            toast.error("This email is already being used by another account", {
              position: "top-right",
            }),
          10
        );
        break;
      default:
        setTimeout(
          () =>
            toast.error("An error occurred, please try again", {
              position: "top-right",
            }),
          10
        );
        break;
    }
  }, [error]);

  return (
    <div className="w-full md:w-fit p-8 px-12 z-[10]">
      <h1 className="text-xl lg:text-2xl font-bold">Welcome Back</h1>
      <h2 className=" font-semibold text-neutral-500 dark:text-neutral-400">
        Login into your account
      </h2>

      <form className="w-full md:w-[25rem] mt-6" onSubmit={handleSubmit}>
        <Label className="mt-4">Email</Label>
        <Input
          className="w-full my-2  "
          type="email"
          name="email"
          placeholder="name@example.com"
        />
        <Label className="mt-4">Password</Label>
        <Input
          className="w-full mt-2"
          type="password"
          name="password"
          placeholder="••••••••••"
        />
        <Button type="submit" className="w-full font-semibold  mt-8">
          Log In
        </Button>
      </form>
      <ThirdParty />
      <section className="my-4 text-sm mx-2 text-neutral-700 dark:text-neutral-400">
        <span>Not with us already?</span>
        <Link
          href={"/auth/register"}
          className="underline ml-2 text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
        >
          Sign Up
        </Link>
      </section>
    </div>
  );
}

export default LoginForm;
