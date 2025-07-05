"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import Underline from "@tiptap/extension-underline";
import Mathematics from "@tiptap/extension-mathematics";
import EditorToolbar from "@/components/editor/Toolbar";
import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { Highlight } from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import { Link } from "@tiptap/extension-link";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Subscript,
      Superscript,
      TaskItem.configure({
        nested: true,
      }),
      Mathematics,
      TaskList,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Table.configure({
        resizable: true,
      }),
      TableHeader,
      TableCell,
      TableRow,
      Image.configure({
        inline: true,
      }),
      Dropcursor,
      Color.configure({
        types: ["textStyle"],
      }),
      TextStyle,
      FontFamily,
      Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
    ],
    content: `
    Start Writing Your Content
    `,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none md:min-h-[450px] h-[90vh] w-full outline-none transition-all",
      },
    },
  });

  return (
    <TooltipProvider>
      <div className="w-full flex flex-col gap-2 items-center justify-center px-4 py-6">
        <div className="w-full max-w-screen-lg rounded-md border border-input bg-card text-card-foreground shadow-md overflow-hidden">
          <div className="border-b border-border px-4 py-2 bg-muted text-muted-foreground text-sm font-medium">
            <EditorToolbar editor={editor} />
            Start editing Your Document
          </div>

          <div className="overflow-y-auto  w-[90%] max-h-[90vh] px-4 py-6">
            <EditorContent className="w-full ml-4" editor={editor} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Tiptap;
