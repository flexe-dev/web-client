"use client";

import React, { useState, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { omit } from "lodash";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Colour, ColourType, colours } from "@/lib/colours";
import { ScrollArea } from "./scroll-area";
import { PostContentBlock } from "@/lib/interface";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Separator } from "./separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { useTheme } from "next-themes";
import { useDocumentCreator } from "../context/DocumentCreatorProvider";
interface Props {
  content: PostContentBlock;
}
export function ColourBox({ content }: Props) {
  const [open, setOpen] = useState(false);
  const { onStyleChange } = useDocumentCreator();
  const [colourValue, setColourValue] = useState<Colour | undefined>();
  const [search, setSearch] = useState<string>("");
  const theme = useTheme();

  const handleValueChange = (section: ColourType, code: string) => {
    setColourValue(colours[section].find((colour) => colour.code === code));
    onStyleChange(content.id, { ...content.style, color: code });
    setOpen(false);
  };

  useEffect(() => {
    //Retrieving the current colour of the content
    const currentColour = content.style?.color;
    if (!currentColour) return;
    Object.values(colours).forEach((section) => {
      const colour = section.find((colour) => colour.code === currentColour);
      if (colour) {
        setColourValue(colour);
      }
    });
  }, [content]);

  const clearSelectedColour = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setColourValue(undefined);
    const ommitedStyle = omit(content.style, "color");
    onStyleChange(content.id, ommitedStyle);
  };

  const toTitleCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const isLike = (search: string, values?: string[]): string[] => {
    if (!values || values.length === 0) return [];
    if (!search) return values;
    return values.filter((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    );
  };

  const getDefaultTheme = () => {
    return theme.resolvedTheme === "dark" ? "#e5e5e5" : "#171717";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          <>
            <Button
              onClick={(e) => clearSelectedColour(e)}
              variant={"ghost"}
              size={"icon"}
              disabled={!colourValue}
              className="w-5 h-5 hover:ring-2 hover:ring-primary transition-all"
            >
              <XMarkIcon
                className={cn("w-4 h-4", !colourValue && "stroke-muted")}
              />
            </Button>
            <ColourCodePreview code={colourValue?.code ?? getDefaultTheme()} />
          </>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 z-[90] w-[220px] mt-4">
        <Command>
          <CommandInput
            className=""
            onValueChange={(e) => setSearch(e)}
            placeholder="Search Colour..."
          />
          <CommandEmpty>No Colour Found.</CommandEmpty>
          <CommandGroup className="divide-y">
            <CommandList className="py-1">
              <ScrollArea className="h-[220px] overscroll-contain">
                <TooltipProvider>
                  {isLike(search, Object.keys(colours)).map(
                    (section, index) => {
                      return (
                        <React.Fragment key={section}>
                          {index !== 0 && <Separator />}
                          <h4 className="ml-2">{toTitleCase(section)}</h4>
                          <div className="flex justify-center flex-nowrap pb-1">
                            {colours[section as ColourType]?.map((colour) => {
                              return (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <CommandItem
                                      key={`${colour.name}-${colour.code}`}
                                      value={colour.code}
                                      onSelect={(currentValue) =>
                                        handleValueChange(
                                          section as ColourType,
                                          currentValue
                                        )
                                      }
                                      style={{ backgroundColor: colour.code }}
                                      className={cn(
                                        "w-6 h-6 m-1 rounded-md hover:ring-2 hover:ring-primary",
                                        colourValue?.code === colour.code &&
                                          "ring-2 ring-primary"
                                      )}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="z-[100]">
                                    {colour.code}
                                  </TooltipContent>
                                </Tooltip>
                              );
                            })}
                          </div>
                        </React.Fragment>
                      );
                    }
                  )}
                </TooltipProvider>
              </ScrollArea>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface PreviewProps {
  code: string;
}

const ColourCodePreview = ({ code }: PreviewProps) => {
  return (
    <>
      <div
        className="w-5 h-5 m-1 rounded-md"
        style={{ backgroundColor: code }}
      />
      <h3>{code}</h3>
    </>
  );
};
