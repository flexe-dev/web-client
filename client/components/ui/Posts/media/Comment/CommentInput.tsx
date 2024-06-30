import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const CommentInput = () => {
  const [comment, setComment] = useState<string>("");
  const [style, setStyle] = useState<React.CSSProperties>({});
  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
    setStyle({
      height: `${event.target.scrollHeight}px`,
    });
  };

  return (
    <div className="hidden md:flex items-center border-t ">
      <Textarea
        style={style}
        className="rounded-none border-0 resize-none min-h-[4rem] max-h-[14rem] overflow-y-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Add a comment"
      />
      <Button
        className="rounded-none border-0 h-full border-l"
        variant={"outline"}
      >
        Post
      </Button>
    </div>
  );
};

export default CommentInput;
