import ImageContent from "@/components/creator/content/ImageContent";
import SubTitleContent from "@/components/creator/content/SubTitleContent";
import TextContent from "@/components/creator/content/TextContent";
import TitleContent from "@/components/creator/content/TitleContent";

export class Content {
  id: string;
  value: string;
  onDelete: (id: string) => void;
  content: React.ReactNode;
  setValue(value: string) {
    this.value = value;
  }

  constructor(id: string, value: string, onDelete: (id: string) => void) {
    this.id = id;
    this.value = value;
    this.onDelete = onDelete;
  }
}

export class TextBlockContent extends Content {
  constructor(id: string, onDelete: (id: string) => void) {
    super(id, "Text", onDelete);
    this.content = (
      <TextContent
        id={this.id}
        value={this.value}
        onDelete={this.onDelete}
        onChange={(newValue: string) => this.setValue(newValue)}
      />
    );
  }
  setValue(value: string): void {
    this.value = value;
  }
}

export class TitleBlockContent extends Content {
  content: React.ReactNode;
  setValue(value: string) {
    this.value = value;
  }

  constructor(id: string, onDelete: (id: string) => void) {
    super(id, "Title", onDelete);
    this.content = (
      <TitleContent
        id={this.id}
        value={this.value}
        onDelete={this.onDelete}
        onChange={this.setValue.bind(this)}
      />
    );
  }
}

export class SubTitleBlockContent extends Content {
  
  content: React.ReactNode;
  setValue(value: string) {
    this.value = value;
  }

  constructor(id: string, onDelete: (id: string) => void) {
    super(id, "Subtitle", onDelete);
    this.content = (
      <SubTitleContent
        id={this.id}
        value={this.value}
        onDelete={this.onDelete}
        onChange={this.setValue.bind(this)}
      />
    );
  }
}

export class ImageBlockContent extends Content {
  content: React.ReactNode;
  setValue(value: string) {
    this.value = value;
  }

  constructor(id: string, imageSrc: string, onDelete: (id: string) => void) {
    super(id, imageSrc, onDelete);
    this.content = (
      <ImageContent
        id={this.id}
        value={this.value}
        onDelete={this.onDelete}
        onChange={this.setValue.bind(this)}
      />
    );
  }
}

export class VideoBlockContent extends Content {
  content: React.ReactNode;
  setValue(value: string) {
    this.value = value;
  }

  constructor(id: string, imageSrc: string, onDelete: (id: string) => void) {
    super(id, imageSrc, onDelete);
    this.content = (
      <ImageContent
        id={this.id}
        value={this.value}
        onDelete={this.onDelete}
        onChange={this.setValue.bind(this)}
      />
    );
  }
}

export const contentType = [
  TitleBlockContent,
  TextBlockContent,
  SubTitleBlockContent,
  ImageBlockContent,
  VideoBlockContent,
] as const;
