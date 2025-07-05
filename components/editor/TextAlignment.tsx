"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  AlignCenter,
  AlignCenterHorizontal,
  AlignJustify,
  AlignLeft,
  AlignRight,
} from "lucide-react";
import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Editor } from "@tiptap/core";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

const TextAlignment = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }
  const alignMents = [
    {
      label: "Align Left",
      icon: AlignLeft,
      onClick: () => {
        editor.commands.setTextAlign("left");
      },
    },
    {
      label: "Align Justify",
      icon: AlignJustify,
      onClick: () => {
        editor.commands.setTextAlign("justify");
      },
    },
    {
      label: "Align Center",
      icon: AlignCenter,
      onClick: () => {
        editor.commands.setTextAlign("center");
      },
    },
    {
      label: "Align Right",
      icon: AlignRight,
      onClick: () => {
        editor.commands.setTextAlign("right");
      },
    },
  ];
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button className="hover:bg-accent text-foreground bg-transparent flex items-center justify-center">
              <AlignCenterHorizontal />
              <TooltipContent>Text Alignment</TooltipContent>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent>
          {alignMents.map((item) => (
            <DropdownMenuItem className="w-full text-sm" onClick={item.onClick} key={item.label}>
              <Button className="flex w-full text-foreground justify-between items-center hover:bg-accent bg-transparent">
                <item.icon />
                <span>{item.label}</span>
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </Tooltip>
    </DropdownMenu>
  );
};

export default TextAlignment;
