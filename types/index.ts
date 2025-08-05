import { Editor } from "@tiptap/core";
import { LucideIcon } from "lucide-react";

export type EditorType = Editor | null;

export interface ToolbarButtonProps {
  isActive?: boolean;
  icon: LucideIcon;
  onClick: () => void;
  alt?: string;
  disabled?: boolean;
  label: string;
}

export interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClisk: () => void;
}

export interface IEditorStore {
  editor: null | EditorType;
  initializeEditor: (editor: EditorType) => void;
}

export interface ITemplate {
  id: string | number;
  label: string;
  logo: string;
}

export interface IDocuments {
  title: string;
  _id: string;
  initialContent: string;
  logo?: string;
}

export interface IUsers {
  id: string;
  name: string;
  avatar: string;
}

export interface IAvatarProps {
  src: string;
  name: string;
}
