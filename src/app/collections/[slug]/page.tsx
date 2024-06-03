import Navbar from "@/components/layouts/Navbar";
import CollectionNavbar from "@/components/pages/collections/slug/CollectionNavbar";
import EditCollectionDialog from "@/components/pages/profile/collections/EditCollectionDialog";
import { db } from "@/lib/db";
import Image from "next/image";
import React from "react";

const page = async ({ params }: any) => {
  const { slug } = params;

  const collection = await db.collection.findFirst({
    where: {
      slug: slug,
    },
    include: {
      quizzes: true,
    },
  });

  if (!collection) return;
  return (
    <>
      <Navbar title={collection.title} exit>
        <EditCollectionDialog collection={collection} isEditing />
      </Navbar>
      <div className="flex flex-col">
        {collection?.img && (
          <div className="relative aspect-[5/3] flex-1 overflow-hidden rounded-xl">
            <Image
              src={collection.img}
              alt={collection.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default page;
