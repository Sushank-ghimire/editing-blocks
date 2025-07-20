"use client";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DocumentsTable from "./DocumentsTable";
import { useSearchParams } from "@/hooks/use-search-param";

const UserDocuments = () => {
  const [search] = useSearchParams("search");
  const { results, loadMore, status } = usePaginatedQuery(
    api.documents.getDocuments,
    { search },
    { initialNumItems: 5 }
  );
  return (
    <div className="w-full flex-col flex items-center h-fit p-6 text-foreground">
      {/* Heading */}
      <div className="font-medium flex flex-col gap-4 px-8 mb-6">
        <h2 className="text-xl font-semibold">Your Documents</h2>
      </div>

      {/* Carousel with Background-Filled Template Cards */}
      <div className="w-full p-8 md:p-6 mx-auto">
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
};

export default UserDocuments;
