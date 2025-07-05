"use client";

import { HighLightColorProps } from "@/types";
import { SketchPicker, type ColorResult } from "react-color";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { memo, useState } from "react";

const HighLightColor = ({ editor }: HighLightColorProps) => {
  if (!editor) {
    return null;
  }

  const [currentColor, setCurrentColor] = useState(
    editor.getAttributes("highlight").color
  );

  const handleOnChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
    editor.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          style={{
            backgroundColor: currentColor,
          }}
          className={`text-foreground p-1.5 flex justify-center items-center h-fit ${
            editor.isActive("highlight", { color: currentColor })
              ? "bg-accent"
              : null
          }`}
        >
          <span>H</span>
          <div
            style={{ backgroundColor: currentColor }}
            className="w-full"
          ></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SketchPicker onChange={handleOnChange} color={currentColor} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(HighLightColor);
