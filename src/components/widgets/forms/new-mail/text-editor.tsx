import * as React from "react";
import { Editor, EditorState } from "draft-js";
import { useEditorApi } from "./context";
import { cn } from "@/lib/utils";
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from "@/configs/draft-js";

export type TextEditorProps = {
  onChange: (s: EditorState) => void;
  className?: string;
};

export const TextEditor: React.FC<TextEditorProps> = ({
  className,
  onChange,
}) => {
  const { state, onChange: stateChange, toHtml } = useEditorApi();

  const mergeChange = (s: EditorState) => {
    onChange(s);
    stateChange(s);
  };

  return (
    <div className={cn("border min-h-60", className)}>
      <Editor
        editorState={state}
        onChange={mergeChange}
        blockRenderMap={BLOCK_RENDER_MAP}
        customStyleMap={CUSTOM_STYLE_MAP}
      />
    </div>
  );
};
