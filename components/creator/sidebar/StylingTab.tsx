"use client";

import { useEffect, useState } from "react";
import { usePostCreator } from "@/components/context/PostCreatorProvider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { ContentType } from "@/lib/interface";
import {
  Bars3Icon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { text } from "stream/consumers";
import { ColourBox } from "@/components/ui/colourbox";

const StylingTab = () => {
  const { activeStylingTool, onStyleChange, document } = usePostCreator();
  const content = document.find(
    (content) => content.id === activeStylingTool?.id
  );

  if (!activeStylingTool || !content) return null;

  const PositionAlignmentTool = () => {
    const positions = [
      {
        icon: <Bars3BottomLeftIcon className="w-7 h-7" />,
        value: "left",
      },
      {
        icon: <Bars3Icon className="w-7 h-7" />,
        value: "center",
      },
      {
        icon: <Bars3BottomRightIcon className="w-7 h-7" />,
        value: "right",
      },
    ] as const;
    type Position = (typeof positions)[number]["value"];
    const textPosition = content.style?.textAlign;
    const handlePositionChange = (position: Position) => {
      onStyleChange(activeStylingTool.id, {
        ...content.style,
        textAlign: position,
      });
    };

    return (
      <>
        <h3 className="font-semibold">Allignment</h3>
        <section className="flex mt-2 divide-x rounded-lg border w-full overflow-hidden">
          {positions.map(({ icon, value }) => (
            <Button
              key={value}
              size={"icon"}
              className={cn(
                `rounded-none px-2 flex flex-grow justify-center`,
                textPosition === value &&
                  "bg-accent hover:bg-accent/60 text-accent-foreground"
              )}
              variant={"ghost"}
              onClick={() => handlePositionChange(value)}
            >
              {icon}
            </Button>
          ))}
        </section>
      </>
    );
  };

  const TextSizeTool = () => {
    const size = [
      {
        title: "Heading 1",
        fontSize: "1.875rem",
        lineHeight: "2.25rem",
      },
      {
        title: "Heading 2",
        fontSize: "1.5rem",
        lineHeight: "1.75rem",
      },
      {
        title: "Heading 3",
        fontSize: "1.25rem",
        lineHeight: "1.5rem",
      },
      {
        title: "Body",
        fontSize: "1rem",
        lineHeight: "1.25rem",
      },
      {
        title: "Caption",
        fontSize: "0.875rem",
        lineHeight: "1rem",
      },
    ];
    return (
      <>
        <h3 className="font-semibold mt-6">Font Size</h3>
        <div>
          <Select
            defaultValue={
              size.find((s) => s.fontSize === content?.style?.fontSize)?.title
            }
            onValueChange={(value) => {
              const selectedSize = size.find((s) => s.title === value);
              if (!selectedSize) return;
              onStyleChange(activeStylingTool.id, {
                ...content.style,
                fontSize: selectedSize.fontSize,
                lineHeight: selectedSize.lineHeight,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent className="z-[80]">
              {size.map((s) => {
                return (
                  <SelectItem
                    className="py-3"
                    style={{
                      fontSize: s.fontSize,
                    }}
                    key={s.fontSize}
                    value={s.title}
                  >
                    {s.title}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </>
    );
  };

  const TextStylingTool = () => {
    const styles = [
      {
        name: "Bold",
        icon: <FaBold className="w-5 h-5" />,
        stylingActive: {
          fontWeight: "bold",
        },
        stylingDisabled: {
          fontWeight: "normal",
        },
      },
      {
        name: "Italic",
        icon: <FaItalic className="w-5 h-5" />,
        stylingActive: {
          fontStyle: "italic",
        },
        stylingDisabled: {
          fontStyle: "normal",
        },
      },
      {
        name: "Underline",
        icon: <FaUnderline className="w-5 h-5" />,
        stylingActive: {
          textDecoration: "underline",
        },
        stylingDisabled: {
          textDecoration: "none",
        },
      },
    ] as const;

    type Style = (typeof styles)[number]["name"];

    const activeStyling: Record<Style, boolean> = {
      Bold: content.style?.fontWeight === "bold",
      Italic: content.style?.fontStyle === "italic",
      Underline: content.style?.textDecoration === "underline",
    };

    const handleStylingChange = (styleType: Style) => {
      const style = styles.find((s) => s.name === styleType);
      if (!style || !activeStyling) return;

      const styling = activeStyling[styleType]
        ? style.stylingDisabled
        : style.stylingActive;

      onStyleChange(activeStylingTool.id, {
        ...content.style,
        ...styling,
      });
    };

    return (
      <>
        <h3 className="font-semibold mt-6">Text Styling</h3>
        <section className="flex mt-2 divide-x rounded-lg border w-full overflow-hidden">
          {styles.map(({ name, icon }, index) => (
            <Button
              key={`styling-tool-${index}`}
              size={"icon"}
              className={cn(
                "rounded-none px-2 flex flex-grow justify-center",
                activeStyling?.[name] &&
                  "bg-accent hover:bg-accent/60 text-accent-foreground"
              )}
              variant={"ghost"}
              onClick={() => handleStylingChange(name)}
            >
              {icon}
            </Button>
          ))}
        </section>
      </>
    );
  };

  const TextColourTool = () => {
    return (
      <>
        <h3 className="font-semibold mt-6">Text Styling</h3>
        <ColourBox />
      </>
    );
  };

  const MediaSizeTool = () => {
    return <></>;
  };

  const MediaPositionTool = () => {
    return <></>;
  };

  const RenderedStylingTools: Record<ContentType, Array<() => JSX.Element>> = {
    text: [
      PositionAlignmentTool,
      TextSizeTool,
      TextStylingTool,
      TextColourTool,
    ],
    image: [],
    video: [],
  };

  return (
    <section className="w-full flex flex-col">
      <h2 className="w-full text-center border-b-2 font-semibold py-2 mb-4">
        Content Style
      </h2>

      <div className="flex flex-col px-4">
        {RenderedStylingTools[activeStylingTool.type].map((Tool, index) => (
          <Tool key={`tool-${activeStylingTool.type}-${index}`} />
        ))}
      </div>
    </section>
  );
};

export default StylingTab;
