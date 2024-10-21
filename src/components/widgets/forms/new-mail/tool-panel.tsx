import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";
import { useEditorApi } from "./context";
import { BlockType, InlineStyle } from "@/configs/draft-js";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  LucideIcon,
  Quote,
  Underline,
} from "lucide-react";

type Props = { className?: ClassValue };

type toggleBlockType = {
  type: BlockType;
  icon: LucideIcon;
};

type inlineStyleType = {
  style: InlineStyle;
  icon: LucideIcon;
};

const BLOCK_TYPES: toggleBlockType[] = [
  {
    type: BlockType.h1,
    icon: Heading1,
  },
  {
    type: BlockType.h2,
    icon: Heading2,
  },
  {
    type: BlockType.h3,
    icon: Heading3,
  },
  {
    type: BlockType.blockquote,
    icon: Quote,
  },
  {
    type: BlockType.code,
    icon: Code,
  },
];

const INLINE_STYLES_CODES: inlineStyleType[] = [
  {
    style: InlineStyle.bold,
    icon: Bold,
  },
  {
    style: InlineStyle.italic,
    icon: Italic,
  },
  {
    style: InlineStyle.underline,
    icon: Underline,
  },
];

export const ToolPanel: React.FC<Props> = ({ className }) => {
  const {
    toggleInlineStyle,
    hasInlineStyle,
    toggleBlockType,
    currentBlockType,
  } = useEditorApi();

  return (
    <div className={cn("flex gap-x-2", className)}>
      {INLINE_STYLES_CODES.map((e) => (
        <Toggle
          key={e.style}
          pressed={hasInlineStyle(e.style)}
          onPressedChange={() => toggleInlineStyle(e.style)}
          variant={"outline"}
        >
          <e.icon size={16} />
        </Toggle>
      ))}

      {BLOCK_TYPES.map((t) => (
        <Toggle
          key={t.type}
          pressed={currentBlockType === t.type}
          onPressedChange={() => toggleBlockType(t.type)}
          variant={"outline"}
        >
          <t.icon size={16} />
        </Toggle>
      ))}
    </div>
  );
};
