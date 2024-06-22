// "use server";

// import { revalidatePath } from "next/cache";

// export async function handleRevalidatePath(path: string) {
//   try {
//     const isRevalidating = await revalidatePath(path);
//     if (isRevalidating) {
//       console.log(`Revalidation successful for path: ${path}`);
//     } else {
//       console.log(`Revalidation failed for path: ${path}`);
//     }
//   } catch (error) {
//     console.error(`Error revalidating path: ${path}`, error);
//   }
// }
