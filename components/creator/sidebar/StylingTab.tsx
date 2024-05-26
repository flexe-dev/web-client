"use client";

import { usePostCreator } from "@/components/context/PostCreatorProvider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { ChildNodeProps, ContentType, ToolValueObject } from "@/lib/interface";
import {
  Bars3Icon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import {
  PiAlignLeftSimple,
  PiAlignCenterHorizontalSimple,
  PiAlignRightSimple,
} from "react-icons/pi";
import {
  TbBorderCornerSquare,
  TbBorderCornerPill,
  TbBorderCornerRounded,
  TbBorderCornerIos,
} from "react-icons/tb";

import { cn } from "@/lib/utils";
import { ColourBox } from "@/components/ui/colourbox";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Property } from "csstype";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type CSSPropertyKeys =
  | Property.TextAlign
  | Property.AlignItems
  | Property.JustifyContent
  | Property.BorderRadius;

const StylingTab = () => {
  const { activeStylingTool, onStyleChange, document, onVideoHoverChange } =
    usePostCreator();
  const content = document.find(
    (content) => content.id === activeStylingTool?.id
  );

  if (!activeStylingTool || !content) return null;

  const PositionAlignmentTool = () => {
    const positions: ToolValueObject<Property.TextAlign>[] = [
      {
        icon: <Bars3BottomLeftIcon className="w-7 h-7" />,
        value: "left",
        tooltip: "Left",
      },
      {
        icon: <Bars3Icon className="w-7 h-7" />,
        value: "center",
        tooltip: "Center",
      },
      {
        icon: <Bars3BottomRightIcon className="w-7 h-7" />,
        value: "right",
        tooltip: "Right",
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
      <ButtonMenu
        header="Vertical Allignment"
        properties={positions}
        activeProperty={textPosition}
        handlePropertyChange={handlePositionChange}
      />
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
        <SectionHeader>Font Size</SectionHeader>
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
        <SectionHeader>Text Styling</SectionHeader>
        <section className="flex divide-x rounded-lg border w-full overflow-hidden">
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
        <SectionHeader>Text Colour</SectionHeader>
        <ColourBox content={content} />
      </>
    );
  };

  const MediaSizeTool = () => {
    const sizes = [
      {
        title: "Small",
        width: "36rem",
      },
      {
        title: "Medium",
        width: "42rem",
      },
      {
        title: "Large",
        width: "56rem",
      },
      {
        title: "Screen",
        width: "100%",
      },
    ];
    return (
      <>
        <SectionHeader>Media Size</SectionHeader>
        <div>
          <Select
            defaultValue={
              sizes.find((s) => s.width === content?.style?.maxWidth)?.title
            }
            onValueChange={(value) => {
              const selectedSize = sizes.find((s) => s.title === value);
              if (!selectedSize) return;
              onStyleChange(activeStylingTool.id, {
                ...content.style,
                maxWidth: selectedSize.width,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent className="z-[80]">
              {sizes.map((s) => {
                return (
                  <SelectItem className="py-3" key={s.title} value={s.title}>
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

  const MediaHorizontalPosition = () => {
    const positions: ToolValueObject<Property.JustifyContent>[] = [
      {
        icon: <PiAlignLeftSimple className="w-7 h-7" />,
        value: "start",
        tooltip: "Left",
      },
      {
        icon: <PiAlignCenterHorizontalSimple className="w-7 h-7" />,
        value: "center",
        tooltip: "Center",
      },
      {
        icon: <PiAlignRightSimple className="w-7 h-7" />,
        value: "end",
        tooltip: "Right",
      },
    ] as const;
    type Position = (typeof positions)[number]["value"];
    const allignmentPosition = content.style?.justifyContent;
    const handlePositionChange = (position: Position) => {
      onStyleChange(activeStylingTool.id, {
        ...content.style,
        justifyContent: position,
      });
    };

    return (
      <ButtonMenu
        header="Horizontal Allignment"
        properties={positions}
        activeProperty={allignmentPosition}
        handlePropertyChange={handlePositionChange}
      />
    );
  };

  const MediaRoundedTool = () => {
    const rounded: ToolValueObject<Property.BorderRadius>[] = [
      {
        icon: <TbBorderCornerSquare className="w-7 h-7" />,
        value: "0",
        tooltip: "No rounded corners",
      },
      {
        icon: <TbBorderCornerRounded className="w-7 h-7" />,
        value: "0.5rem",
        tooltip: "Small rounded corners",
      },
      {
        icon: <TbBorderCornerIos className="w-7 h-7" />,
        value: "1rem",
        tooltip: "Medium rounded corners",
      },
      {
        icon: <TbBorderCornerPill className="w-7 h-7" />,
        value: "2rem",
        tooltip: "Large rounded corners",
      },
    ];
    type Radius = (typeof rounded)[number]["value"];
    const borderRadius = content.style?.borderRadius;
    const handleBorderRadiusChange = (radius: Radius) => {
      onStyleChange(activeStylingTool.id, {
        ...content.style,
        borderRadius: radius,
      });
    };

    return (
      <ButtonMenu
        header="Rounded Corners"
        properties={rounded}
        activeProperty={borderRadius}
        handlePropertyChange={handleBorderRadiusChange}
      />
    );
  };

  const VideoPlayOnHoverTool = () => {
    const handleChange = (value: boolean) => {
      onVideoHoverChange(activeStylingTool.id, value);
    };
    return (
      <>
        <SectionHeader>Video Playback Settings</SectionHeader>
        <RadioGroup
          className="ml-2"
          defaultValue={content.playOnHover === true ? "onHover" : "autoPlay"}
        >
          <div
            className="flex items-center space-x-2"
            onClick={() => handleChange(false)}
          >
            <RadioGroupItem value="autoPlay" id="autoPlay" />
            <label htmlFor="autoPlay">Auto Play</label>
          </div>
          <div
            className="flex items-center space-x-2"
            onClick={() => handleChange(true)}
          >
            <RadioGroupItem value="onHover" id="onHover" />
            <label htmlFor="onHover">Play on Hover</label>
          </div>
        </RadioGroup>
      </>
    );
  };

  interface MenuItemProps<T> {
    header: string;
    properties: ToolValueObject<T>[];
    activeProperty?: T;
    handlePropertyChange: (property: T) => void;
  }

  const ButtonMenu = <T extends CSSPropertyKeys>(props: MenuItemProps<T>) => {
    const { header, properties, activeProperty, handlePropertyChange } = props;
    return (
      <TooltipProvider>
        <SectionHeader>{header}</SectionHeader>
        <section className="flex mt-2 rounded-lg border w-full overflow-hidden">
          {properties.map(({ icon, value, tooltip }) => (
            <Tooltip key={value}>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  className={cn(
                    `rounded-none px-2 flex flex-grow justify-center`,
                    activeProperty === value &&
                      "bg-accent hover:bg-accent/60 text-accent-foreground"
                  )}
                  variant={"ghost"}
                  onClick={() => handlePropertyChange(value)}
                >
                  {icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
          ))}
        </section>
      </TooltipProvider>
    );
  };

  const SectionHeader = ({ children }: ChildNodeProps) => {
    return <h3 className="font-semibold mt-6 mb-2">{children}</h3>;
  };

  const RenderedStylingTools: Record<ContentType, Array<() => JSX.Element>> = {
    text: [
      PositionAlignmentTool,
      TextSizeTool,
      TextStylingTool,
      TextColourTool,
    ],
    image: [MediaSizeTool, MediaHorizontalPosition, MediaRoundedTool],
    video: [
      MediaSizeTool,
      MediaHorizontalPosition,
      MediaRoundedTool,
      VideoPlayOnHoverTool,
    ],
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
