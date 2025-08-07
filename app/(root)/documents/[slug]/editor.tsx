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
import { TextAlign } from "@tiptap/extension-text-align";
import { CustomFontSizeExtension } from "@/extensions/font-size";
import { CustomLineHeightExtension } from "@/extensions/line-height";
import { Ruler } from "@/components/editor/utilities";
import useEditorStore from "@/store/useEditor";
import { useEffect } from "react";
import {
  useLiveblocksExtension,
  FloatingToolbar,
} from "@liveblocks/react-tiptap";
import { Threads } from "./Threads";
import { useStorage } from "@liveblocks/react/suspense";
import { Doc } from "@/convex/_generated/dataModel";
import { DocumentsNavbar } from "@/components/index";

interface IEditorProps {
  doc: Doc<"documents">;
  initialContent: string | undefined;
}

const Tiptap = ({ doc, initialContent }: IEditorProps) => {
  const { initializeEditor } = useEditorStore();

  const leftMargin = useStorage((root) => root.leftMargin);

  const rightMargin = useStorage((root) => root.rightMargin);

  const liveblocks = useLiveblocksExtension({
    initialContent
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        history: false,
      }),
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
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CustomFontSizeExtension,
      CustomLineHeightExtension,
      liveblocks,
    ],
    content: `${doc.initialContent}`,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none md:min-h-[450px] h-[90vh] w-full outline-none transition-all",
        style: `padding-left: ${leftMargin ?? 0}px; padding-right: ${rightMargin ?? 0}px;`,
      },
    },
  });

  useEffect(() => {
    if (editor) {
      initializeEditor(editor);
    }
  }, [editor, initializeEditor]);

  if (!editor) return null;

  return (
    <TooltipProvider>
      <DocumentsNavbar doc={doc} />
      <div className="w-full flex flex-col items-center px-4 py-6 gap-4">
        {/* Sticky, Scrollable Toolbar */}
        <div className="w-full max-w-5xl overflow-x-auto scrollbar-hide sticky top-0 z-20 bg-background shadow-sm rounded-md border border-input print:hidden flex justify-center items-center p-3">
          <EditorToolbar />
        </div>

        {/* Ruler Component */}
        <div className="w-full print:hidden max-w-5xl px-4">
          <Ruler /> {/* Horizontal Ruler aligned with editor */}
        </div>

        {/* Editor Container */}
        <div className="w-full max-w-5xl rounded-md border border-input bg-card text-card-foreground shadow-md flex flex-col print:hidden">
          {/* Editor Scrollable Content */}
          <div className="px-4 py-6 overflow-y-auto min-h-[60vh] min-w-full max-h-[80vh]">
            <EditorContent
              className="w-full break-words prose max-w-none"
              editor={editor}
            />
            <Threads editor={editor} />
            <FloatingToolbar editor={editor} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Tiptap;
