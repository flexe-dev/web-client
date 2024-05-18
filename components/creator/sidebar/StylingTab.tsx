import { usePostCreator } from "@/components/context/PostCreatorProvider";
import { Button } from "@/components/ui/button";
import { ContentType } from "@/lib/interface";
import {
  Bars3Icon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";

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
    const handlePositionChange = (position: Position) => {
      onStyleChange(activeStylingTool.id, {
        ...content.style,
        textAlign: position,
      });
    };

    return (
      <>
        <h3 className="font-semibold">Allignment</h3>
        <section className="flex mt-2 divide-x rounded-lg border w-full">
          {positions.map(({ icon, value }) => (
            <Button
              size={"icon"}
              className="rounded-none px-2 flex flex-grow justify-center"
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
    return <></>;
  };

  const TextFontWeightTool = () => {
    return <></>;
  };

  const MediaSizeTool = () => {
    return <></>;
  };

  const RenderedStylingTools: Record<ContentType, Array<() => JSX.Element>> = {
    text: [PositionAlignmentTool],
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
