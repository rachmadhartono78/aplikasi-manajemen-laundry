import { Shirt, CheckCircle2, Waves, UserCheck, Bell, ArrowRight, WashingMachine, Gauge } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50" suppressHydrationWarning>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium dark:bg-zinc-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              Sistem Manajemen Laundry Modern
            </div>
            
            <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
              Kelola <span className="text-blue-600">Pesanan</span> & <span className="text-zinc-500">Proses</span> Laundry Efisien
            </h1>
            
            <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
              Solusi all-in-one untuk manajemen order, progres cucian, dan laporan keuangan yang akurat. Dirancang untuk membantu UMKM Laundry naik kelas.
            </p>
            
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link 
                href="/dashboard" 
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 text-base font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
              >
                Mulai Kelola Sekarang <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="#features" 
                className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-200 bg-white px-8 text-base font-semibold transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 active:scale-95"
              >
                Lihat Fitur
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Blur Effects */}
        <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              icon={<Shirt className="h-6 w-6 text-blue-600" />}
              title="Input Order Cepat"
              description="Catat pesanan pelanggan dengan detail layanan, berat, dan harga otomatis."
            />
            <FeatureCard 
              icon={<WashingMachine className="h-6 w-6 text-green-600" />}
              title="Pelacakan Status"
              description="Pantau status cucian mulai dari Diterima, Dicuci, hingga Siap Diambil."
            />
            <FeatureCard 
              icon={<Bell className="h-6 w-6 text-orange-600" />}
              title="Notifikasi Pelanggan"
              description="Kirim pemberitahuan saat cucian selesai diproses dan siap diambil."
            />
            <FeatureCard 
              icon={<Waves className="h-6 w-6 text-cyan-600" />}
              title="Manajemen Layanan"
              description="Kelola berbagai jenis layanan laundry dengan tarif berbeda-beda."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="h-6 w-6 text-purple-600" />}
              title="Verifikasi Transaksi"
              description="Pastikan setiap transaksi tercatat dengan benar untuk audit keuangan."
            />
            <FeatureCard 
              icon={<Gauge className="h-6 w-6 text-zinc-500" />}
              title="Laporan Bisnis"
              description="Analisis performa bisnis melalui dashboard statistik yang informatif."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-12 dark:border-zinc-800">
        <div className="container mx-auto px-6 text-center text-zinc-500">
          <p suppressHydrationWarning>© {new Date().getFullYear()} Laundry Manager. Memberdayakan bisnis laundry lokal.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-blue-500/50 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-bold">{title}</h3>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}
