import * as React from "react";
import { Editor } from "draft-js";
import { useEditorApi } from "./context";
import { cn } from "@/lib/utils";
import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from "@/configs/draft-js";

export type TextEditorProps = {
  className?: string;
};

export const TextEditor: React.FC<TextEditorProps> = ({ className }) => {
  const { state, onChange } = useEditorApi();

  return (
    <div className={cn("border min-h-60", className)}>
      <Editor
        editorState={state}
        onChange={onChange}
        blockRenderMap={BLOCK_RENDER_MAP}
        customStyleMap={CUSTOM_STYLE_MAP}
      />
    </div>
  );
};
