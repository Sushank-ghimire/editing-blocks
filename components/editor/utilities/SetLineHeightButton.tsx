"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Editor } from "@tiptap/core";
import { useState } from "react";

const LINE_HEIGHTS = [
  { label: "1", value: "1" },
  { label: "1.25", value: "1.25" },
  { label: "1.5", value: "1.5" },
  { label: "1.75", value: "1.75" },
  { label: "2", value: "2" },
  { label: "2.5", value: "2.5" },
  { label: "3", value: "3" },
];

const LineHeightDropdown = ({ editor }: { editor: Editor | null }) => {
  const currentValue =
    editor?.getAttributes("textStyle")?.lineHeight?.replace("px", "") || "1.5";
  const [selected, setSelected] = useState(currentValue);
  if (!editor) return null;

  const handleSelect = (value: string) => {
    editor.chain().focus().setLineHeight(value).run();
    setSelected(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 min-w-[120px] justify-between"
        >
          Line Height: {selected}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        {LINE_HEIGHTS.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => handleSelect(item.value)}
            className={`cursor-pointer ${
              selected === item.value ? "font-semibold" : ""
            }`}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LineHeightDropdown;
