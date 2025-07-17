import { Doc } from "@/convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";
import { useRouter } from "nextjs-toploader/app";

interface IDocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (noOfItems: number) => void;
  status: PaginationStatus;
}

const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: IDocumentsTableProps) => {
  const router = useRouter();
  const handleDocumentOpen = async (documentId: string) => {
    router.push(`/documents/${documentId}/editor`);
  };
  console.log(documents);

  return <div>DocumentsTable</div>;
};

export default DocumentsTable;
