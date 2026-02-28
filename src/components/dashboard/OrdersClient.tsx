"use client";

import { useState } from "react";
import OrderForm from "./OrderForm";
import { 
  Shirt, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  User, 
  Phone, 
  BadgeCheck,
  CreditCard,
  Calendar
} from "lucide-react";

interface OrdersClientProps {
  initialOrders: any[];
  services: any[];
  customers: any[];
  userId: number;
}

export default function OrdersClient({ initialOrders, services, customers, userId }: OrdersClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(order => 
    order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toString().includes(searchQuery)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RECEIVED": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30";
      case "WASHING": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30";
      case "READY": return "bg-green-100 text-green-700 dark:bg-green-900/30";
      case "PICKED_UP": return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800";
      default: return "bg-zinc-100 text-zinc-700";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID": return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case "PARTIAL": return "text-amber-600 bg-amber-50 dark:bg-amber-900/20";
      case "UNPAID": return "text-red-600 bg-red-50 dark:bg-red-900/20";
      default: return "text-zinc-500 bg-zinc-50";
    }
  };

  if (showForm) {
    return (
      <OrderForm 
        services={services} 
        customers={customers}
        userId={userId} 
        onCancel={() => setShowForm(false)} 
        onSuccess={() => {
            setShowForm(false);
            window.location.reload();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Pesanan Laundry</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Total {orders.length} pesanan tercatat dalam sistem.
          </p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus className="h-4 w-4" /> Pesanan Baru
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Cari nama pelanggan atau ID pesanan..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-blue-600 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-zinc-600 hover:bg-zinc-50 transition-colors">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-white py-24 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-800">
            <Shirt className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-50">Tidak ada pesanan ditemukan</h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
            Coba sesuaikan pencarian Anda atau buat pesanan baru.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredOrders.map((order) => (
            <div key={order.id} className="group relative rounded-2xl border border-zinc-200 bg-white p-5 transition-all hover:border-blue-500/50 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <Shirt className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">#{order.id.toString().padStart(4, '0')}</h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {order.status}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                    </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm font-semibold">{order.customer?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-zinc-400" />
                  <span className="text-xs text-zinc-500">{order.customer?.phone}</span>
                </div>
                
                <div className="py-2 border-y border-zinc-50 dark:border-zinc-800/50">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5">Layanan</p>
                    <div className="flex flex-wrap gap-2">
                        {order.items.map((item: any, idx: number) => (
                            <span key={idx} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-[11px] font-medium border border-zinc-100 dark:border-zinc-800">
                                <BadgeCheck className="h-3 w-3 text-blue-500" />
                                {item.service.name} ({item.quantity} {item.service.unit})
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>{order.paymentMethod || 'Belum Bayar'}</span>
                  </div>
                  <p className="text-lg font-black text-zinc-900 dark:text-zinc-50">Rp {Number(order.totalPrice).toLocaleString()}</p>
                </div>
              </div>

              <button className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
                <MoreHorizontal className="h-4 w-4 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
