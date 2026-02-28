import { 
  Users, 
  Shirt, 
  Clock, 
  ArrowUpRight, 
  MoreHorizontal, 
  Download,
  Filter,
  Package,
  CircleDollarSign,
  Plus
} from "lucide-react";
import Link from "next/link";

interface AdminDashboardProps {
  stats: {
    totalOrders: number;
    todayWeight: number;
    monthlyRevenue: number;
    recentOrders: any[];
  }
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const statsConfig = [
    { name: "Total Pesanan", value: stats.totalOrders.toLocaleString(), icon: Shirt, change: "Seluruh waktu", changeType: "increase" },
    { name: "Cucian Hari Ini", value: `${stats.todayWeight} kg`, icon: Package, change: "Hari ini", changeType: "increase" },
    { name: "Pendapatan Bulan Ini", value: `Rp ${stats.monthlyRevenue.toLocaleString()}`, icon: CircleDollarSign, change: "Bulan ini", changeType: "increase" },
  ];

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Ikhtisar Laundry</h2>
          <Link 
            href="/dashboard/orders"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95"
          >
              <Plus className="h-4 w-4" /> Catat Pesanan Baru
          </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statsConfig.map((stat) => (
          <div key={stat.name} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-800">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-full ${
                stat.changeType === "increase" ? "bg-green-50 text-green-600 dark:bg-green-900/20" : "bg-red-50 text-red-600 dark:bg-red-900/20"
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.name}</p>
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-lg font-bold">Pesanan Terbaru</h2>
          <button className="p-2 rounded-lg hover:bg-zinc-50"><Filter className="h-4 w-4 text-zinc-400" /></button>
        </div>
        <div className="overflow-x-auto">
          {stats.recentOrders.length === 0 ? (
            <div className="p-12 text-center text-zinc-500">Belum ada pesanan terbaru.</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold">{order.customer?.name}</div>
                      <div className="text-xs text-zinc-500">
                        {order.items?.length > 1 
                          ? `${order.items[0]?.service?.name} + ${order.items.length - 1} lainnya` 
                          : order.items[0]?.service?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        order.status === "READY" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}>
                          {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="p-2 hover:bg-zinc-100 rounded-lg"><MoreHorizontal className="h-4 w-4 text-zinc-400" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
