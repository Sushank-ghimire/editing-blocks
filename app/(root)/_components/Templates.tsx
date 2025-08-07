"use client";

import { CarouselItem } from "@/components/ui/carousel";
import { api } from "@/convex/_generated/api";
import { ITemplate } from "@/types";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import { toast } from "sonner";

interface ITemplateProps {
  template: ITemplate;
}

const Templates = ({ template }: ITemplateProps) => {
  const router = useRouter();

  const create = useMutation(api.documents.createDocuments);

  const handleClick = async (title: string, initialContent: string) => {
    create({ title, initialContent })
      .then((documentId) => {
        toast.success("Document created");
        setTimeout(() => {
          router.push(`/documents/${documentId}`);
        }, 500);
      })
      .catch(() => {
        toast.error("Failed to create document");
      });
  };

  return (
    <CarouselItem
      onClick={() => {
        handleClick(template.label, template.initialContent);
      }}
      key={template.id}
      className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
    >
      <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border shadow-sm cursor-pointer group transition-all hover:shadow-md bg-muted hover:scale-3d">
        {/* Background Image */}
        <Image
          src={template.logo}
          alt={template.label}
          fill
          className="object-cover hover:scale-105 opacity-70 group-hover:opacity-80 transition-all"
        />

        {/* Overlay Text */}
        <div className="absolute bottom-0 w-full text-center bg-background/70 backdrop-blur-sm py-2 px-2">
          <p className="text-sm font-medium truncate">{template.label}</p>
        </div>
      </div>
    </CarouselItem>
  );
};

export default Templates;
