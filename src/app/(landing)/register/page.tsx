"use client";

import Link from "next/link";
import { Mail, Lock, User, ArrowRight, WashingMachine, CheckCircle2, AlertCircle, PartyPopper } from "lucide-react";
import { signUp } from "@/actions/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    const result = await signUp(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      setSuccess(true);
      setLoading(false);
      // Redirect after 2 seconds so user can see the success message
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
              <WashingMachine className="h-6 w-6" />
            </div>
            Laundry<span className="text-blue-600">Manager</span>
          </Link>
          
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {success ? "Akun Berhasil Dibuat!" : "Buat akun baru"}
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {success 
              ? "Harap tunggu, Anda akan diarahkan ke dashboard..." 
              : "Bergabunglah dengan ribuan pengguna lain untuk mengelola laundry dengan mudah."
            }
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 flex flex-col items-center text-center gap-3 rounded-xl bg-green-50 p-6 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/30">
                <PartyPopper className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-base">Pendaftaran Berhasil!</h3>
                <p className="text-sm opacity-90 mt-1">Selamat datang di LaundryManager!</p>
              </div>
            </div>
          )}

          {!success && (
            <form action={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5" htmlFor="name">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 text-zinc-900 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 sm:text-sm transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5" htmlFor="email">
                  Alamat Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 text-zinc-900 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 sm:text-sm transition-all"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5" htmlFor="password">
                  Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    minLength={8}
                    className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 text-zinc-900 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 sm:text-sm transition-all"
                    placeholder="Minimal 8 karakter"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <div className="mt-1 flex h-5 items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
                    required
                  />
                </div>
                <label htmlFor="terms" className="text-xs text-zinc-500 dark:text-zinc-400">
                  Saya menyetujui <Link href="#" className="font-semibold text-zinc-700 dark:text-zinc-300 hover:underline">Syarat & Ketentuan</Link> serta <Link href="#" className="font-semibold text-zinc-700 dark:text-zinc-300 hover:underline">Kebijakan Privasi</Link>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Memproses..." : "Daftar Akun"} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Tanpa biaya seumur hidup untuk 10 pesanan pertama per bulan</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Akses penuh ke semua dashboard dan fitur analytics</span>
              </div>
            </div>
          )}
        </div>

        {!success && (
          <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-bold text-blue-600 hover:text-blue-500">
              Masuk sekarang
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
