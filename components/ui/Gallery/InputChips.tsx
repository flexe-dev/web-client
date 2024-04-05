import React, { FormEvent, useState } from "react";
import { Label } from "../label";
import { ShadCNInputStyling } from "../input";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";

interface InputChipsProps {
  setContent: React.Dispatch<React.SetStateAction<Chip[]>>;
  content: Chip[];
  title: string;
  className?: string;
  sectionID: string;
}

export interface Chip {
  value: string;
  id: string;
}

interface ChipComponentProps {
  chip: Chip;
  onDelete: (id: string) => void;
  sectionID: string;
}

export const InputChips = (props: InputChipsProps) => {
  const { setContent, content, title, className, sectionID } = props;
  const [inputValue, setInputValue] = useState<string>("");

  const handleOnRemove = (chipID: string) => {
    setContent((prev) => prev.filter((chip) => chip.id !== chipID));
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newChip = {
      value: inputValue,
      id: nanoid(),
    };
    setContent((prev) => [...prev, newChip]);
    setInputValue("");
  };

  return (
    <form
      onSubmit={(e) => handleOnSubmit(e)}
      className={cn("flex flex-col", className)}
    >
      <AnimatePresence mode="popLayout">
        <motion.h2
          layout
          key={`${sectionID}-label`}
          className="font-semibold text-lg mb-2"
        >
          {title}
        </motion.h2>
        {content.length > 0 && (
          <motion.section
            key={`${sectionID}-chips`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="chips"
            className="flex flex-wrap mb-4 mt-2 py-2 w-full origin-top max-h-[9rem] border-y overflow-y-auto"
          >
            {content.map((chip, index) => (
              <Chip
                sectionID={sectionID}
                key={`${sectionID}-${index}`}
                chip={chip}
                onDelete={handleOnRemove}
              />
            ))}
          </motion.section>
        )}

        <motion.input
          placeholder="Enter a new tag"
          key={`${sectionID}-input`}
          layout
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={ShadCNInputStyling}
        />
      </AnimatePresence>
    </form>
  );
};

const Chip = (props: ChipComponentProps) => {
  const { chip, onDelete, sectionID } = props;
  return (
    <motion.div
      layout
      key={`${sectionID}-chip-${chip.id}`}
      className="px-1 items-center m-1 min-h-8 h-8 text-sm rounded-md bg-secondary w-fit flex space-x-2"
    >
      <h3 className="max-w-48 truncate">{chip.value}</h3>
      <XMarkIcon
        onClick={() => onDelete(chip.id)}
        className="cursor-pointer hover:text-primary w-4 transition-colors"
      />
    </motion.div>
  );
};
