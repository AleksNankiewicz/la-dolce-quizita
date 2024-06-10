import CollectionBlock from "@/components/layouts/blocks/CollectionBlock";

import { db } from "@/lib/db";
import React from "react";

const page = async () => {
  const collections = await db.collection.findMany();

  return (
    <>
      {/* <CollectionsNavbar /> */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {collections.map((collection) => (
          <CollectionBlock key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
};

export default page;
