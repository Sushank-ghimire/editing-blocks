"use client";
import { useParams } from "next/navigation";

export default function DocumentsPage() {
  const params = useParams();
  return (
    <main className="flex min-h-screen w-screen justify-center items-center text-xl">
      Document slug : {params.slug}
    </main>
  );
}
