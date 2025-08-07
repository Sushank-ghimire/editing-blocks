"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { CloudCheck } from "lucide-react";
import React, { useRef, useState, useEffect, KeyboardEvent, FC } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface DocumentInputProps {
  document: Doc<"documents">;
  onTitleChange?: (newTitle: string) => void;
}

const DocumentInput: FC<DocumentInputProps> = ({ document, onTitleChange }) => {
  const [value, setValue] = useState(document.title ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const rename = useMutation(api.documents.updateDocumentById);

  const handleDocumentRename = async () => {
    await rename({ id: document._id, title: value.trim() });
    toast.success("document updated successfully");
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when editing starts
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (onTitleChange && value !== document.title) {
      onTitleChange(value.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur(); // Trigger blur to save
      handleDocumentRename();
    } else if (e.key === "Escape") {
      setValue(document.title ?? ""); // Revert
      handleDocumentRename();
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2 max-w-full">
      {isEditing ? (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-lg font-medium max-w-[150px] truncate border-none shadow-none outline-none w-fit"
          placeholder="Untitled Document"
          aria-label="Edit document title"
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className="text-lg font-medium truncate cursor-pointer px-1.5"
          title={document.title}
          aria-label="Document title"
        >
          {document.title || "Untitled Document"}
        </span>
      )}
      <CloudCheck className="w-5 h-5 text-muted-foreground" />
    </div>
  );
};

export default DocumentInput;
