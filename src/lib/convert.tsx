import { BlockType, InlineStyle } from "@/configs/draft-js";
import { convertToHTML } from "draft-convert";

export const stateToHTML = convertToHTML<InlineStyle, BlockType>({
  styleToHTML: (style) => {
    switch (style) {
      case InlineStyle.bold:
        return <strong />;
      case InlineStyle.italic:
        return <em />;
      case InlineStyle.underline:
        return <u />;
      default:
        return null;
    }
  },
  blockToHTML: (block) => {
    switch (block.type) {
      case BlockType.h1:
        return <h1 />;
      case BlockType.h2:
        return <h2 />;
      case BlockType.h3:
        return <h3 />;
      case BlockType.blockquote:
        return <blockquote />;
      case BlockType.code:
        return <code />;
      default:
        return null;
    }
  },
});
