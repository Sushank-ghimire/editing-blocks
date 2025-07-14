"use client";

import { SketchPicker, type ColorResult } from "react-color";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { memo, useState } from "react";
import { HighlighterIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useEditorStore from "@/store/useEditor";

const HighLightColor = () => {
  const { editor } = useEditorStore();
  const [currentColor, setCurrentColor] = useState(
    editor?.getAttributes("highlight").color
  );
  if (!editor) {
    return null;
  }
  const handleOnChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
    editor.chain().focus().setHighlight({ color: color.hex }).run();
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
              className={`text-foreground bg-transparent hover:bg-accent w-fit flex items-center ${
                editor.isActive("highlight", { color: currentColor })
                  ? "bg-accent"
                  : null
              }`}
            >
              <HighlighterIcon />
              <TooltipContent>Highlight</TooltipContent>
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

export default memo(HighLightColor);
