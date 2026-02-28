"use client";

import Link from "next/link";
import { Mail, Lock, ArrowRight, WashingMachine, Chrome, Github, AlertCircle } from "lucide-react";
import { signIn } from "@/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    
    const result = await signIn(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      router.push("/dashboard");
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
            Selamat datang kembali
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Masuk ke akun Anda untuk mulai mengelola laundry.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="password">
                  Kata Sandi
                </label>
                <Link href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-500">
                  Lupa sandi?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 text-zinc-900 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 sm:text-sm transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Masuk..." : "Masuk Sekarang"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">Atau lanjut dengan</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 py-2.5 text-sm font-medium transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
              <Chrome className="h-4 w-4" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 py-2.5 text-sm font-medium transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
              <Github className="h-4 w-4" /> GitHub
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Belum punya akun?{" "}
          <Link href="/register" className="font-bold text-blue-600 hover:text-blue-500">
            Daftar gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
