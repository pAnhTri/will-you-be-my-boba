"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/utils/supabase/server";
import { loginSchema } from "@/lib/validators/login";
import { signupSchema } from "@/lib/validators/signup";

export const login = async (formData: FormData) => {
  const supabase = await createClient();

  const validatedData = loginSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const { error } = await supabase.auth.signInWithPassword(validatedData);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export const signup = async (formData: FormData) => {
  const supabase = await createClient();

  const validatedData = signupSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const { error } = await supabase.auth.signUp({
    email: validatedData.email,
    password: validatedData.password,
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
};
