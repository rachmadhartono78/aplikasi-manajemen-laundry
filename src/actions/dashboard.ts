"use server";

import prisma from "@/lib/prisma";

export async function getAdminStats() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const [totalOrders, totalWeightResult, monthlyRevenue, recentOrders] = await Promise.all([
      prisma.order.count(),
      prisma.orderItem.aggregate({
        _sum: { quantity: true },
        where: {
          order: { createdAt: { gte: today } },
          service: { unit: "kg" }
        }
      }),
      prisma.order.aggregate({
        _sum: { totalPrice: true },
        where: { createdAt: { gte: firstDayOfMonth } }
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          customer: true,
          items: {
            include: { service: true }
          }
        }
      })
    ]);

    return {
      totalOrders,
      todayWeight: totalWeightResult._sum.quantity || 0,
      monthlyRevenue: Number(monthlyRevenue._sum.totalPrice) || 0,
      recentOrders: recentOrders.map((o: any) => ({
        ...o,
        totalPrice: Number(o.totalPrice),
        customer: o.customer,
        items: o.items.map((item: any) => ({
          ...item,
          price: Number(item.price),
          service: { ...item.service, price: Number(item.service.price) }
        }))
      }))
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      totalOrders: 0,
      todayWeight: 0,
      monthlyRevenue: 0,
      recentOrders: []
    };
  }
}

export async function getUserStats(userId: number) {
  try {
    const activeOrders = await prisma.order.findMany({
      where: { 
        userId,
        status: { notIn: ["PICKED_UP", "CANCELLED"] }
      },
      include: {
        customer: true,
        items: {
          include: { service: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return {
      activeOrders: activeOrders.map((o: any) => ({
        ...o,
        totalPrice: Number(o.totalPrice),
        customer: o.customer,
        items: o.items.map((item: any) => ({
          ...item,
          price: Number(item.price),
          service: { ...item.service, price: Number(item.service.price) }
        }))
      }))
    };
  } catch (error) {
    console.error("Failed to fetch user stats:", error);
    return { activeOrders: [] };
  }
}
