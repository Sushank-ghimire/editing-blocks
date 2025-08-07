"use client";
import Image from "next/image";
import Link from "next/link";
import DocumentInput from "./DocumentInput";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  FileCode2,
  FileIcon,
  FileJson2,
  ItalicIcon,
  PenIcon,
  PlusIcon,
  PrinterIcon,
  Redo,
  RemoveFormatting,
  StickyNote,
  StrikethroughIcon,
  TableIcon,
  TableOfContents,
  TextIcon,
  Trash,
  UnderlineIcon,
  Undo,
} from "lucide-react";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";
import useEditorStore from "@/store/useEditor";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "./ThemeSwitcher";
import Avatars from "./avatars";
import Inbox from "./inbox";
import { Doc } from "@/convex/_generated/dataModel";
import { jsPDF } from "jspdf";
import { useStorage } from "@liveblocks/react/suspense";

const DocumentsNavbar = ({ doc }: { doc: Doc<"documents"> }) => {
  const { editor } = useEditorStore();

  const leftMargin = useStorage((root) => root.leftMargin) ?? 0;
  const rightMargin = useStorage((root) => root.rightMargin) ?? 0;

  if (!editor) return null;

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const handleDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const handleJSONDownload = () => {
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    handleDownload(blob, `${doc.title}.json`);
  };

  const handleOnSaveHTML = () => {
    const content = editor.getHTML();
    const blob = new Blob([JSON.stringify(content)], {
      type: "text/html",
    });
    handleDownload(blob, `${doc.title}.html`);
  };

  const handleOnSaveText = () => {
    const content = editor.getText();
    const blob = new Blob([JSON.stringify(content)], {
      type: "text/plain",
    });
    handleDownload(blob, `${doc.title}.txt`);
  };
  const handleOnPdfSave = () => {
    const content = editor.getText();

    const docPdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = docPdf.internal.pageSize.getWidth();
    const margin = 40;
    const textWidth = pageWidth - leftMargin - rightMargin;

    const lines = docPdf.splitTextToSize(content, textWidth);

    docPdf.text(lines, margin, 60);
    docPdf.save(`${doc.title}.pdf`);
  };

  return (
    <nav className="border-b print:hidden flex p-2 md:p-4 items-center justify-items-start">
      <Link href="/" className="flex items-center w-fit gap-2 ml-4 md:ml-8">
        <Image
          src="/logo.png"
          priority
          alt="Logo"
          width={40}
          height={40}
          className="w-auto h-auto"
        />
      </Link>
      {/* Middle: Input */}
      <div className="ml-8 md:ml-6">
        <DocumentInput document={doc} />
        <div className="flex justify-items-start">
          <Menubar className="border-none bg-transparent shadow-none px-0 w-fit text-foreground print:hidden">
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent className="hover:bg-muted print:hidden">
                <MenubarSub>
                  <MenubarSubTrigger className="flex gap-2 justify-between items-center">
                    <FileIcon className="size-4 mr-2" />
                    Save
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem
                      onClick={handleJSONDownload}
                      className="flex justify-between items-center"
                    >
                      JSON
                      <FileJson2 />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={handleOnSaveHTML}
                      className="flex justify-between items-center"
                    >
                      HTML
                      <FileCode2 />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={handleOnSaveText}
                      className="flex justify-between items-center"
                    >
                      Text
                      <StickyNote />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={handleOnPdfSave}
                      className="flex justify-between items-center"
                    >
                      pdf
                      <StickyNote />
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem className="flex gap-3">
                  <PlusIcon />
                  New Document
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="flex gap-3">
                  <PenIcon />
                  Rename
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="flex gap-3">
                  <Trash />
                  Trash
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  onClick={() => {
                    window.print();
                  }}
                  className="flex gap-3"
                >
                  <PrinterIcon />
                  Print
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={() => {
                    editor.chain().focus().undo().run();
                  }}
                >
                  <Undo />
                  Undo
                  <DropdownMenuShortcut className="uppercase">
                    Ctrl+z
                  </DropdownMenuShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  onClick={() => {
                    editor.chain().focus().redo().run();
                  }}
                >
                  <Redo />
                  Redo
                  <DropdownMenuShortcut className="uppercase">
                    Ctrl+y
                  </DropdownMenuShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Insert</MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger className="flex gap-2 justify-between items-center">
                    <TableIcon className="size-4" />
                    Table
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem
                      onClick={() => {
                        insertTable({ rows: 1, cols: 1 });
                      }}
                    >
                      1 X 1
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={() => {
                        insertTable({ rows: 2, cols: 2 });
                      }}
                    >
                      2 X 2
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={() => {
                        insertTable({ rows: 3, cols: 3 });
                      }}
                    >
                      3 X 3
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={() => {
                        insertTable({ rows: 4, cols: 4 });
                      }}
                    >
                      4 X 4
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Format</MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <TextIcon className="size-4 mr-2" />
                    Text
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem
                      onClick={() => {
                        editor.chain().focus().toggleBold().run();
                      }}
                      className="flex items-center justify-between"
                    >
                      Bold
                      <BoldIcon />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={() => {
                        editor.chain().focus().toggleItalic().run();
                      }}
                      className="flex items-center justify-between"
                    >
                      Italic
                      <ItalicIcon />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={() => {
                        editor.chain().focus().toggleUnderline().run();
                      }}
                      className="flex items-center justify-between"
                    >
                      Underline
                      <UnderlineIcon />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={() => {
                        editor.chain().focus().toggleStrike().run();
                      }}
                      className="flex items-center justify-between"
                    >
                      Strikethrough
                      <StrikethroughIcon />
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem
                  onClick={() => {
                    editor.chain().focus().unsetAllMarks().run();
                  }}
                  className="flex gap-2"
                >
                  <RemoveFormatting />
                  Clear Formatting
                </MenubarItem>
                <MenubarItem
                  onClick={() => {
                    editor.chain().focus().clearContent().run();
                  }}
                  className="flex gap-2"
                >
                  <TableOfContents />
                  Clear Content
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      {/* Users Profile Component to add further */}
      <div className="md:flex justify-end w-full hidden items-center gap-4 mr-6">
        <Inbox />
        <Avatars />
        <OrganizationSwitcher
          afterLeaveOrganizationUrl="/"
          afterCreateOrganizationUrl={"/"}
          afterSelectOrganizationUrl={"/"}
          afterSelectPersonalUrl={"/"}
        />
        <UserButton />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default DocumentsNavbar;
