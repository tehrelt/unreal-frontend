"use client";
import Immutable from "immutable";
import { DefaultDraftBlockRenderMap } from "draft-js";
import { PropsWithChildren } from "react";
import { Quote } from "lucide-react";
export enum BlockType {
  default = "default",
  h1 = "header-one",
  h2 = "header-two",
  h3 = "header-three",
  blockquote = "blockquote",
  code = "code-block",
}

export enum InlineStyle {
  bold = "bold",
  italic = "italic",
  underline = "underline",
}

const H1 = ({ children }: PropsWithChildren) => (
  <h1 className="text-2xl font-bold">{children}</h1>
);

const H2 = ({ children }: PropsWithChildren) => (
  <h2 className="text-xl font-bold">{children}</h2>
);

const H3 = ({ children }: PropsWithChildren) => (
  <h3 className="text-lg font-bold">{children}</h3>
);

const Blockquote = ({ children }: PropsWithChildren) => (
  <div className="border bg-muted">
    {children}
    <div className="flex justify-end">
      <Quote className="w-6 text-muted-foreground" />
    </div>
  </div>
);

const Code = ({ children }: PropsWithChildren) => (
  <code className="">{children}</code>
);

const CUSTOM_BLOCK_RENDER_MAP = Immutable.Map({
  [BlockType.default]: {
    element: "div",
    wrapper: <div />,
  },

  [BlockType.h1]: {
    element: "div",
    wrapper: <H1 />,
  },

  [BlockType.h2]: {
    element: "div",
    wrapper: <H2 />,
  },

  [BlockType.h3]: {
    element: "div",
    wrapper: <H3 />,
  },

  [BlockType.blockquote]: {
    element: "span",
    wrapper: <Blockquote />,
  },

  [BlockType.code]: {
    element: "div",
    wrapper: <Code />,
  },
});

export const CUSTOM_STYLE_MAP: Record<any, React.CSSProperties> = {
  [InlineStyle.bold]: {
    fontWeight: "bold",
  },

  [InlineStyle.italic]: {
    fontStyle: "italic",
  },

  [InlineStyle.underline]: {
    textDecoration: "underline",
  },
};
export const BLOCK_RENDER_MAP = DefaultDraftBlockRenderMap.merge(
  CUSTOM_BLOCK_RENDER_MAP
);
