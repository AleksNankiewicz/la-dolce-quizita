import { auth } from "@/auth";
import CollectionNavbar from "@/components/pages/collections/CollectionNavbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/db";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = async ({ params }: any) => {
  const { slug } = params;
  const session = await auth();

  const user = session?.user;
  const collection = await db.collection.findFirst({
    where: {
      slug: slug,
    },
    include: {
      quizzes: true,
      author: true,
    },
  });

  if (user?.id == collection?.authorId) console.log("to autor");
  console.log(collection?.id);
  if (!collection) return;
  return (
    <>
      <CollectionNavbar
        collection={collection}
        isAuthor={user?.id == collection?.authorId}
      />
      <div className="flex flex-col gap-4">
        {collection?.img && (
          <div className="relative aspect-[5/3] min-h-[250px] w-full flex-1 overflow-hidden rounded-xl sm:aspect-auto">
            <Image
              src={collection.img}
              alt={collection.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">{collection.title}</h1>
          <div className="flex items-center gap-2 rounded-xl bg-card p-2">
            {collection.author.image && (
              <Avatar className="h-7 w-7">
                <AvatarImage src={collection.author.image} />
              </Avatar>
            )}
            <p className="text-lg font-medium">{collection.author.name}</p>
            <BadgeCheck className="text-blue-500" />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
