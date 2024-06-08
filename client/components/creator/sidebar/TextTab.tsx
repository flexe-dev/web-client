import TextBlock, { textTypes } from "../blocks/TextBlock";

const DocumentTab = () => {
  return (
    <section className="w-full flex flex-col items-center">
      <h2 className="w-full text-center border-b-2 font-semibold py-2 mb-4">
        Text
      </h2>
      {textTypes.map((text) => (
        <TextBlock key={`text-block-${text}`} id={text} />
      ))}
    </section>
  );
};

export default DocumentTab;
