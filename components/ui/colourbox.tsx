"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Colour, ColourType, colours } from "@/lib/colours";
import { ScrollArea } from "./scroll-area";

export function ColourBox() {
  const [open, setOpen] = React.useState(false);
  const [colourSection, setColourSection] = React.useState<
    ColourType | undefined
  >();
  const [colourValue, setColourValue] = React.useState<Colour | undefined>();
  const handleValueChange = (section: ColourType, name: string) => {
    setColourSection(section);
    setColourValue(colours[section].find((colour) => colour.name === name));
    setOpen(false);
  };

  const nameToTitle = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" - ");
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
          {colourValue ? (
            <div className="flex space-x-1 items-center">
              <div
                className="w-5 h-5 m-1 rounded-md"
                style={{ backgroundColor: colourValue.code }}
              />
              <h3>{nameToTitle(colourValue.name)}</h3>
            </div>
          ) : (
            "Select a colour"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 z-[90] w-[220px] mt-4">
        <Command>
          <CommandInput className="" placeholder="Search Colour..." />
          <CommandEmpty>No Colour Found.</CommandEmpty>
          <CommandGroup className="divide-y">
            <CommandList>
              <ScrollArea className="h-[220px] overscroll-none">
                {Object.keys(colours)?.map((section, index) => {
                  return (
                    <React.Fragment key={section}>
                      {index !== 0 && <CommandSeparator />}
                      <div className="flex justify-center flex-nowrap py-1">
                        {colours[section as ColourType]?.map((colour) => {
                          return (
                            <CommandItem
                              key={`${colour.name}-${colour.code}`}
                              value={colour.name}
                              onSelect={(currentValue) =>
                                handleValueChange(
                                  section as ColourType,
                                  currentValue
                                )
                              }
                              style={{ backgroundColor: colour.code }}
                              className={cn(
                                "w-6 h-6 m-1 rounded-md hover:ring-2 hover:ring-primary",
                                colourValue?.name === colour.name &&
                                  "ring-2 ring-primary"
                              )}
                            ></CommandItem>
                          );
                        })}
                      </div>
                    </React.Fragment>
                  );
                })}
              </ScrollArea>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
