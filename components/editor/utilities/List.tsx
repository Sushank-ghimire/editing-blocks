"use client";
import { List, ListIcon, ListOrderedIcon } from "lucide-react";
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
import clsx from "clsx";

const Lists = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  const listsItem = [
    {
      label: "Bullet List",
      icon: List,
      onclick: () => {
        editor.chain().focus().toggleBulletList().run();
      },
      isActive: editor.isActive("bulletList"),
    },
    {
      label: "Numbered List",
      icon: ListOrderedIcon,
      onclick: () => {
        editor.chain().focus().toggleOrderedList().run();
      },
      isActive: editor.isActive("orderedList"),
    },
  ];

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button className="hover:bg-accent text-foreground bg-transparent flex items-center justify-center">
              <ListIcon />
              <TooltipContent>Lists</TooltipContent>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent className="w-54">
          {listsItem.map((item) => (
            <DropdownMenuItem
              className="w-full"
              onClick={item.onclick}
              key={item.label}
            >
              <Button
                className={clsx(
                  "flex w-full text-foreground justify-between items-center hover:bg-accent bg-transparent text-xs",
                  item.isActive && "bg-accent"
                )}
              >
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

export default Lists;
