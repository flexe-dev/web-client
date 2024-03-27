"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
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
  image: z.string().url(),
});

export const OnboardForm = () => {
  const session = useSession();
  const user = session.data?.user;
  if (!user) return null;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Handle form submission
    // Update User Account Details
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: user.name ?? "",
      image: user.image ?? "",
    },
  });
};
