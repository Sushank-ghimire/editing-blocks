import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, EllipsisVertical, Trash } from "lucide-react";

interface ITableActionsProps {
  handleDeleteDocument: (docId: string) => void;
  handleEditDocument: (docId: string) => void;
  documentId: string;
}

const TableActions = ({
  handleDeleteDocument,
  handleEditDocument,
  documentId,
}: ITableActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <EllipsisVertical className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => {
            handleEditDocument(documentId);
          }}
          className="flex justify-between items-center gap-2"
        >
          Edit
          <Edit className="size-4 text-muted-foreground" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <button
            onClick={() => {
              handleDeleteDocument(documentId);
            }}
            className="flex w-full text-destructive justify-between items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-destructive/10 transition"
          >
            Delete
            <Trash className="size-4 text-destructive" />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
