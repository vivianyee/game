"use server";
import { revalidateTag } from "next/cache";

export async function refreshGames(path: string) {
  revalidateTag(path); 
}
