"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCustomers() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        _count: {
          select: { orders: true }
        }
      },
      orderBy: { name: "asc" },
    });
    
    return customers.map((c: any) => ({
      ...c,
      totalSpend: Number(c.totalSpend)
    }));
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return [];
  }
}

export async function createCustomer(data: { name: string; phone: string; email?: string; address?: string }) {
  try {
    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
      },
    });
    revalidatePath("/dashboard/customers");
    return { success: true, customer };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "Nomor HP sudah terdaftar." };
    }
    console.error("Failed to create customer:", error);
    return { error: "Gagal menambah pelanggan." };
  }
}

export async function updateCustomer(id: number, data: { name: string; phone: string; email?: string; address?: string }) {
  try {
    await prisma.customer.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
      },
    });
    revalidatePath("/dashboard/customers");
    revalidatePath("/dashboard/orders");
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "Nomor HP sudah digunakan oleh pelanggan lain." };
    }
    console.error("Failed to update customer:", error);
    return { error: "Gagal memperbarui data pelanggan." };
  }
}

export async function deleteCustomer(id: number) {
  try {
    // Check if customer has orders
    const orderCount = await prisma.order.count({
      where: { customerId: id }
    });

    if (orderCount > 0) {
      return { error: "Tidak bisa menghapus pelanggan yang sudah memiliki riwayat pesanan." };
    }

    await prisma.customer.delete({
      where: { id },
    });
    revalidatePath("/dashboard/customers");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete customer:", error);
    return { error: "Gagal menghapus pelanggan." };
  }
}
