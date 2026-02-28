"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return services.map(s => ({
      ...s,
      price: Number(s.price)
    }));
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function createService(formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const unit = (formData.get("unit") as string) || "kg";
  const description = formData.get("description") as string;

  if (!name || isNaN(price)) {
    return { error: "Name and valid price are required" };
  }

  try {
    await prisma.service.create({
      data: {
        name,
        price,
        unit,
        description,
      },
    });
    revalidatePath("/dashboard/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to create service:", error);
    return { error: "Failed to create service" };
  }
}

export async function updateService(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const unit = formData.get("unit") as string;
  const description = formData.get("description") as string;

  try {
    await prisma.service.update({
      where: { id },
      data: {
        name,
        price,
        unit,
        description,
      },
    });
    revalidatePath("/dashboard/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to update service:", error);
    return { error: "Failed to update service" };
  }
}

export async function deleteService(id: number) {
  try {
    await prisma.service.delete({
      where: { id },
    });
    revalidatePath("/dashboard/services");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete service:", error);
    return { error: "Failed to delete service" };
  }
}
