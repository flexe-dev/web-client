"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { undefined, z } from "zod";
import { Button } from "../ui/button";
import { UpdateUserDetails } from "@/controllers/ProfileController";

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
import { useAccount } from "../context/AccountProvider";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

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
  job: z.string(),
  company: z.string(),
  pronouns: z.string(),
  location: z.string(),
});

export const ProfileDetailsForm = (props: Props) => {
  const { user, setUser, profile, setProfile } = useAccount();
  if (!user || !profile) return null;

  const [uploadedAvatars, setUploadedAvatars] = useState<string[]>([
    user.image,
  ]);
  const [avatarURL, setAvatarURL] = useState<string>(user.image);
  const [uploading, setUploading] = useState<boolean>(false);
  const getFilenameFromURL = (url: string) => {
    return url.split("/").pop();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await UpdateUserDetails(
      user.id,
      avatarURL,
      values.name,
      values.job,
      values.company,
      values.pronouns,
      values.location
    );

    // Update User Account Details
    setUser({
      ...user,
      onboarded: true,
      username: values.username,
      name: values.name,
      image: avatarURL,
    });

    setProfile({
      ...profile,
      job: values.job,
      company: values.company,
      pronouns: values.pronouns,
      location: values.location,
    });

    //Remove Previous Avatars from Storage
    await supabase.storage
      .from("user-profile")
      .remove(
        uploadedAvatars
          .filter((url) => url !== avatarURL)
          .map((url) => getFilenameFromURL(url) ?? "")
      );

    if (response) {
      toast.success("Profile Details Successfully Updated", {
        position: "top-right",
      });
      props.onSuccess(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      image: user.image,
      job: profile.job ?? "",
      company: profile.company ?? "",
      pronouns: profile.pronouns ?? "",
      location: profile.location ?? "",
    },
  });

  const uploadProfilePicture: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;
      let { data, error: uploadError } = await supabase.storage
        .from("user-profile")
        .upload(filePath, file);

      if (uploadError || !data) {
        throw uploadError;
      }

      let { data: URLData } = supabase.storage
        .from("user-profile")
        .getPublicUrl(filePath);
      if (!URLData) {
        throw new Error("Error getting URL");
      }

      setAvatarURL(URLData.publicUrl);
      setUploadedAvatars((prev) => [...prev, URLData.publicUrl]);
      toast.success("Avatar uploaded successfully!");
      form.setValue("image", URLData.publicUrl);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

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
          <div className="mt-6 relative group/picture">
            {uploading ? (
              <Skeleton className="w-48 h-48 rounded-full" />
            ) : (
              <div className="w-48 h-48 relative">
                <Image
                  alt="User Profile Picture"
                  className=" rounded-full"
                  src={avatarURL}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            <Input
              onChange={uploadProfilePicture}
              id="picture"
              className="w-full mt-6 absolute hidden"
              accept="image/*"
              type="file"
            />
            <label
              htmlFor="picture"
              className="absolute top-0 w-full  h-full  rounded-full bg-neutral-900/50 dark:bg-neutral-950/70 opacity-0 group-hover/picture:opacity-100 cursor-pointer transition-opacity flex items-center justify-center left-0"
            >
              Upload Picture
            </label>
          </div>
        </div>
        <div className="w-full flex flex-col mt-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    className="md:w-5/6"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Job</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your job title"
                    className="md:w-5/6"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Where you work"
                    className="md:w-5/6"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pronouns"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Pronouns</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your preferred pronouns"
                    className="md:w-5/6"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="where you live"
                    className="md:w-5/6"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className=" md:w-fit mt-8">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
