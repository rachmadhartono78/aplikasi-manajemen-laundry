import { getSession } from "@/actions/auth";
import { getAdminStats, getUserStats } from "@/actions/dashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const stats = session.role === "ADMIN" 
    ? await getAdminStats() 
    : await getUserStats(session.userId);

  return (
    <>
      {session.role === "ADMIN" ? (
        <AdminDashboard stats={stats as any} />
      ) : (
        <UserDashboard activeOrders={(stats as any).activeOrders} />
      )}
    </>
  );
}
