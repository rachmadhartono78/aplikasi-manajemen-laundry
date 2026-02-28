import { getOrders, getCustomers } from "@/actions/order";
import { getServices } from "@/actions/service";
import { getSession } from "@/actions/auth";
import OrdersClient from "@/components/dashboard/OrdersClient";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  const [orders, services, customers] = await Promise.all([
    getOrders(session.role === "ADMIN" ? {} : { userId: session.userId }),
    getServices(),
    getCustomers()
  ]);

  return (
    <OrdersClient 
      initialOrders={orders} 
      services={services} 
      customers={customers}
      userId={session.userId} 
    />
  );
}
