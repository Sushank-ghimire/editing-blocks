"use client";

import { AddLinkButtonProps } from "@/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Link2 } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { Input } from "../ui/input";

const AddLinkButton = ({ editor }: AddLinkButtonProps) => {
  const [value, setValue] = useState(editor?.getAttributes("link").href || "");

  if (!editor) {
    return null;
  }

  const handleLinkChange = (link: string) => {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: link })
      .run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor.getAttributes("link").href);
        }
      }}
    >
      <Tooltip>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <Button className="hover:bg-accent bg-transparent w-fit p-1.5">
              <Link2 className="size-5 text-foreground" />
              <TooltipContent>Add Link</TooltipContent>
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-row p-2 gap-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://ghimiresushank.com.np"
          />
          <Button
            className="w-fit"
            onClick={() => {
              handleLinkChange(value);
            }}
          >
            Apply
          </Button>
        </DropdownMenuContent>
      </Tooltip>
    </DropdownMenu>
  );
};

export default memo(AddLinkButton);
