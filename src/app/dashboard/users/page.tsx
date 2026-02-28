import { Users } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Daftar Pelanggan</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Lihat riwayat dan profil pelanggan setia Anda.</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-white py-24 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-800">
          <Users className="h-8 w-8 text-zinc-400" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-50">Belum ada data pelanggan</h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
          Data pelanggan akan muncul secara otomatis setelah mereka melakukan pesanan laundry pertama mereka.
        </p>
      </div>
    </div>
  );
}
