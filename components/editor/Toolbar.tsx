"use client";
import { Editor } from "@tiptap/react";
import ToolbarButton from "./ToolbarButton";
import {
  Heading1,
  Heading2,
  Heading3,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  LucideIcon,
  Undo2Icon,
  Redo2Icon,
  PrinterIcon,
  SpellCheck,
  ItalicIcon,
  Underline,
  MessageSquareDiff,
} from "lucide-react";
import { Separator } from "../ui/separator";

interface EditorToolbarProps {
  editor: Editor | null;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) {
    return null;
  }

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => {
          editor.chain().focus().undo().run();
        },
        isActive: editor.isActive("undo"),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => {
          editor.chain().focus().redo().run();
        },
        isActive: editor.isActive("redo"),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheck,
        onClick: () => {
          const current = editor.view.dom.getAttribute("spellcheck");
          editor.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
        isActive: editor.isActive("spellcheck"),
      },
    ],
    [
      {
        label: "Bold",
        icon: Bold,
        onClick: () => {
          editor.chain().focus().toggleBold().run();
        },
        isActive: editor.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => {
          editor.chain().focus().toggleItalic().run();
        },
        isActive: editor.isActive("italic"),
      },
      {
        label: "Underline",
        icon: Underline,
        onClick: () => {
          editor.chain().focus().toggleUnderline().run();
        },
        isActive: editor.isActive("underline"),
      },
    ],
    [
      {
        label: "Heading1",
        icon: Heading1,
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        },
        isActive: editor.isActive("heading1"),
      },
      {
        label: "Heading2",
        icon: Heading2,
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        },
        isActive: editor.isActive("heading2"),
      },
      {
        label: "Heading3",
        icon: Heading3,
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        },
        isActive: editor.isActive("heading3"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquareDiff,
        onClick: () => {
          console.log("Comment added");
        },
      },
    ],
    [
      {
        label: "AlignLeft",
        icon: AlignLeft,
        onClick: () => {
          console.log("Left");
        },
      },
      {
        label: "AlignCenter",
        icon: AlignCenter,
        onClick: () => {
          console.log("Center");
        },
      },
      {
        label: "AlignRight",
        icon: AlignRight,
        onClick: () => {
          console.log("Right");
        },
      },
    ],
  ];
  return (
    <section className="w-full text-lg gap-2 overflow-x-scroll mb-3 text-foreground items-center flex justify-start">
      {/* Functionalities */}
      {sections[0].map((item) => (
        <ToolbarButton
          icon={item.icon}
          label={item.label}
          key={item.label}
          isActive={item.isActive}
          onClick={item.onClick}
        />
      ))}
      <Separator orientation="vertical" className="bg-foreground h-6" />

      {/* Basic Typography */}
      {sections[1].map((item) => (
        <ToolbarButton
          icon={item.icon}
          label={item.label}
          key={item.label}
          isActive={item.isActive}
          onClick={item.onClick}
        />
      ))}
      <Separator orientation="vertical" className="bg-foreground h-6" />
      {/* Font Family */}
      <Separator orientation="vertical" className="bg-foreground h-6" />
      {/* Headings */}
      {sections[2].map((item) => (
        <ToolbarButton
          label={item.label}
          icon={item.icon}
          key={item.label}
          isActive={item.isActive}
          onClick={item.onClick}
        />
      ))}
      <Separator orientation="vertical" className="bg-foreground h-6 w-2" />
      {/* Comment */}
      {sections[3].map((item) => (
        <ToolbarButton
          label={item.label}
          icon={item.icon}
          key={item.label}
          isActive={item.isActive}
          onClick={item.onClick}
        />
      ))}

      <Separator orientation="vertical" className="bg-foreground h-6 w-2" />
      {/* Text Alignment */}
      {sections[4].map((item) => (
        <ToolbarButton
          label={item.label}
          icon={item.icon}
          key={item.label}
          isActive={item.isActive}
          onClick={item.onClick}
        />
      ))}
      {/* Font Size */}
      {/* Text color */}
      {/* Highlight Color */}
      {/* Links */}
      {/* Images */}
    </section>
  );
};

export default EditorToolbar;
