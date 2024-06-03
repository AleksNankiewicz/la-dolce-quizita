"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { badgeVariants } from "@/components/ui/badge";
import { User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPen } from "react-icons/fa";
import ContentEditable from "@/components/ui/ContentEditable";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { editUser } from "@/lib/actions/editUser";
import { uploadImages } from "@/lib/actions/uploadImages";
import { Pencil } from "lucide-react";
import { revalidateTag } from "next/cache";
const EditProfileDialog = ({ user }: { user: User }) => {
  const [image, setImage] = useState<any>(user.img);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [desc, setDesc] = useState(user.desc);

  const showImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];

      setImage(selectedImage);
    }
  };

  const saveChanges = async () => {
    const formData = new FormData();

    formData.append("file", image);

    const imageRef = await uploadImages(formData);

    await editUser(user.id, firstName, lastName, imageRef[0], desc);
  };

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>
        <p className="hidden md:block">Edytuj Profil</p>
        <Pencil className="md:hidden" />
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-3xl">
        <DialogHeader>
          <DialogTitle>Edytuj Profil</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <label
              htmlFor={`imgInputmain`}
              className="relative h-[120px] w-[120px] cursor-pointer transition-opacity duration-200 hover:opacity-85"
            >
              <Avatar className="h-full w-full">
                <AvatarImage
                  src={
                    image
                      ? typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                      : "/noavatar.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-2 rounded-md bg-primary p-1">
                <FaPen className=" " />
              </div>
              <Input
                type="file"
                name={`file-main`}
                id={`imgInputmain`}
                className="hidden"
                onChange={(e) => showImage(e)}
              />
            </label>
            <div className="flex w-full flex-col gap-1 md:w-auto">
              <h1 className="text-lg font-medium">Imię</h1>
              <ContentEditable
                value={user.firstName}
                onBlur={(value) => setFirstName(value)}
                placeholder="tu wpisz imie"
                className="border-2 border-transparent border-b-primary pb-2 text-xl font-semibold"
              />
            </div>
            <div className="flex w-full flex-col gap-1 md:w-auto">
              <h1 className="text-lg font-medium">Nazwisko</h1>
              <ContentEditable
                value={user.lastName}
                onBlur={(value) => setLastName(value)}
                placeholder="tu wpisz nazwisko"
                className="max-w-full overflow-hidden border-2 border-transparent border-b-primary pb-2 text-xl font-semibold"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-medium">Opis</h1>
            <ContentEditable
              value={desc}
              onBlur={(value) => setDesc(value)}
              placeholder="tu wpisz opis"
              className="border-2 border-transparent border-b-primary pb-2 text-xl font-semibold"
            />
          </div>
        </div>
        <Separator />
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

export default EditProfileDialog;
