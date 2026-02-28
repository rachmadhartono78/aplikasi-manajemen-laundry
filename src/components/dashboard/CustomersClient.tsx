"use client";

import { useState, useMemo } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  MoreVertical,
  Star,
  ExternalLink,
  Phone,
  ArrowUpDown
} from "lucide-react";
import CustomerForm from "./CustomerForm";
import { deleteCustomer } from "@/actions/customer";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  address?: string | null;
  loyaltyPoints: number;
  totalSpend: number;
  _count: {
    orders: number;
  };
}

export default function CustomersClient({ initialCustomers }: { initialCustomers: Customer[] }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Customer | 'orderCount', direction: 'asc' | 'desc' } | null>(null);

  const filteredCustomers = useMemo(() => {
    let result = customers.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.phone.includes(search)
    );

    if (sortConfig) {
      result.sort((a, b) => {
        let aVal: any = sortConfig.key === 'orderCount' ? a._count.orders : a[sortConfig.key];
        let bVal: any = sortConfig.key === 'orderCount' ? b._count.orders : b[sortConfig.key];
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [customers, search, sortConfig]);

  const handleSort = (key: keyof Customer | 'orderCount') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus pelanggan ini?")) {
      const result = await deleteCustomer(id);
      if (result.success) {
        setCustomers(customers.filter(c => c.id !== id));
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari nama atau nomor HP..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none text-sm font-bold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button 
          onClick={() => {
            setSelectedCustomer(undefined);
            setShowForm(true);
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-2.5 text-sm font-black text-white transition-all hover:bg-blue-700 shadow-xl shadow-blue-500/20 active:scale-95"
        >
          <Plus className="h-4 w-4" /> Tambah Pelanggan
        </button>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                <th className="px-6 py-4">
                  <button onClick={() => handleSort('name')} className="flex items-center gap-2 text-xs font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-900">
                    Pelanggan <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-4">
                  <button onClick={() => handleSort('orderCount')} className="flex items-center gap-2 text-xs font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-900">
                    Total Order <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-4">
                   <button onClick={() => handleSort('loyaltyPoints')} className="flex items-center gap-2 text-xs font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-900">
                    Poin Loyalty <Star className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-4">
                  <button onClick={() => handleSort('totalSpend')} className="flex items-center gap-2 text-xs font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-900">
                    Total Belanja <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-right text-xs font-black text-zinc-400 uppercase tracking-widest">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center">
                      <Users className="h-12 w-12 text-zinc-200 mb-4" />
                      <p className="text-zinc-500 font-bold">Tidak ada pelanggan ditemukan.</p>
                      <button onClick={() => setSearch("")} className="mt-2 text-blue-600 text-sm font-bold">Hapus Filter</button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-black text-xs uppercase">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-zinc-900 dark:text-zinc-50">{customer.name}</p>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5">
                            <span className="flex items-center gap-1 font-bold"><Phone className="h-3 w-3" /> {customer.phone}</span>
                            {customer.email && <span className="font-bold border-l pl-2 dark:border-zinc-800">{customer.email}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-black text-zinc-700 dark:text-zinc-300">
                        {customer._count.orders} Pesanan
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-black text-blue-600">
                        <Star className="h-4 w-4 fill-blue-600" />
                        <span className="text-sm">{customer.loyaltyPoints}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-zinc-900 dark:text-zinc-50">
                        Rp {customer.totalSpend.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setShowForm(true);
                          }}
                          className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(customer.id)}
                          className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <CustomerForm 
          customer={selectedCustomer}
          onCancel={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
