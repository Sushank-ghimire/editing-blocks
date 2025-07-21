import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, EllipsisVertical, ExternalLink } from "lucide-react";
import DeleteAlertDialog from "./DeleteAlertDialog";
import { Id } from "@/convex/_generated/dataModel";
import RenameDocumentDialog from "./rename-document-dialog";
import { useRouter } from "nextjs-toploader/app";

interface ITableActionsProps {
  handleDeleteDocument: () => void;
  handleEditDocument: () => void;
  documentId: Id<"documents">;
  documentName?: string;
}

const TableActions = ({
  handleDeleteDocument,
  handleEditDocument,
  documentId,
  documentName = "",
}: ITableActionsProps) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <EllipsisVertical className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={handleEditDocument} asChild>
          <RenameDocumentDialog
            currentName={documentName}
            documentId={documentId}
          />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            handleEditDocument();
          }}
          asChild
        >
          <Button
            variant="ghost"
            className="w-full text-muted-foreground justify-between hover:bg-muted"
          >
            Open in new tab
            <ExternalLink className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={(e) => {
            router.push(`/documents/${documentId}/editor`);
          }}
          asChild
        >
          <Button
            variant="ghost"
            className="w-full text-muted-foreground justify-between hover:bg-muted"
          >
            Edit
            <Edit className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          onClick={(e) => e.stopPropagation()}
          className="w-full"
          asChild
        >
          <DeleteAlertDialog onConfirm={handleDeleteDocument} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
