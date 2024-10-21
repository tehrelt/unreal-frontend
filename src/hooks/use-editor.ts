import { BlockType, InlineStyle } from "@/configs/draft-js";
import { stateToHTML } from "@/lib/convert";
import { EditorState, RichUtils } from "draft-js";
import React from "react";

export type EditorApi = {
  state: EditorState;
  onChange: (state: EditorState) => void;
  toggleBlockType: (blockType: BlockType) => void;
  currentBlockType: BlockType;
  toggleInlineStyle: (style: InlineStyle) => void;
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
  toHtml: () => string;
};

export const useEditor = (html?: string): EditorApi => {
  const [state, setState] = React.useState(() => EditorState.createEmpty());

  const toggleBlockType = React.useCallback((blockType: BlockType) => {
    setState((currentState) =>
      RichUtils.toggleBlockType(currentState, blockType)
    );
  }, []);

  const toggleInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
    setState((currentState) =>
      RichUtils.toggleInlineStyle(currentState, inlineStyle)
    );
  }, []);

  const hasInlineStyle = React.useCallback(
    (inlineStyle: InlineStyle) => {
      const currentStyle = state.getCurrentInlineStyle();
      return currentStyle.has(inlineStyle);
    },
    [state]
  );

  const toHtml = React.useCallback(() => {
    return stateToHTML(state.getCurrentContent());
  }, [state]);

  const currentBlockType = React.useMemo(() => {
    const selection = state.getSelection();
    const content = state.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());
    return block.getType() as BlockType;
  }, [state]);

  return React.useMemo(
    () => ({
      state,
      currentBlockType: currentBlockType,

      onChange: setState,
      toggleBlockType: toggleBlockType,
      hasInlineStyle: hasInlineStyle,
      toggleInlineStyle: toggleInlineStyle,
      toHtml: toHtml,
    }),
    [
      state,
      currentBlockType,
      toHtml,
      hasInlineStyle,
      toggleBlockType,
      toggleInlineStyle,
    ]
  );
};
