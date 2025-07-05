"use client";
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
  ListTodoIcon,
  RemoveFormatting,
  Pilcrow,
} from "lucide-react";
import { Separator } from "../ui/separator";
import FontFamilyButton from "./FontFamily";
import { EditorToolbarProps } from "@/types";
import TextStyle from "./TextStyle";
import { memo } from "react";
import HighLightColor from "./HighLightColor";

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
        label: "Heading 1",
        icon: Heading1,
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        },
        isActive: editor.isActive("heading"),
      },
      {
        label: "Heading 2",
        icon: Heading2,
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        },
        isActive: editor.isActive("heading"),
      },
      {
        label: "Heading 3",
        icon: Heading3,
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        },
        isActive: editor.isActive("heading"),
      },
      {
        label: "Paragraph",
        icon: Pilcrow,
        onClick: () => {
          editor.chain().focus().setParagraph().run();
        },
        isActive: editor.isActive("paragraph"),
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
      {
        label: "List",
        icon: ListTodoIcon,
        onClick: () => {
          editor.chain().focus().toggleTaskList().run();
        },
        isActive: editor.isActive("toggleTask"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormatting,
        onClick: () => {
          editor.chain().focus().unsetAllMarks().run();
        },
        isActive: editor.isActive("toggleTask"),
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
    <section className="w-full text-base gap-2 mb-3 text-foreground items-center flex justify-start overflow-x-auto whitespace-nowrap px-2 scroll-smooth scrollbar-hide snap-x snap-mandatory">
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
      <FontFamilyButton editor={editor} />
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
      <TextStyle editor={editor} />

      {/* Highlight Color */}
      <HighLightColor editor={editor} />
      {/* Links */}
      {/* Images */}
    </section>
  );
};

export default memo(EditorToolbar);
