"use client";
import React from "react";
import ContentEditable, {
  ContentEditableProps,
} from "@/components/ui/ContentEditable";
import { cn } from "@/lib/utils";

interface UnderlineInputProps extends ContentEditableProps {
  title: string;
  containerClassName?: string;
}

const UnderlineInput: React.FC<UnderlineInputProps> = ({
  title,
  value,
  onBlur,
  placeholder,
  className,
  error,
  errorMessage,
  containerClassName,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "col-span-2 flex w-full flex-col justify-center gap-2 rounded-xl",
        containerClassName,
      )}
    >
      <h1 className="text-lg font-medium">{title}</h1>
      <ContentEditable
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        className={cn(
          `border-2 border-transparent border-b-primary pb-2 text-xl font-semibold`,
          className,
        )}
        error={error}
        errorMessage={errorMessage}
        {...rest}
      />
    </div>
  );
};

export default UnderlineInput;
