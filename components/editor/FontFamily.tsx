"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { FontFamilyButtonProps } from "@/types";

const fontOptions = [
  { label: "Arial", value: "arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
];

const FontFamilyButton = ({ editor }: FontFamilyButtonProps) => {
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]);

  useEffect(() => {
    if (!editor) return;

    const currentFont = fontOptions.find((font) =>
      editor.isActive("textStyle", { fontFamily: font.value })
    );
    if (currentFont) {
      setSelectedFont(currentFont);
    }
  }, [editor]);

  const handleFontSelect = (font: (typeof fontOptions)[0]) => {
    setSelectedFont(font);
    editor?.chain().focus().setFontFamily(font.value).run();
  };

  if (!editor) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 max-w-[100px] justify-between"
        >
          <span style={{ fontFamily: selectedFont.value }}>
            {selectedFont.label.split(" ")[0]}
          </span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {fontOptions.map((font) => (
          <DropdownMenuItem
            key={font.label}
            onClick={() => handleFontSelect(font)}
            className="cursor-pointer flex items-center justify-between"
          >
            <span style={{ fontFamily: font.value }}>{font.label}</span>
            {selectedFont.value === font.value && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontFamilyButton;
