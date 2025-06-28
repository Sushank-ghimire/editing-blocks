"use client";
import Editor from "@/components/editor/Editor";
import { useParams } from "next/navigation";

export default function DocumentsPage() {
  const params = useParams();
  return (
    <main className="">
      <Editor />
    </main>
  );
}
