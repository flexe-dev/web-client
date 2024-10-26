import { ChildNodeProps, ClassNameProp } from "@/lib/interface";
import { cn } from "@/lib/util/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { FC } from "react";

const chipVariants = cva(
  cn(`px-1 items-center m-1 rounded-md w-fit flex space-x-2`),
  {
    variants: {
      variant: {
        default: "bg-secondary",
        outline: "bg-background border",
      },
      size: {
        default: "min-h-8 h-8",
        sm: "min-h-6 h-6 text-sm",
        lg: "min-h-10 h-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ChipComponentProps
  extends ClassNameProp,
    ChildNodeProps,
    VariantProps<typeof chipVariants> {
  content: string;
  sectionID: string;
  readonly: boolean;
  onDelete?: (id: string) => void;
  duplicate?: boolean;
}

export const Chip: FC<ChipComponentProps> = ({
  readonly,
  onDelete,
  children,
  sectionID,
  duplicate,
  content,
  className,
  variant,
  size,
}) => {
  const handleChipDeletion = () => {
    if (!readonly && onDelete) {
      onDelete(content);
    }
  };

  return (
    <motion.div
      layout
      key={`${sectionID}-chip-${content}`}
      className={cn(
        chipVariants({ variant, size, className }),
        className,
        duplicate && "animate-pulse"
      )}
    >
      {children}
      {!readonly && (
        <XMarkIcon
          onClick={handleChipDeletion}
          className="cursor-pointer hover:text-primary w-4 transition-colors"
        />
      )}
    </motion.div>
  );
};
