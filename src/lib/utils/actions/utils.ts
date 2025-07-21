"use server";

import { revalidatePath as revalidatePathCache } from "next/cache";

export const revalidatePath = async (path: string) => {
  revalidatePathCache(path);
};
