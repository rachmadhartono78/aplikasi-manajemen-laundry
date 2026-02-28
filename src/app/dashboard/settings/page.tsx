import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Pengaturan Sistem</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Konfigurasi akun, notifikasi, dan preferensi dashboard Anda.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex items-center gap-4 border-b border-zinc-100 pb-6 dark:border-zinc-800">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">Konfigurasi Dasar</h3>
                <p className="text-sm text-zinc-500">Kelola pengaturan inti aplikasi Anda.</p>
            </div>
        </div>
        
        <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Mode Gelap</h4>
                    <p className="text-xs text-zinc-500">Gunakan tampilan gelap untuk kenyamanan mata.</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-blue-600 p-1 flex justify-end">
                    <div className="h-4 w-4 rounded-full bg-white shadow-sm"></div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Notifikasi Email</h4>
                    <p className="text-xs text-zinc-500">Kirim email otomatis saat ada pesanan baru.</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-zinc-200 p-1 flex justify-start dark:bg-zinc-700">
                    <div className="h-4 w-4 rounded-full bg-white shadow-sm"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
