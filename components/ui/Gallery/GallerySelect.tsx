import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";

interface SelectProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}
export const GallerySelect = (props: SelectProps) => {
  const { options, selectedOption, setSelectedOption } = props;
  return (
    <Select>
      <SelectLabel>Sort by</SelectLabel>
      <SelectTrigger>
        <SelectValue>Latest</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, key) => (
            <SelectItem
              key={key}
              onClick={() => setSelectedOption(option)}
              value={option}
              className="capitalize"
            >
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
