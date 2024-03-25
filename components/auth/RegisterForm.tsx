"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import ThirdParty from "./ThirdPartyAuth";
import Link from "next/link";
import PasswordValidation from "./PasswordValidation";
import { signIn } from "next-auth/react";
import { CreateEmailUser, FindUserByEmail } from "@/controllers/AuthController";
function RegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handlePasswordValidation = () => {
    const length = password.length > 6;
    const number = /\d/.test(password);
    const special = /[!@#$%^&*(),.?":{}|<>]/g.test(password);
    const upper = /[A-Z]/g.test(password);
    const valid = length && number && special && upper;

    return { length, number, special, upper, valid };
  };

  const valid = handlePasswordValidation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email", {});
    }
    if (!password || !valid.valid) {
      return toast.error("Please enter a valid password", {});
    }

    const user = await FindUserByEmail(email);
    if (user) {
      return toast.error("A User with this email already exists", {});
    }
    const response = await CreateEmailUser({ email, password });
    if (!response) {
      return toast.error("An error occurred, please try again", {});
    }

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/onboard",
    });
  };

  return (
    <div className="md:py-8 px-12 z-[10] w-full md:w-fit">
      <h1 className="text-xl lg:text-2xl font-bold">Let{"'"}s Get Started</h1>
      <h2 className=" font-semibold text-neutral-500 dark:text-neutral-400">
        Create a new account
      </h2>

      <form className=" md:w-[25rem] mt-6" onSubmit={handleSubmit}>
        <Label className="mt-4">Email</Label>
        <Input
          className="w-full my-2  "
          type="email"
          name="email"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label className="mt-4">Password</Label>

        <div className="group relative">
          <Input
            className="w-full mt-2"
            type="password"
            name="password"
            placeholder="••••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordValidation validation={valid} />
        </div>

        <Button type="submit" className="w-full font-semibold  mt-8">
          Sign Up
        </Button>
      </form>
      <ThirdParty />
      <section className="my-4 text-sm mx-2 text-neutral-700 dark:text-neutral-400">
        <span>Already have an account?</span>
        <Link
          href={"/auth/login"}
          className="underline ml-2 text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400"
        >
          Sign In
        </Link>
      </section>
    </div>
  );
}

export default RegisterForm;
