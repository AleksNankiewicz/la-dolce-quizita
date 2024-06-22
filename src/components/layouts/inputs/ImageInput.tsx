"use client";
import React, { ChangeEvent, useState } from "react";
import { ImagePlusIcon, Pen, Trash } from "lucide-react";
import Image from "next/image";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

type ImageInputProps = {
  inputId?: string;
  image?: string | null;
  onImageChange?: (image: File | null) => void;
  title?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  iconSize?: number;
  containImage?: boolean;
};

function ImageInput({
  inputId = "imgInputmain",
  image,
  onImageChange,
  title,
  placeholder,
  className,
  containerClassName,
  iconSize = 50,
  containImage,
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

  const handleImageDelete = () => {
    setSelectedImage(null);
    if (onImageChange) {
      onImageChange(null);
    }
  };

  return (
    <div
      className={cn("flex flex-col justify-center gap-2", containerClassName)}
    >
      {title && <h1 className="text-lg font-medium">{title}</h1>}
      <div
        className={cn(
          "group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl text-center dark:bg-muted md:flex-1",
          className,
        )}
      >
        {selectedImage ||
        (image && image !== "undefined" && image !== "null") ? (
          <>
            <div className="bg-blue-400">
              <Image
                draggable={false}
                alt="quizphoto"
                src={
                  selectedImage ? URL.createObjectURL(selectedImage) : image!
                }
                fill={containImage}
                width={!containImage ? 2000 : undefined}
                height={!containImage ? 2000 : undefined}
                className="rounded-tr-xl object-contain"
              />
            </div>
            <div className="absolute bottom-3 right-3 flex gap-2 sm:hidden sm:group-hover:flex">
              <label
                htmlFor={inputId}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "flex cursor-pointer items-center gap-2 rounded-xl bg-card p-2",
                )}
              >
                <p>Edytuj</p>
                <Pen size={17} />
              </label>
              <Button
                variant={"outline"}
                onClick={handleImageDelete}
                className="flex items-center gap-2 rounded-xl bg-card p-2"
              >
                <Trash size={17} />
              </Button>
            </div>
          </>
        ) : (
          <label
            htmlFor={inputId}
            className="col-span-2 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-primary text-primary dark:text-white"
          >
            <ImagePlusIcon size={iconSize} />
            <p className="text-xl font-semibold">{placeholder}</p>
          </label>
        )}

        <Input
          type="file"
          name="file-main"
          id={inputId}
          className="hidden"
          onChange={showImage}
        />
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}

export default ImageInput;
