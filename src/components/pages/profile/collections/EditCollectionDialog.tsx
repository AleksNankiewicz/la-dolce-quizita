"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
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
import { GradientPicker } from "@/components/ui/GradientPicker";
import { toast } from "sonner";
type EditCollectionDialogProps = {
  collection: Collection;
  isEditing?: boolean;
  // children:React.ReactNode
};
const EditCollectionDialog = ({
  collection,
  isEditing,
}: EditCollectionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [editedCollection, setEditedCollection] =
    useState<Collection>(collection);

  const [collectionImg, setCollectionImg] = useState<File | null>();

  const router = useRouter();
  const pathName = usePathname();
  const options: { value: CollectionVisibility; title: string }[] = [
    { value: "public", title: "Publiczna" },
    { value: "private", title: "Prywatna" },
  ];

  useEffect(() => {
    setEditedCollection(collection);
  }, [collection]);

  const handleDelete = async () => {
    const result = await deleteCollection(collection.id);

    if (result.success) {
      setOpen(false);
      router.back();
    }
  };

  const saveChanges = async () => {
    console.log(editedCollection.id);
    try {
      const formData = new FormData();
      if (collectionImg) {
        formData.append("file", collectionImg);
      }

      const imageRef = await uploadImages(formData);

      const promise = addOrEditCollection({
        ...editedCollection,
        img: imageRef[0] || collection.img || "",
      });

      toast.promise(promise, {
        loading: "Zapisywanie...",
        success: "Kolekcja zapisana",
        error: "Nie udało się zapisać kolekcji",
      });

      await promise;

      setOpen(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  if (!pathName.includes("/collections")) return;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {isEditing ? (
          <Button variant={"secondary"}>Edytuj</Button>
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
      <DialogContent className="w-[80%] rounded-3xl md:w-[50%] lg:w-[40%]">
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
          {/* <DropdownSelect
            title="Widocznośc"
            selectedValue={editedCollection.visibility}
            options={options}
            onChange={(value) => {
              setEditedCollection({
                ...editedCollection,
                visibility: value as CollectionVisibility,
              });
            }}
          /> */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">Kolor</p>
              <GradientPicker
                background={editedCollection.color || ""}
                setBackground={(color) => {
                  setEditedCollection({
                    ...editedCollection,
                    color: color,
                  });
                }}
              />
            </div>
            <div className="w-fit">
              <p className="pb-2 text-xl font-semibold">Widoczność kolekcji</p>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="w-full border-0 outline-none">
                    <p className="text-xl font-semibold text-purple-500">
                      {editedCollection.visibility === "public"
                        ? "Publiczna"
                        : "Prywatna"}
                    </p>
                  </MenubarTrigger>
                  <MenubarContent className="min-w-[172px] overflow-y-auto">
                    {options.map((option) => (
                      <MenubarItem
                        key={option.value}
                        className="text-xl"
                        onClick={() => {
                          setEditedCollection({
                            ...editedCollection,
                            visibility: option.value,
                          });
                        }}
                      >
                        <p>{option.title}</p>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-end">
          <Button
            onClick={saveChanges}
            className="w-full rounded-full sm:w-fit"
          >
            Zapisz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCollectionDialog;
