"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Image as ImageIcon, UploadIcon } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import useEditorStore from "@/store/useEditor";

const AddImageButton = () => {
  const { editor } = useEditorStore();
  const [image, setImage] = useState("");

  if (!editor) {
    return null;
  }

  const handleLinkChange = (imageLink: string) => {
    editor.chain().focus().setImage({ src: imageLink }).run();
    setImage("");
  };

  const handleUploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);
        handleLinkChange(imageURL);
      }
    };
    input.click();
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <Button className="hover:bg-accent bg-transparent w-fit p-1.5">
              <ImageIcon className="size-5 text-foreground" />
              <TooltipContent>Add Image</TooltipContent>
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col p-2 gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Upload URL</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Insert Your Image URL : </DialogTitle>
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image Url"
                required
                type="url"
              />
              <DialogFooter>
                <Button disabled={!image}>Insert In Document</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            className="w-full gap-2 justify-center items-center"
            onClick={handleUploadImage}
          >
            Upload Image
            <UploadIcon />
          </Button>
        </DropdownMenuContent>
      </Tooltip>
    </DropdownMenu>
  );
};

export default memo(AddImageButton);
