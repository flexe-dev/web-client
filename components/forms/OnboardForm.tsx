"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { UniqueUsernameCheck } from "@/controllers/AuthController";
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

interface Props {
  onSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

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
  const [userUsername, setUserUsername] = useState<string>(user.username);
  const [uniqueUsername, setUniqueUsername] = useState<boolean>(true);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Handle form submission
    // Update User Account Details
  };
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
        <div className="w-full flex flex-col space-y-6 mt-10">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="@dawaad" className="w-5/6" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your unique identifier on the platform.
                </FormDescription>
                <FormMessage>
                  {form.formState.errors.username?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
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

          <Button type="submit" className="w-fit ">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
