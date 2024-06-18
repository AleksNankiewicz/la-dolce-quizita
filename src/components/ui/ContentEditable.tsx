import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
// Import your CSS file for styling

export type ContentEditableProps = {
  onBlur: (newValue: string) => void;
  onChange?: (newValue: string) => void;
  value: string | null;
  placeholder?: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  centerCursor?: boolean; // Prop to indicate centering the cursor
};

const ContentEditable: React.FC<ContentEditableProps> = ({
  onBlur,
  onChange,
  value,
  placeholder,
  className,
  error,
  errorMessage,
  centerCursor = false, // Default to false if not provided
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(value ? false : true);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsFocused(false);
    if (ref.current) {
      const newValue = ref.current.innerText;
      setCurrentValue(newValue);
      onBlur(newValue);
    }
  };

  const handleOnChange = () => {
    if (ref.current) {
      const newValue = ref.current.innerText;
      setIsEmpty(false);
      // setCurrentValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (ref.current && !currentValue) {
      const range = document.createRange();
      const sel = window.getSelection();
      const textNode = document.createTextNode("");
      ref.current.innerHTML = ""; // Clear existing content
      ref.current.appendChild(textNode);
      range.setStart(textNode, 0);
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
          "content-editable w-full cursor-text break-words supports-[not(overflow-wrap:anywhere)]:[word-break:normal] supports-[overflow-wrap:anywhere]:[overflow-wrap:anywhere]",
          className,
          error && "",
          !currentValue && "placeholder",
          isFocused && centerCursor && isEmpty && "center-cursor", // Apply centering class when focused and empty
        )}
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onInput={handleOnChange}
        data-placeholder={placeholder}
      >
        {currentValue || ""}
      </p>
      {error && errorMessage && (
        <p className="mt-2 font-semibold text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default ContentEditable;
