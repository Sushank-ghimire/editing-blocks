"use client";
import { Tooltip } from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ToolbarButtonProps } from "@/types";

const ToolbarButton = ({
  isActive = false,
  icon: Icon,
  onClick,
  alt = "icon",
  disabled = false,
  label,
}: ToolbarButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          disabled={disabled}
          type="button"
          className={clsx(
            "text-sm h-7 w-7 flex text-center border-accent rounded-sm justify-center items-center hover:bg-accent",
            isActive && "bg-accent"
          )}
          aria-pressed={isActive}
          aria-label={alt}
        >
          <Icon className="size-5 text-foreground font-semibold" />
        </button>
      </TooltipTrigger>
      {!isActive && <TooltipContent>{label}</TooltipContent>}
    </Tooltip>
  );
};

export default ToolbarButton;
