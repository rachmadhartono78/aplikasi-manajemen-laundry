"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCustomers() {
  try {
    return await prisma.customer.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return [];
  }
}

export async function createOrder(data: {
  userId: number;
  customerId?: number;
  customerData?: { name: string; phone: string; address?: string };
  items: { serviceId: number; quantity: number }[];
  paymentStatus: "UNPAID" | "PAID" | "PARTIAL";
  paymentMethod?: "CASH" | "QRIS" | "TRANSFER" | "DEBIT";
  notes?: string;
  dueDate?: Date;
}) {
  try {
    let finalCustomerId = data.customerId;

    // 1. Handle Customer (Find or Create)
    if (!finalCustomerId && data.customerData) {
      const existingCustomer = await prisma.customer.findUnique({
        where: { phone: data.customerData.phone },
      });

      if (existingCustomer) {
        finalCustomerId = existingCustomer.id;
      } else {
        const newCustomer = await prisma.customer.create({
          data: {
            name: data.customerData.name,
            phone: data.customerData.phone,
            address: data.customerData.address,
          },
        });
        finalCustomerId = newCustomer.id;
      }
    }

    if (!finalCustomerId) {
      return { error: "Customer information is required" };
    }

    // 2. Fetch Services to calculate prices and total
    const serviceIds = data.items.map(item => item.serviceId);
    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
    });

    const itemsWithPrices = data.items.map(item => {
      const service = services.find(s => s.id === item.serviceId);
      if (!service) throw new Error(`Service with ID ${item.serviceId} not found`);
      return {
        serviceId: item.serviceId,
        quantity: item.quantity,
        price: Number(service.price) * item.quantity,
      };
    });

    const totalPrice = itemsWithPrices.reduce((sum, item) => sum + item.price, 0);

    // 3. Create Order with Items
    const order = await prisma.order.create({
      data: {
        userId: data.userId,
        customerId: finalCustomerId,
        totalPrice,
        paymentStatus: data.paymentStatus,
        paymentMethod: data.paymentMethod,
        notes: data.notes,
        dueDate: data.dueDate,
        status: "RECEIVED",
        items: {
          create: itemsWithPrices.map(item => ({
            serviceId: item.serviceId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        customer: true,
        items: true,
      }
    });

    // 4. Update Customer Stats (CRM/Loyalty)
    // Simple logic: 1 point per 10k spent
    const earnedPoints = Math.floor(totalPrice / 10000);
    await prisma.customer.update({
      where: { id: finalCustomerId },
      data: {
        loyaltyPoints: { increment: earnedPoints },
        totalSpend: { increment: totalPrice },
      },
    });

    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { error: "Failed to create order. Please check your input." };
  }
}

export async function getOrders(filters?: { userId?: number; status?: any }) {
  try {
    const orders = await prisma.order.findMany({
      where: filters,
      include: {
        customer: true,
        items: {
          include: { service: true }
        },
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
    
    return orders.map((o: any) => ({
      ...o,
      totalPrice: Number(o.totalPrice),
      items: o.items.map((item: any) => ({
        ...item,
        price: Number(item.price),
        service: {
            ...item.service,
            price: Number(item.service.price)
        }
      }))
    }));
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}

export async function updateOrderStatus(id: number, status: any) {
  try {
    await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { error: "Failed to update order status" };
  }
}

export async function deleteOrder(id: number) {
  try {
    // Delete items first (Prisma handles this if cascading is on, but let's be safe if not explicit)
    await prisma.orderItem.deleteMany({
      where: { orderId: id },
    });
    
    await prisma.order.delete({
      where: { id },
    });
    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete order:", error);
    return { error: "Failed to delete order" };
  }
}
