import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import React, { FormEvent, useEffect, useState } from "react";
import { ShadCNInputStyling } from "../input";

interface InputChipsProps {
  setContent: React.Dispatch<React.SetStateAction<string[]>>;
  content: string[];
  title: string;
  className?: string;
  sectionID: string;
}

interface ChipComponentProps {
  chip: string;
  onDelete: (id: string) => void;
  sectionID: string;
  duplicate: boolean;
}

export const InputChips = (props: InputChipsProps) => {
  const { setContent, content, title, className, sectionID } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [duplicateError, setDuplicateError] = useState<string | undefined>();

  const handleOnRemove = (value: string) => {
    setContent((prev) => prev.filter((chip) => chip !== value));
  };

  useEffect(() => {
    if (duplicateError) {
      setDuplicateError(undefined);
    }
  }, [inputValue]);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.some((chip) => chip === inputValue)) {
      setDuplicateError(inputValue);
      return;
    }
    if (!inputValue.trim()) return;

    setContent((prev) => [...prev, inputValue]);
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
            className={`flex flex-wrap mb-4 mt-2 py-2 w-full origin-top max-h-[9rem] border-y overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted`}
          >
            {content.map((chip, index) => (
              <Chip
                duplicate={chip === duplicateError}
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
          className={cn(
            ShadCNInputStyling,
            duplicateError &&
              "focus-visible:ring-red-500 focus-visible:ring-offset-red-500 border-red-500"
          )}
        />
        <h3
          className={cn(
            "py-2 px-1 text-sm h-4 transition-opacity",
            duplicateError ? "opacity-100" : "opacity-0"
          )}
        >
          {duplicateError ? "This value already exists" : ""}
        </h3>
      </AnimatePresence>
    </form>
  );
};

const Chip = (props: ChipComponentProps) => {
  const { chip, onDelete, sectionID, duplicate } = props;
  return (
    <motion.div
      layout
      key={`${sectionID}-chip-${chip}`}
      className={cn(
        "px-1 items-center m-1 min-h-8 h-8 text-sm rounded-md bg-secondary w-fit flex space-x-2",
        duplicate && "animate-pulse"
      )}
    >
      <h3 className="max-w-48 truncate">{chip}</h3>
      <XMarkIcon
        onClick={() => onDelete(chip)}
        className="cursor-pointer hover:text-primary w-4 transition-colors"
      />
    </motion.div>
  );
};
