"use client";
import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

type TooltipButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  content?: string;
};

const TooltipButton = ({ children, content, onClick }: TooltipButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipButton;
