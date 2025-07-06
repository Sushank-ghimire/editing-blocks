"use client";

import { Plus, Minus } from "lucide-react";
import React, { memo, useState, useRef } from "react";
import { Editor } from "@tiptap/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToolbarButton from "../ToolbarButton";

const FontsizeButton = ({ editor }: { editor: Editor }) => {
  const currentFontSize =
    editor?.getAttributes("textStyle").fontSize?.replace("px", "") || "16";

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [isEditing, setIsEditing] = useState(false);

  if (!editor) return null;

  const updateEditorFontSize = (size: string) => {
    const value = parseInt(size);
    if (!isNaN(value) && value > 0) {
      editor.chain().focus().setFontSize(`${value}px`).run();
      setFontSize(size);
    }
  };

  const handleIncrement = () => {
    const newSize = (parseInt(fontSize) + 2).toString();
    updateEditorFontSize(newSize);
  };

  const handleDecrement = () => {
    const newSize = Math.max(parseInt(fontSize) - 2, 1).toString();
    updateEditorFontSize(newSize);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFontSize(value);
    updateEditorFontSize(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="flex gap-2 justify-center items-center w-fit">
      <ToolbarButton
        label="Decrement Font Size"
        onClick={handleDecrement}
        icon={Minus}
      />

      {isEditing ? (
        <Input
          ref={inputRef}
          value={fontSize}
          onChange={handleChange}
          onBlur={() => setIsEditing(false)}
          onKeyDown={handleKeyDown}
          className="max-w-[60px]  text-center"
          min={8}
        />
      ) : (
        <Button
          onClick={() => {
            setIsEditing(true);
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
          className="text-foreground w-fit font-bold bg-transparent hover:bg-accent"
          type="button"
        >
          {currentFontSize}
        </Button>
      )}

      <ToolbarButton
        label="Increment Font Size"
        onClick={handleIncrement}
        icon={Plus}
      />
    </div>
  );
};

export default memo(FontsizeButton);
