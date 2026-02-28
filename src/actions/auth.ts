"use server";

import prisma from "@/lib/prisma";
import { hash, compare } from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    // Securely hash the password
    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "Email already exists" };
    }
    return { error: "Something went wrong" };
  }
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "Email or password incorrect" };
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return { error: "Email or password incorrect" };
    }

    // Set a basic session cookie (simplest implementation)
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify({ 
      userId: user.id, 
      email: user.email,
      role: (user as any).role
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) return null;
  try {
    return JSON.parse(session.value);
  } catch (error) {
    return null;
  }
}
