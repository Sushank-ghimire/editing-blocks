import { Editor } from "@tiptap/core";
import { LucideIcon } from "lucide-react";

export type EditorType = Editor | null;

export interface EditorToolbarProps {
  editor: EditorType;
}

export interface FontFamilyButtonProps {
  editor: EditorType;
}

export interface ToolbarButtonProps {
  isActive?: boolean;
  icon: LucideIcon;
  onClick: () => void;
  alt?: string;
  disabled?: boolean;
  label: string;
}

export interface TextStyleProps {
  editor: EditorType;
}

export type HighLightColorProps = TextStyleProps;

export type AddLinkButtonProps = TextStyleProps;

export type AddImageButtonProps = TextStyleProps;

export interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClisk: () => void;
}
