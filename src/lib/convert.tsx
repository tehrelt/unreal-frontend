import { BlockType, InlineStyle } from "@/configs/draft-js";
import { convertFromHTML, convertToHTML } from "draft-convert";

export const stateToHTML = convertToHTML<InlineStyle, BlockType>({
  styleToHTML: (style) => {
    console.log("style", style);

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
    console.log("block", block);

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
        return <p />;
    }
  },
});

export const htmlToState = convertFromHTML<DOMStringMap, BlockType>({
  htmlToStyle: (nodeName, node, currentStyle) => {
    switch (nodeName) {
      case "strong":
        return currentStyle.add(InlineStyle.bold);
      case "em":
        return currentStyle.add(InlineStyle.italic);
      case "u":
        return currentStyle.add(InlineStyle.underline);
      default:
        return currentStyle;
    }
  },

  htmlToBlock: (nodeName, node) => {
    switch (nodeName) {
      case "h1":
        return BlockType.h1;
      case "h2":
        return BlockType.h2;
      case "h3":
        return BlockType.h3;
      case "blockquote":
        return BlockType.blockquote;
      case "code":
        return BlockType.code;
      default:
        return BlockType.default;
    }
  },
});
