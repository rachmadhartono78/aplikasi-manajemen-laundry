import { getSession } from "@/actions/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import { Bell } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar role={session.role} />

      {/* Main Content */}
      <div className="lg:pl-72 flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
          <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Panel Kontrol
          </h1>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right mr-2">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{session.email}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">{session.role}</p>
            </div>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 focus:outline-none">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white dark:border-zinc-800"></div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
