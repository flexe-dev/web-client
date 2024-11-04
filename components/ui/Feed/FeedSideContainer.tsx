import { ChildNodeProps, ClassNameProp } from "@/lib/interface";
import { cn } from "@/lib/util/utils";
import { FC } from "react";
import { Card } from "../Shared/card";

interface Props extends ChildNodeProps, ClassNameProp {}

export const FeedSideContainer: FC<Props> = ({ children, className }) => {
  return (
    <Card
      className={cn("my-4 md:my-8 mr-8 ml-4 md:mr-2 lg:m-8 p-8", className)}
    >
      {children}
    </Card>
  );
};
