import { usePostCreator } from "@/components/context/PostCreatorProvider";
import { ContentType } from "@/lib/interface";
import {
  Bars3Icon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/outline";

const StylingTab = () => {
  const { activeStylingTool, setActiveStylingTool, onStyleChange } =
    usePostCreator();

  const PositionAlignmentTool = () => {
    return (
      <section className="flex flex-col border w-full">
        <h3 className="text-lg font-semibold">Align Text</h3>
        <div></div>
      </section>
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
    title: [PositionAlignmentTool],
    subtitle: [],
    text: [],
    image: [],
    video: [],
  };

  if (!activeStylingTool) return null;

  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="w-full text-center border-b-2 font-semibold py-2 mb-4">
        Content Style
      </h2>

      <h3 className="w-full text-center border-b-2 font-semibold py-2 mb-4">
        {activeStylingTool?.type}
      </h3>

      <div className="flex flex-col items-center">
        {RenderedStylingTools[activeStylingTool.type].map((Tool, index) => (
          <Tool key={`tool-${activeStylingTool.type}-${index}`} />
        ))}
      </div>
    </section>
  );
};

export default StylingTab;
