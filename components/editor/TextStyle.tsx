"use client";

import { TextStyleProps } from "@/types";
import { type ColorResult } from "react-color";
import { CirclePicker } from "react-color";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";

const TextStyle = ({ editor }: TextStyleProps) => {
  if (!editor) {
    return null;
  }

  const [currentColor, setCurrentColor] = useState("");

  const handleOnChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
    editor.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          style={{
            backgroundColor: currentColor,
          }}
          className="bg-accent text-foreground p-1.5 flex justify-center items-center h-fit"
        >
          <span>A</span>
          <div
            style={{ backgroundColor: currentColor }}
            className="w-full"
          ></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <CirclePicker
          onChange={handleOnChange}
          colors={[
            "#000000",
            "#4B5563",
            "#6B7280",
            "#9CA3AF",
            "#D1D5DB",
            "#F3F4F6",
            "#FFFFFF", // neutrals
            "#EF4444",
            "#F97316",
            "#F59E0B",
            "#10B981",
            "#3B82F6",
            "#6366F1",
            "#8B5CF6",
            "#EC4899", // vibrant
            "#DC2626",
            "#EA580C",
            "#D97706",
            "#059669",
            "#2563EB",
            "#4F46E5",
            "#7C3AED",
            "#DB2777", // darker shades
          ]}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TextStyle;
