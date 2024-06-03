import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export type ContentEditableProps = {
  onBlur: (newValue: string) => void;
  value: string | null;
  placeholder?: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  children?: React.ReactNode;
};

const ContentEditable: React.FC<ContentEditableProps> = ({
  onBlur,
  value,
  placeholder,
  className,
  error,
  errorMessage,
  children,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleBlur = () => {
    if (ref.current) {
      const newValue = ref.current.innerText;
      setCurrentValue(newValue);
      onBlur(newValue);
    }
  };

  const handleFocus = () => {
    if (ref.current && !currentValue) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(ref.current, 0);
      range.collapse(true);
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  return (
    <div className="relative col-span-full w-full">
      <p
        ref={ref}
        className={cn(
          "w-full cursor-text break-words supports-[not(overflow-wrap:anywhere)]:[word-break:normal] supports-[overflow-wrap:anywhere]:[overflow-wrap:anywhere]",
          className,
          error && "",
          !currentValue && "placeholder",
        )}
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onFocus={handleFocus}
        data-placeholder={placeholder}
      >
        {currentValue}
      </p>
      {error && errorMessage && (
        <p className="mt-2 font-semibold text-red-500">{errorMessage}</p>
      )}
      {children}
    </div>
  );
};

export default ContentEditable;
