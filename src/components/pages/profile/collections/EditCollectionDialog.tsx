"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pen, Plus, Trash } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import ImageInput from "@/components/layouts/inputs/ImageInput";
import UnderlineInput from "@/components/layouts/inputs/UnderlineInput";
import DropdownSelect from "@/components/layouts/DropdownSelect";
import { Collection, CollectionVisibility } from "@prisma/client";
import { uploadImages } from "@/lib/actions/uploadImages";
import { addOrEditCollection } from "@/lib/actions/addOrEditCollection";
import deleteCollection from "@/lib/actions/deleteCollection";
import { usePathname, useRouter } from "next/navigation";
type EditCollectionDialogProps = {
  collection: Collection;
  isEditing?: boolean;
  // children:React.ReactNode
};
const EditCollectionDialog = ({
  collection,
  isEditing,
}: EditCollectionDialogProps) => {
  const [editedCollection, setEditedCollection] =
    useState<Collection>(collection);
  const [collectionImg, setCollectionImg] = useState<File | null>();
  const router = useRouter();
  const pathName = usePathname();
  const options: { value: CollectionVisibility; title: string }[] = [
    { value: "public", title: "Publiczna" },
    { value: "private", title: "Prywatna" },
  ];

  const handleDelete = async () => {
    const result = await deleteCollection(collection.id);

    if (result.success) {
      router.back();
    }
  };

  const saveChanges = async () => {
    const formData = new FormData();
    if (collectionImg) {
      formData.append("file", collectionImg);
    }
    const imageRef = await uploadImages(formData);

    await addOrEditCollection({
      ...editedCollection,
      img: imageRef[0] || collection.img || "",
    });
  };

  if (!pathName.includes("/collections")) return;

  return (
    <Dialog>
      <DialogTrigger>
        {isEditing ? (
          <Pen />
        ) : (
          <div
            className={cn(
              buttonVariants(),
              "fixed bottom-10 right-10 h-[52px] rounded-full",
            )}
          >
            <Plus />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="w-[80%] min-w-[80%] rounded-3xl">
        {isEditing && (
          <Trash
            size={20}
            onClick={() => handleDelete()}
            className="absolute bottom-[30px] left-[20px] top-[20px] z-50 cursor-pointer text-red-500 sm:top-auto"
          />
        )}
        <DialogHeader className="relative">
          <DialogTitle className="font-bold">
            {isEditing ? "Edytuj Kolekcje" : "Dodaj Kolekcje"}{" "}
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          <ImageInput
            image={collection.img || ""}
            onImageChange={setCollectionImg}
          />
          <UnderlineInput
            onBlur={(value) => {
              setEditedCollection({
                ...editedCollection,
                title: value,
              });
            }}
            title="Tytuł"
            value={collection.title}
            placeholder="Tutaj wpisz nazwe kolekcji"
          />
          <DropdownSelect
            title="Widocznośc"
            selectedValue={editedCollection.visibility}
            options={options}
            onChange={(value) => {
              setEditedCollection({
                ...editedCollection,
                visibility: value as CollectionVisibility,
              });
            }}
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button onClick={saveChanges} className="w-full rounded-full">
              Zapisz
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCollectionDialog;
