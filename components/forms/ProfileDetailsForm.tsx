"use client";

import { updateUser } from "@/controllers/UserController";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/Shared/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Shared/form";
import { Input } from "../ui/Shared/input";
import { Label } from "../ui/Shared/label";

import { UserProfile } from "@/lib/interface";
import { supabase } from "@/lib/supabase";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "sonner";
import { useAccountUser } from "../context/User/AccountUserProvider";
import { Textarea } from "../ui/Shared/textarea";

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
  image: z.string().url().optional(),
  job: z.string(),
  company: z.string(),
  location: z.string(),
  bio: z
    .string()
    .max(200, { message: "Bio must be less than 200 characters." }),
});

export const ProfileDetailsForm = (props: Props) => {
  const { account, setAccount } = useAccountUser();
  const { data } = useSession();
  if (!account) return null;

  const { user, profile } = account;

  if (!profile) return null;

  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarURL, setAvatarURL] = useState<string>(
    user.image ?? process.env.NEXT_PUBLIC_DEFAULT_AVATAR!
  );
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const saveData = async (
      values: z.infer<typeof formSchema>
    ): Promise<boolean> => {
      var imageURL: string | undefined = undefined;
      if (avatarURL !== user.image) {
        imageURL = await uploadPicture();
      }

      const updatedUser: User = {
        ...user,
        name: values.name,
        image: imageURL ?? user.image,
      };

      const updatedProfile: UserProfile = {
        ...profile,
        job: values.job,
        company: values.company,
        location: values.location,
        bio: values.bio,
      };

      const response = await updateUser(
        {
          user: updatedUser,
          profile: updatedProfile,
        },
        data?.token
      );

      setAccount({
        ...account,
        user: updatedUser,
        profile: updatedProfile,
      });

      if (response) {
        props.onSuccess(false);
        return true;
      }
      return false;
    };

    toast.promise(saveData(values), {
      loading: "Saving changes...",
      success: "Changes saved successfully",
      error: "Error saving changes",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      name: user.name ?? "",
      image: user.image ?? process.env.NEXT_PUBLIC_DEFAULT_PHOTO,
      job: profile.job ?? "",
      company: profile.company ?? "",
      location: profile.location ?? "",
      bio: profile.bio ?? "",
    },
  });

  const uploadPicture = async (): Promise<string | undefined> => {
    if (!avatarFile) return;
    const fileExt = avatarFile.name.split(".").pop();
    const filePath = `${user.id}-${Math.random()}.${fileExt}`;
    try {
      let { data, error: uploadError } = await supabase.storage
        .from("user-profile")
        .upload(filePath, avatarFile, {
          upsert: true,
        });

      if (uploadError || !data) {
        throw uploadError;
      }

      //Delete Old Image
      if (user.image) {
        const oldImage = user.image.split("/").pop();
        await supabase.storage.from("user-profile").remove([oldImage!]);
      }

      let { data: URLData } = supabase.storage
        .from("user-profile")
        .getPublicUrl(filePath);

      if (!URLData) {
        throw new Error("Error getting URL");
      }

      form.setValue("image", URLData.publicUrl);
      return URLData.publicUrl;
    } catch (error) {
      toast.error("Error uploading avatar. Please try again.");
    }
  };

  const changeProfilePicture: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = event.target.files[0];
    setAvatarFile(file);
    const reader = new FileReader();

    reader.onload = () => {
      setAvatarURL(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row-reverse w-full "
      >
        <div className="flex px-8 flex-col  items-center">
          <Label htmlFor="image" className="text-sm mt-2 text-secondary-header">
            Profile Picture
          </Label>
          <div className="mt-6 relative group/picture">
            <div className="w-32 md:w-48 aspect-square relative">
              <Image
                alt="User Profile Picture"
                className=" rounded-full"
                src={avatarURL}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <Input
              onChange={changeProfilePicture}
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
        <div className="w-full flex flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
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
                  <Input placeholder="Your job title" {...field} />
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
                  <Input placeholder="Where you work" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex space-x-4  md:flex-row">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="mt-2 w-1/2">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="where you live" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="max-h-[8rem] md:max-h-[12rem]"
                    placeholder="How Do I Centre a Div"
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
