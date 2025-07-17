"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "@/constants/templates";
import Templates from "./Templates";

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
              <Templates key={template.id} template={template} />
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
