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
  StickyNote,
  StrikethroughIcon,
  TableIcon,
  TextIcon,
  Trash,
  UnderlineIcon,
  Undo,
} from "lucide-react";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";

const DocumentsNavbar = () => {
  return (
    <nav className="border-b print:hidden flex p-2 md:p-4 items-center justify-items-start">
      <Link href="/" className="flex items-center w-fit gap-2 ml-4 md:ml-8">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="w-auto h-auto"
        />
      </Link>
      {/* Middle: Input */}
      <div className="ml-8 md:ml-6">
        <DocumentInput />
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
                    <MenubarItem className="flex justify-between items-center">
                      JSON
                      <FileJson2 />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="flex justify-between items-center">
                      HTML
                      <FileCode2 />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="flex justify-between items-center">
                      document
                      <StickyNote />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="flex justify-between items-center">
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
                <MenubarItem>
                  <Undo />
                  Undo
                  <DropdownMenuShortcut className="uppercase">
                    Ctrl+z
                  </DropdownMenuShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
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
                    <MenubarItem>1 X 1</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>2 X 2</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>3 X 3</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>4 X 4</MenubarItem>
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
                    <MenubarItem className="flex gap-2">
                      Bold
                      <BoldIcon />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="flex gap-2">
                      Italic
                      <ItalicIcon />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="flex gap-2">
                      Underline
                      <UnderlineIcon />
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="flex gap-2">
                      Strikethrough
                      <StrikethroughIcon />
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </nav>
  );
};

export default DocumentsNavbar;
