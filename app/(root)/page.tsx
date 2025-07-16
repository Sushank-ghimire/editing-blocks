"use client";

import { useQuery } from "convex/react";
import Navbar from "./_components/Navbar";
import TemplatesGallary from "./_components/template-gallary";
import { api } from "@/convex/_generated/api";

const Homepage = () => {
  const documents = useQuery(api.documents.getDocuments);
  return (
    <main className="min-h-screen w-screen">
      <div className="w-full flex h-fit items-center">
        <Navbar />
      </div>
      <div className="mt-8">
        <TemplatesGallary />
      </div>
    </main>
  );
};

export default Homepage;
