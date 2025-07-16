"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "@/constants/templates";

const TemplatesGallary = () => {
  return (
    <div className="w-full flex-col flex items-center h-fit p-6 text-foreground">
      {/* Heading */}
      <div className="font-medium flex flex-col gap-4 px-8 mb-6">
        <h2 className="text-xl font-semibold">Start with a new document</h2>
      </div>

      {/* Carousel with Background-Filled Template Cards */}
      <div className="w-full p-8 md:p-6 mx-auto select-none">
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {templates.map((template) => (
              <CarouselItem
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
                    <p className="text-sm font-medium truncate">
                      {template.label}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default TemplatesGallary;
