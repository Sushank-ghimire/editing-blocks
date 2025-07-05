"use client";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ListFilter,
} from "lucide-react";
import React from "react";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Editor } from "@tiptap/core";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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
              <ListFilter />
              <TooltipContent>Text Alignment</TooltipContent>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent className="w-44">
          {alignMents.map((item) => (
            <DropdownMenuItem
              className="w-full"
              onClick={item.onClick}
              key={item.label}
            >
              <Button className="flex w-full text-foreground justify-between items-center hover:bg-accent bg-transparent text-xs">
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
