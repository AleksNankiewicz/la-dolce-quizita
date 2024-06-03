"use client";
import React, { ChangeEvent, useState } from "react";
import { ImagePlusIcon } from "lucide-react";
import Image from "next/image";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";

type ImageInputProps = {
  image?: string | null;
  onImageChange?: (image: File | null) => void;
  title?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
};

function ImageInput({
  image,
  onImageChange,
  title,
  placeholder,
  className,
  containerClassName,
}: ImageInputProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const showImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

      if (!validTypes.includes(file.type)) {
        setError(
          "Niepoprawny format zdjęcia. Obsługiwane formaty to: JPEG, PNG, GIF, WEBP.",
        );
        setSelectedImage(null);
        if (onImageChange) {
          onImageChange(null);
        }
        return;
      }

      setError(null);
      setSelectedImage(file);
      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  return (
    <div
      className={cn("flex flex-col justify-center gap-4", containerClassName)}
    >
      {title && <h1 className="text-lg font-medium">{title}</h1>}
      <label
        htmlFor="imgInputmain"
        className={cn(
          "relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl text-center dark:bg-muted md:flex-1",
          className,
        )}
      >
        {selectedImage ||
        (image && image !== "undefined" && image !== "null") ? (
          <Image
            draggable={false}
            alt="quizphoto"
            src={selectedImage ? URL.createObjectURL(selectedImage) : image!}
            width={2000}
            height={2000}
            className="rounded-tr-xl"
          />
        ) : (
          <div className="col-span-2 flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-primary text-primary dark:text-white">
            <ImagePlusIcon size={50} />
            <p className="text-xl font-semibold">{placeholder}</p>
          </div>
        )}

        <Input
          type="file"
          name="file-main"
          id="imgInputmain"
          className="hidden"
          onChange={showImage}
        />
      </label>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}

export default ImageInput;
