"use client";

import { TextStyleProps } from "@/types";
import { SketchPicker, type ColorResult } from "react-color";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { memo, useState } from "react";
import { CloudMoonRainIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const TextStyle = ({ editor }: TextStyleProps) => {
  const [currentColor, setCurrentColor] = useState("");
  if (!editor) {
    return null;
  }
  const handleOnChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
    editor.chain().focus().setColor(color.hex).run();
  };

  return (
    <Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <Button
              style={{
                backgroundColor: currentColor,
              }}
              className="hover:bg-accent bg-transparent text-foreground"
            >
              <CloudMoonRainIcon />
              <TooltipContent>Colors</TooltipContent>
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <SketchPicker onChange={handleOnChange} color={currentColor} />
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
  );
};

export default memo(TextStyle);
