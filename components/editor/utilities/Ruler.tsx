"use client";
import { MarkerProps } from "@/types";
import { Editor } from "@tiptap/core";
import { Triangle } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useRef, useState } from "react";

const markers = Array.from({ length: 102 }, (_, i) => i);

const Ruler = ({ editor }: { editor: Editor }) => {
  const [leftMargin, setLeftMargin] = useState(0);
  const [rightMargin, setRightMargin] = useState(0);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement | null>(null);

  if (!editor) return null;

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };
  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(0);
  };
  const handleRightDoubleClick = () => {
    setRightMargin(0);
  };

  // const handleMouseMove = (e: React.MouseEvent) => {
  //   if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
  //     const container = rulerRef.current.querySelector("#rulerContainer");
  //     if (container) {
  //       const containerRect = container.getBoundingClientRect();
  //       const relativeX = e.clientX - containerRect.left;
  //       const rawPosition = Math.max(0, Math.min(780, relativeX));
  //       if (isDraggingLeft) {
  //         const maxLeftPosition = 780 - rightMargin - 100;
  //         const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
  //         setLeftMargin(newLeftPosition);
  //       } else if (isDraggingRight) {
  //         const maxRightPosition = 780 - leftMargin - 100;
  //         const newRightPosition = Math.max(0, 780 - rawPosition);
  //         const constrainedRightPosition = Math.min(
  //           newRightPosition,
  //           maxRightPosition
  //         );
  //         setRightMargin(constrainedRightPosition);
  //       }
  //     }
  //   }
  // };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector(
        "#rulerContainer"
      ) as HTMLDivElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left; // Distance from left edge
        const width = containerRect.width;

        const clampedX = Math.max(0, Math.min(width, relativeX));

        if (isDraggingLeft) {
          const maxLeft = width - rightMargin - 100;
          const newLeft = Math.min(clampedX, maxLeft);
          setLeftMargin(newLeft);
        }

        if (isDraggingRight) {
          const distanceFromRight = width - clampedX;
          const maxRight = width - leftMargin - 100;
          const newRight = Math.min(distanceFromRight, maxRight);
          setRightMargin(newRight);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="h-6 w-full flex items-center border-b print:hidden border-border justify-center"
    >
      <div id="rulerContainer" className="w-full h-full relative">
        <Marker
          position={leftMargin}
          isLeft
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClisk={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClisk={handleRightDoubleClick}
        />
        <div className="w-full h-full inset-0 bottom-0">
          <div className="relative h-full w-full">
            {markers.map((marker) => {
              const position = (marker * 820) / 84;
              return (
                <div
                  key={marker}
                  style={{ left: `${position}px` }}
                  className="bottom-0 absolute"
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="w-[1px] bottom-0 bg-accent-foreground absolute h-2" />
                      <div className="text-[10px] text-foreground bottom-2 absolute transform -translate-x-0.5">
                        {marker / 10 + 1}
                      </div>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="w-[1px] bottom-0 bg-accent-foreground absolute h-1.5" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="w-[1px] bottom-0 bg-accent-foreground absolute h-1.5" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ruler;

const Marker = ({
  position,
  isDragging,
  onDoubleClisk,
  onMouseDown,
  isLeft,
}: MarkerProps) => {
  const { theme } = useTheme();
  return (
    <div
      className="absolute -top-0.5 h-full cursor-ew-resize z-[5] group"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
    >
      <div onMouseDown={onMouseDown} onDoubleClick={onDoubleClisk}>
        <Triangle className="absolute size-4 rotate-180 left-1/2 top-0 h-full -translate-1/2 text-primary" />{" "}
        <div
          style={{
            height: "100vh",
            color: theme === "dark" ? "white" : "black",
            transform: "scaleX(0.5)",
            display: isDragging ? "block" : "none",
            width: "1px",
          }}
          className="absolute left-1/2 z-10 top-4 bottom-0 bg-foreground -translate-x-1/2"
        />
      </div>
    </div>
  );
};
