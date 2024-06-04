import React from "react";
import ProfileNavbar from "@/components/pages/profile/ProfileNavbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { db } from "@/lib/db";

import ProfileNavigation from "@/components/pages/profile/ProfileNavigation";
import EditCollectionDialog from "@/components/pages/profile/collections/EditCollectionDialog";
import { emptyCollection } from "@/lib/constants/emptyCollection";
import { headers } from "next/headers";
import { auth } from "@/auth";
const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) => {
  const { slug } = params;

  const session = await auth();

  const authUser = session?.user;

  const user = await db.user.findFirst({
    where: {
      slug: slug,
    },
    include: {
      _count: {
        select: {
          createdQuizzes: true,
          favoriteQuizzes: true,
          collections: true,
        },
      },
    },
  });

  const createdQuizzesCount = user?._count?.createdQuizzes ?? 0;
  const favoriteQuizzesCount = user?._count?.favoriteQuizzes ?? 0;
  const createdCollectionsCount = user?._count?.collections ?? 0;

  if (!user) return;

  return (
    <>
      <ProfileNavbar user={user} isUserProfile={user.id == authUser?.id} />

      <main className="mt-8">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex items-center gap-5">
            <Avatar className="h-[70px] w-[70px] sm:h-[200px] sm:w-[200px]">
              <AvatarImage
                src={user?.image || "/noavatar.png"}
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <span className="flex gap-2">
                <h1 className="text-xl font-semibold">{user?.name}</h1>
                <h1 className="text-xl font-semibold">{user?.firstName}</h1>
                <h1 className="text-xl font-semibold">{user?.lastName}</h1>
              </span>
              <p>{user?.desc}</p>
            </div>
          </div>
          {/* <div className="flex justify-between divide-x border-y">
            <div className="flex w-1/3 flex-col items-center justify-center p-4">
              <h1 className="text-xl font-semibold">{createdQuizzesCount}</h1>
              <p>Quizy</p>
            </div>
            <div className="flex w-1/3 flex-col items-center justify-center p-4">
              <h1 className="text-xl font-semibold">{favoriteQuizzesCount}</h1>
              <p>Ulubione</p>
            </div>
            <div className="flex w-1/3 flex-col items-center justify-center p-4">
              <h1 className="text-xl font-semibold">
                {createdCollectionsCount}
              </h1>
              <p>Kolekcje</p>
            </div>
          </div> */}
          <ProfileNavigation slug={slug} />
        </div>
        {children}
      </main>
      {user.id == authUser?.id ? (
        <EditCollectionDialog
          collection={{
            ...emptyCollection,
            authorId: user.id,
          }}
        ></EditCollectionDialog>
      ) : null}
    </>
  );
};

export default layout;
