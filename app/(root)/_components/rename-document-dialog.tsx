import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FilePenIcon, PenIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface IRenameDocumentDialogProps {
  documentId: Id<"documents">;
  title?: string;
  description?: string;
  currentName?: string;
}

const RenameDocumentDialog = ({
  documentId,
  title = "Rename your document",
  description = "Choose a new name for this document.",
  currentName = "",
}: IRenameDocumentDialogProps) => {
  const [name, setName] = useState(currentName);

  const rename = useMutation(api.documents.updateDocumentById);

  const handleDocumentRename = async () => {
    await rename({ id: documentId, title: name });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full text-muted-foreground justify-between hover:bg-muted"
        >
          Rename
          <PenIcon className="size-4 ml-2" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2 py-2">
          <label htmlFor="rename-input" className="text-sm font-medium">
            Document Name
          </label>
          <Input
            id="rename-input"
            placeholder="Untitled Document"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus-visible:ring-ring"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary hover:bg-primary/90 text-white flex gap-1"
            onClick={handleDocumentRename}
            disabled={!name}
          >
            <FilePenIcon className="size-4" />
            Rename
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RenameDocumentDialog;
