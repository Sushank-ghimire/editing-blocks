"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { PaginationStatus, useMutation } from "convex/react";
import { Building, Loader, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TableActions from "./TableActions";
import { api } from "@/convex/_generated/api";

export interface IDocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (noOfItems: number) => void;
  status: PaginationStatus;
}

const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: IDocumentsTableProps) => {
  const remove = useMutation(api.documents.deleteDocumentsById);

  const handleDocumentOpen = (documentId: Id<"documents">) => {
    window.open(`/documents/${documentId}/editor`);
  };

  const handleDocumentDelete = async (documentId: Id<"documents">) => {
    await remove({ id: documentId });
  };

  if (documents === undefined) {
    return (
      <div className="w-full py-10 flex items-center justify-center">
        <Loader className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-6 space-y-4">
      <Table className="w-full border border-border rounded-xl overflow-hidden shadow-sm">
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Shared</TableHead>
            <TableHead className="font-semibold">Created</TableHead>
            <TableHead className="font-semibold text-right pr-6">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {documents.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-6"
              >
                No Documents Found
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc) => (
              <TableRow
                key={doc._id}
                className="hover:bg-muted/20 cursor-pointer transition"
              >
                <TableCell className="font-medium truncate max-w-[200px]">
                  {doc.title || "Untitled Document"}
                </TableCell>

                <TableCell className="text-left">
                  {doc.organizationId ? (
                    <div className="flex justify-start items-center gap-3">
                      <Building className="size-4" />
                      Organization
                    </div>
                  ) : (
                    <div className="flex items-center justify-start gap-3">
                      <UserCircle className="size-4" />
                      Personal
                    </div>
                  )}
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {new Date(doc._creationTime).toLocaleString()}
                </TableCell>

                <TableCell className="text-right flex justify-end">
                  <TableActions
                    handleDeleteDocument={() => {
                      handleDocumentDelete(doc._id);
                    }}
                    handleEditDocument={() => {
                      handleDocumentOpen(doc._id);
                    }}
                    documentId={doc._id}
                    documentName={doc.title}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {status === "CanLoadMore" && (
        <div className="flex justify-center">
          <Button
            variant="default"
            onClick={() => loadMore(5)}
            className="mt-2"
          >
            Load More
          </Button>
        </div>
      )}

      {status === "LoadingMore" && (
        <div className="flex justify-center py-4">
          <Loader className="animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default DocumentsTable;
