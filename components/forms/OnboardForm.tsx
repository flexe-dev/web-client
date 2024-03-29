"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { FormEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { UniqueUsernameCheck } from "@/controllers/AuthController";
import { debounce } from "lodash";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface Props {
  onSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

type UsernameStatus = "checking" | "available" | "taken";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  image: z.instanceof(File).optional(),
});

export const OnboardForm = (props: Props) => {
  const session = useSession();
  const user = session.data?.user;
  if (!user) return null;

  const [usernameValid, setUsernameValid] =
    useState<UsernameStatus>("checking");
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Handle form submission
    // Update User Account Details
  };

  const checkUsername = async (username: string) => {
    if (username.length < 2) return;
    const isTaken = await UniqueUsernameCheck(username);
    setUsernameValid(isTaken ? "taken" : "available");
  };
  const debounceFn = useCallback(debounce(checkUsername, 500), []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: user.name ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row-reverse w-full "
      >
        <div className="flex pr-8 flex-col  items-center">
          <Label htmlFor="image" className="text-sm mt-2 text-secondary-header">
            Profile Picture
          </Label>
          {/* //todo: replace with Image Component */}
          <div className="mt-6 relative group/picture">
            <div className="w-48 h-48  rounded-full bg-white"></div>
            <Input
              id="picture"
              className="w-full mt-6 h-0 hidden"
              type="file"
            />
            <label
              htmlFor="picture"
              className="absolute top-0 w-full h-full bg-background/90 opacity-0 group-hover/picture:opacity-100 cursor-pointer transition-opacity flex items-center justify-center left-0"
            >
              Upload Picture
            </label>
          </div>
        </div>
        <div className="w-full flex flex-col mt-10">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="@dawaad"
                    className={cn(
                      `w-5/6 transition-colors`,
                      usernameValid === "taken" &&
                        "border-red-500 focus-visible:ring-red-500 focus-visible:ring-offset-red-500",
                      usernameValid === "available" &&
                        "border-emerald-500 focus-visible:ring-emerald-500 focus-visible:ring-offset-emerald-500"
                    )}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setUsernameValid("checking");
                      debounceFn(e.target.value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This will be your unique identifier on the platform.
                </FormDescription>
                <FormMessage>
                  <p
                    className={`transition-opacity ${
                      usernameValid === "taken" ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Username is already taken
                  </p>
                  {form.formState.errors.username?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Stevens"
                    className="w-5/6"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-fit mt-8">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
