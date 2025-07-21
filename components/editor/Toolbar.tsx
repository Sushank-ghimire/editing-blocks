"use client";
import ToolbarButton from "./ToolbarButton";
import { memo } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
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
import {
  AddImageButton,
  AddLinkButton,
  FontFamilyButton,
  TextAlignment,
  TextStyle,
  HighLightColor,
  Lists,
  FontSizeButton,
  LineHeightButton,
} from "./utilities/index";
import useEditorStore from "@/store/useEditor";

const EditorToolbar = () => {
  const { editor } = useEditorStore();
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
          editor.chain().focus().addPendingComment().run();
        },
        isActive: editor.isActive("liveblocksCommentMark"),
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
  ];
  return (
    <section className="w-container mx-auto text-base gap-2 mb-3 text-foreground items-center flex justify-start overflow-x-auto whitespace-nowrap px-2  scroll-smooth scrollbar-hide snap-x snap-mandatory">
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
      <FontFamilyButton />
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
      <TextAlignment />

      {/* Lists */}
      <Lists />

      {/* Font Size */}
      <FontSizeButton />
      {/* Text color */}
      <TextStyle />

      {/* Line Height */}
      <LineHeightButton />
      {/* Highlight Color */}
      <HighLightColor />
      {/* Links */}
      <AddLinkButton />
      {/* Images */}
      <AddImageButton />
    </section>
  );
};

export default memo(EditorToolbar);
