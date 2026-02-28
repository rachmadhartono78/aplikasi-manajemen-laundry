"use server";

import { getCustomers } from "@/actions/customer";
import CustomersClient from "@/components/dashboard/CustomersClient";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Manajemen Pelanggan</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Kelola data pelanggan, pantau poin loyalitas, dan lihat total transaksi mereka.
          </p>
        </div>
      </div>

      <CustomersClient initialCustomers={customers} />
    </div>
  );
}
