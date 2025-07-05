"use client";

import { AddImageButtonProps } from "@/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Image } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { Input } from "../ui/input";

const AddImageButton = ({ editor }: AddImageButtonProps) => {
  if (!editor) {
    return null;
  }
  const [image, setImage] = useState(editor.getAttributes("link").href || "");

  const handleLinkChange = (imageLink: string) => {
    setImage("");
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger>
            <Button className="bg-accent w-fit p-1.5">
              <Image className="size-5 text-foreground" />
              <TooltipContent>Add Image</TooltipContent>
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-row p-2 gap-2">
          <Input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image Url"
          />
          <Button
            className="w-fit"
            onClick={() => {
              handleLinkChange(image);
            }}
          >
            Apply
          </Button>
        </DropdownMenuContent>
      </Tooltip>
    </DropdownMenu>
  );
};

export default memo(AddImageButton);
