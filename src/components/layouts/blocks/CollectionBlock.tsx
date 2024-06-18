import { cn, getTextColorForBackground } from "@/lib/utils";
import { Collection } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CollectionBlockProps = {
  collection: Collection;
  quizzesLength?: number;
  className?: string;
};

const CollectionBlock = ({ collection, className }: CollectionBlockProps) => {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn(
        "relative flex aspect-[5/3] w-full overflow-hidden rounded-xl border",
        className,
      )}
    >
      <div className="relative h-full w-full">
        {collection.img && (
          <Image
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            blurDataURL={collection.img}
            placeholder="blur"
            src={collection.img}
            fill
            alt={collection.title}
            className="object-cover brightness-[0.60] duration-300 group-hover:scale-125"
          />
        )}
      </div>
      {collection.title && (
        <p
          className={cn(
            `absolute bottom-2 left-2 flex w-full items-center justify-start px-2 text-lg font-semibold text-white`,
            !collection.img && "text-black dark:text-white",
          )}
        >
          {collection.title}
        </p>
      )}
      {/* <div
          className="absolute bottom-2 right-2 flex items-center gap-2 rounded-md bg-primary px-2 py-1 text-xs text-white"
          style={
            collection.color
              ? {
                  backgroundColor: collection.color,
                  color: getTextColorForBackground(collection.color),
                }
              : {}
          }
        >
          <p>{getQuestionLabel(quiz.questions.length)}</p>
        </div> */}
    </Link>
  );
};

export default CollectionBlock;
