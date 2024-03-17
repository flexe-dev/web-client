"use client";

import React, { useState } from "react";
import { Input } from "../input";
import { Button } from "../button";
import { toast } from "sonner";
const NewsletterPrompt = () => {
  const [email, setEmail] = useState<string>("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [error, setError] = useState<string>("");
  const addToMailingList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Check If Email Field has an entry or matches regex
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    //todo: Check to see if email already exists in mailing list

    //todo: Add email to mailing list
    setError("");
    toast("Thank you! You have been successfully added to our mailing list");
  };
  return (
    <section className="w-screen  flex justify-center mb-8">
      <div className="w-10/12 lg:w-7/12 border-t border-secondary px-4 py-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Subscribe To Our Newsletter
        </h1>
        <h2 className="mt-2 mb-8 md:text-lg text-secondary-header max-w-screen-md">
          Get some of the best work we can find, software development tips, and
          much more delivered straight to your inbox every week to help improve
          your chances of finding your dream job!
        </h2>

        <form
          onSubmit={(e) => addToMailingList(e)}
          className="flex flex-col items-center md:items-start md:flex-row md:space-x-4 w-full md:w-3/4"
        >
          <div className="w-full">
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={`h-12 transition-colors ${
                error && !emailRegex.test(email)
                  ? "border-red-500 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-red-500 focus-visible:border-red-500"
                  : ""
              }`}
              placeholder="Your Email Address"
            />
            <div
              className={`mt-2 h-4 transition-opacity text-red-500 ${
                error && !emailRegex.test(email) ? "opacity-100 " : "opacity-0"
              }`}
            >
              {error}
            </div>
          </div>
          <Button className="mt-4 md:my-0 w-1/2 md:w-max h-12" type="submit">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterPrompt;
