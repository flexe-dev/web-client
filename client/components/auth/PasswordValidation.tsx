import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
interface Props {
  validation: {
    length: boolean;
    number: boolean;
    special: boolean;
    upper: boolean;
  };
}

function PasswordValidation(props: Props) {
  const { length, number, special, upper } = props.validation;

  const passwordCheck = [
    {
      label: "Minimum 6 Characters",
      valid: length,
    },
    {
      label: "Minimum 1 Number",
      valid: number,
    },
    {
      label: "Minimum 1 Symbol",
      valid: special,
    },
    {
      label: "Minimum 1 Uppercase Letter",
      valid: upper,
    },
  ];
  return (
    <div className="group-focus-within:scale-y-100 scale-y-0 origin-top-left scale-x-50 group-focus-within:scale-x-100 z-[99] transition-transform ease-out bg-background border rounded-lg my-4 absolute w-fit p-4 space-y-2">
      {passwordCheck.map((check, index) => {
        return (
          <div
            key={`validation-${index}`}
            className="flex items-center space-x-2 group-focus-within:opacity-100 opacity-0 duration-150 "
          >
            {check.valid ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            ) : (
              <XCircleIcon className="h-5 w-5 text-red-500" />
            )}
            <span
              className={cn(
                check.valid ? "text-green-500" : "text-red-500",
                "text-sm"
              )}
            >
              {check.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default PasswordValidation;
