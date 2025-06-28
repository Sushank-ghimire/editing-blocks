"use client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugin/ToolbarPlugin";

const theme = {
  text: {
    base: "text-foreground font-sans",
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
  paragraph: "mb-4",
  root: "min-h-full w-full focus:outline-none px-4 py-2 text-base",
};

function onError(error: Error) {
  console.error(error);
}

const Editor = () => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    editable: true,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex flex-col overflow-x-hidden pt-16 px-4 md:px-8 bg-background text-foreground">
        <div className="flex min-w-full justify-between">
          <ToolbarPlugin />
        </div>
        <div className="max-w-4xl w-full mx-auto flex-grow">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[80vh] w-full rounded-md bg-card p-4 shadow-sm ring-1 ring-border focus:outline-none" />
            }
            placeholder={
              <div className="text-muted-foreground">Start writing...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor;
