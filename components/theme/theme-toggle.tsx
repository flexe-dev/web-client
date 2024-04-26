"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cva } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ClassNameProp } from "@/lib/interface";

type ModeToggleVariants = "default" | "lg";

const modeToggleVariants: Record<ModeToggleVariants, string> = {
  default: "h-[1.2rem] w-[1.2rem]",
  lg: "h-[2rem] w-[2rem]",
};

interface Props extends ClassNameProp {
  buttonClassName?: string;
  variant: ModeToggleVariants;
}

export function ModeToggle(props: Props) {
  const { setTheme } = useTheme();
  const { className, variant, buttonClassName } = props;
  return (
    <div className={cn(className)}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            size="icon"
            className={cn(buttonClassName)}
          >
            <Sun
              className={cn(
                "rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
                modeToggleVariants[variant]
              )}
            />
            <Moon
              className={cn(
                "absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
                modeToggleVariants[variant]
              )}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[90] mr-2 mt-1">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
