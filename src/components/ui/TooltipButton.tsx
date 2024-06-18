"use client";
import React, { useState, forwardRef, Ref } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

type TooltipButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  content?: string | undefined | null | false;
};

const TooltipButton = forwardRef(
  (
    { children, content, onClick }: TooltipButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const [open, setOpen] = useState(false);

    return (
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild ref={ref}>
          {children}
        </TooltipTrigger>
        {content && <TooltipContent>{content}</TooltipContent>}
      </Tooltip>
    );
  },
);

TooltipButton.displayName = "TooltipButton";

export default TooltipButton;
