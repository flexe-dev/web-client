"use client";

import {
  DefaultProfile,
  FindUserByUsername,
  OnboardUser,
} from "@/controllers/UserController";
import { UserProfile } from "@/lib/interfaces/userTypes";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/util/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAccountUser } from "../context/User/AccountUserProvider";
import { Button } from "../ui/Shared/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Shared/form";
import { Input } from "../ui/Shared/input";
import { Label } from "../ui/Shared/label";

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
  image: z.string().url(),
});

export const OnboardForm = (props: Props) => {
  const { account, setAccount } = useAccountUser();
  const { data, update } = useSession();

  if (!account) return null;
  const { user } = account;

  const [usernameValid, setUsernameValid] =
    useState<UsernameStatus>("checking");

  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarURL, setAvatarURL] = useState<string>(
    user.image ?? process.env.NEXT_PUBLIC_DEFAULT_PHOTO
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const saveData = async (
      values: z.infer<typeof formSchema>
    ): Promise<boolean> => {
      const imageURL = await uploadPicture();

      if (usernameValid !== "available" || !imageURL) return false;

      const updatedUser: User = {
        ...user,
        username: values.username,
        name: values.name,
        image: imageURL,
        onboarded: true,
      };

      const newProfile: UserProfile = {
        ...DefaultProfile,
        userId: user.id,
        //More Shit when I expand user profile in the future
      };

      //Update User Objects
      const response = await OnboardUser(
        {
          user: updatedUser,
          profile: newProfile,
        },
        data?.token
      );

      if (!response) return false;

      setAccount({
        user: response.user,
        profile: response.profile,
      });

      update();
      props.onSuccess(true);
      return true;
    };

    toast.promise(saveData(values), {
      loading: "Saving your profile...",
      success: "Profile saved successfully",
      error: "Error saving profile",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: user.name ?? "",
      image: user.image ?? process.env.NEXT_PUBLIC_DEFAULT_PHOTO,
    },
  });

  const uploadPicture = async (): Promise<string | undefined> => {
    if (!avatarFile) return avatarURL;

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

  const checkUsername = async (username: string) => {
    if (username.length < 2) return;
    const isTaken = await FindUserByUsername(username);
    // If a user object returns, this indicates that the username is taken
    setUsernameValid(isTaken ? "taken" : "available");
  };
  const debounceFn = useCallback(debounce(checkUsername, 500), []);

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
        <div className="flex pr-8 flex-col  items-center">
          <Label htmlFor="image" className="text-sm mt-2 text-secondary-header">
            Profile Picture
          </Label>
          <div className="mt-6 relative group/picture">
            <div className="w-48 h-48 relative">
              <Image
                alt="User Profile Picture"
                className=" rounded-full"
                src={avatarURL}
                fill
                style={{
                  objectFit: "cover",
                }}
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
        <div className="w-full flex flex-col mt-10">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="@your_username"
                    className={cn(
                      `md:w-5/6 transition-colors`,
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
                <FormDescription className="w-full md:w-5/6 lg:w-full">
                  This will be your unique identifier on the platform.
                </FormDescription>
                <FormMessage>
                  <span
                    className={`transition-opacity ${
                      usernameValid === "taken" ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Username is already taken
                  </span>
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
                    placeholder="Your full name"
                    className="md:w-5/6"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
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
