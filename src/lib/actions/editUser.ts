"use server";

import { revalidateTag } from "next/cache";
import { db } from "../db";

export const editUser = async (
  id: string,
  firstName: string,
  lastName: string,
  img: string,
  desc: string | null,
) => {
  try {
    const user = await db.user.update({
      where: { id: id },
      data: {
        firstName,
        lastName,
        img,
        desc,
      },
    });

    console.log("User updated successfully:", user);
    revalidateTag("profile");
    return user;
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user: " + error.message);
  }
};
