"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Shirt, 
  Waves, 
  Users, 
  Settings, 
  LogOut, 
  WashingMachine,
  ChevronRight
} from "lucide-react";
import { signOut } from "@/actions/auth";

const adminNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pesanan Laundry", href: "/dashboard/orders", icon: Shirt },
  { name: "Manajemen Layanan", href: "/dashboard/services", icon: WashingMachine },
  { name: "Pelanggan", href: "/dashboard/users", icon: Users },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

const userNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pesanan Saya", href: "/dashboard/orders", icon: Shirt },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const navigation = role === "ADMIN" ? adminNavigation : userNavigation;

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 hidden lg:block">
      <div className="flex flex-col h-full">
        <div className="flex h-16 items-center px-6 border-b border-zinc-100 dark:border-zinc-800">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20">
              <WashingMachine className="h-5 w-5" />
            </div>
            Laundry<span className="text-blue-600">Manager</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                  active 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" 
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                }`}
              >
                <item.icon className={`h-5 w-5 ${active ? "text-white" : "text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50"}`} />
                {item.name}
                {active && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
          <button 
            onClick={() => signOut()}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-5 w-5" />
            Keluar
          </button>
        </div>
      </div>
    </aside>
  );
}
