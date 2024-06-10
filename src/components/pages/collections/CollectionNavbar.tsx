"use client";
import useNavbarStore from "@/lib/store/useNavbarStore";
import React, { useEffect } from "react";
import EditCollectionDialog from "../profile/collections/EditCollectionDialog";
import { Collection } from "@prisma/client";
import { usePathname } from "next/navigation";

const CollectionNavbar = ({
  collection,
  isAuthor,
}: {
  collection: Collection;
  isAuthor: boolean;
}) => {
  const setNavbarComponents = useNavbarStore(
    (state) => state.setNavbarComponents,
  );

  const pathName = usePathname();

  useEffect(() => {
    if (isAuthor) {
      setNavbarComponents([
        <EditCollectionDialog
          key="edit-dialog"
          collection={collection}
          isEditing
        />,
      ]);
    } else {
      setNavbarComponents([]);
    }
  }, [collection, pathName, setNavbarComponents, isAuthor]);

  return null;
};

export default CollectionNavbar;
