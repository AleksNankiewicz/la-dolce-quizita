import CollectionBlock from "@/components/layouts/blocks/CollectionBlock";
import ProfileSorting from "@/components/pages/profile/ProfileSorting";
import { db } from "@/lib/db";

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
      <ProfileSorting title="Kolekcje" length={collections.length} />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {collections.map((collection) => (
          <CollectionBlock key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default page;
