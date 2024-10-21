"use client";
import { EditorApi, useEditor } from "@/hooks/use-editor";
import React from "react";

const TextEditorContext = React.createContext<EditorApi | undefined>(undefined);

export const useEditorApi = () => {
  const context = React.useContext(TextEditorContext);

  if (context === undefined) {
    throw new Error("useEditorApi must be used within TextEditorProvider");
  }

  return context;
};

export const TextEditorProvider = ({ children }: React.PropsWithChildren) => {
  const editorApi = useEditor();

  return (
    <TextEditorContext.Provider value={editorApi}>
      {children}
    </TextEditorContext.Provider>
  );
};
