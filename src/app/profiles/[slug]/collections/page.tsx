import CollectionBlock from "@/components/layouts/blocks/CollectionBlock";
import EditCollectionDialog from "@/components/pages/profile/collections/EditCollectionDialog";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowUpDown, Plus } from "lucide-react";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const { slug } = params;
  const collections = await db.collection.findMany({
    where: {
      author: {
        slug: slug,
      },
    },
  });

  return (
    <div className="">
      <div className="flex justify-between py-10">
        <h1 className="text-2xl font-semibold">
          Kolekcje ({collections.length})
        </h1>
        <div className="flex gap-2 text-xl font-semibold text-purple-500">
          <p className="">Najnowsze</p>
          <ArrowUpDown />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {collections.map((collection) => (
          <CollectionBlock key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default page;
