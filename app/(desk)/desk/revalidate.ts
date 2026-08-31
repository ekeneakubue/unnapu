"use server";

import { revalidatePath } from "next/cache";

export async function revalidateDeskUsers() {
  revalidatePath("/super-admin/users");
  revalidatePath("/director/users");
}

export async function revalidateDeskPublications() {
  revalidatePath("/super-admin/publications");
  revalidatePath("/director/publications");
  revalidatePath("/external-assessor");
  revalidatePath("/external-assessor/publications");
}
