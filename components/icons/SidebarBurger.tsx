import { Button } from "@/components/ui/button";
import { SidebarButtonProps } from "@/lib/interface";
import { cn } from "@/lib/utils";

export const SidebarBurger = (props: SidebarButtonProps) => {
  const { className, callback, mobile } = props;
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => {
        callback((prev) => !prev);
      }}
      className={cn(mobile && "hover:bg-background/30")}
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        width="100%"
        height="100%"
        className={cn("w-6 h-6", className, mobile && "hover:stroke-primary")}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
        />
      </svg>
    </Button>
  );
};
