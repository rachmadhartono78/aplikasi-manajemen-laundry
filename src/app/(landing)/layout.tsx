import Link from "next/link";
import { WashingMachine } from "lucide-react";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/70">
        <nav className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20">
              <WashingMachine className="h-5 w-5" />
            </div>
            Laundry<span className="text-blue-600">Manager</span>
          </Link>
          
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-blue-600">Fitur</Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-blue-600">Harga</Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-blue-600">Bantuan</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-semibold transition-colors hover:text-blue-600"
            >
              Masuk
            </Link>
            <Link 
              href="/register" 
              className="inline-flex h-9 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Daftar
            </Link>
          </div>
        </nav>
      </header>
      <main className="pt-16">
        {children}
      </main>
    </>
  );
}
