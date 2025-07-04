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
import { Dropcursor } from "@tiptap/extensions";
import Underline from "@tiptap/extension-underline";
import Mathematics from "@tiptap/extension-mathematics";
import EditorToolbar from "@/components/editor/Toolbar";

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
    ],
    content: `
      <h1>
        This editor supports <span data-type="inline-math" data-latex="\\LaTeX"></span> math expressions. And it even supports converting old $\\sub(3*5=15)$ calculations.
      </h1>
    `,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none md:min-h-[450px] h-[90vh] w-full outline-none transition-all",
      },
    },
  });

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center px-4 py-6">
      <EditorToolbar editor={editor} />
      <div className="w-full max-w-screen-lg rounded-md border border-input bg-card text-card-foreground shadow-md overflow-hidden">
        <div className="border-b border-border px-4 py-2 bg-muted text-muted-foreground text-sm font-medium">
          Start editing Your Document
        </div>

        <div className="overflow-y-auto md:w-[50%] w-[90%] max-h-[90vh] px-4 py-6">
          <EditorContent className="w-full ml-4" editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
