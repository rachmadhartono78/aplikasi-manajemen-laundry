"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  ChevronLeft, 
  Save, 
  Calculator, 
  User, 
  Phone, 
  Weight, 
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Search,
  UserPlus,
  Trash2,
  Calendar,
  CreditCard
} from "lucide-react";
import { createOrder } from "@/actions/order";

interface Service {
  id: number;
  name: string;
  price: any;
  unit: string;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  address?: string;
  loyaltyPoints: number;
}

export default function OrderForm({ 
  services, 
  customers,
  userId, 
  onCancel, 
  onSuccess 
}: { 
  services: Service[]; 
  customers: Customer[];
  userId: number;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CRM State
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [newCustomerData, setNewCustomerData] = useState({ name: "", phone: "", address: "" });

  // Order Items State
  const [orderItems, setOrderItems] = useState<{ serviceId: number; quantity: number }[]>([
    { serviceId: services[0]?.id || 0, quantity: 1 }
  ]);

  // Payment & Logistics
  const [paymentStatus, setPaymentStatus] = useState<"UNPAID" | "PAID" | "PARTIAL">("UNPAID");
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "QRIS" | "TRANSFER" | "DEBIT">("CASH");
  const [dueDate, setDueDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3); // Default 3 days
    return d.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState("");

  const filteredCustomers = useMemo(() => {
    if (!customerSearch) return [];
    return customers.filter(c => 
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
      c.phone.includes(customerSearch)
    );
  }, [customers, customerSearch]);

  const totalPrice = useMemo(() => {
    return orderItems.reduce((sum, item) => {
      const service = services.find(s => s.id === item.serviceId);
      return sum + (Number(service?.price || 0) * item.quantity);
    }, 0);
  }, [orderItems, services]);

  const addOrderItem = () => {
    setOrderItems([...orderItems, { serviceId: services[0]?.id || 0, quantity: 1 }]);
  };

  const removeOrderItem = (index: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
  };

  const updateOrderItem = (index: number, data: Partial<{ serviceId: number; quantity: number }>) => {
    const newItems = [...orderItems];
    newItems[index] = { ...newItems[index], ...data };
    setOrderItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await createOrder({
      userId,
      customerId: isNewCustomer ? undefined : (selectedCustomerId || undefined),
      customerData: isNewCustomer ? newCustomerData : undefined,
      items: orderItems,
      paymentStatus,
      paymentMethod: paymentStatus !== "UNPAID" ? paymentMethod : undefined,
      notes,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  if (!services || services.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
        <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Layanan Tidak Ditemukan</h2>
        <button onClick={onCancel} className="px-6 py-2.5 bg-zinc-900 text-white font-bold rounded-xl mt-4">Tutup</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-32">
      <div className="mb-8 flex items-center justify-between">
        <button onClick={onCancel} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 bg-white dark:bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all transform hover:-translate-x-1">
          <ChevronLeft className="h-4 w-4" /> Batal
        </button>
        <div className="text-right">
          <h2 className="text-2xl font-black text-blue-600">Buat Pesanan</h2>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Sistem Manajemen Laundry Pro</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CRM Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 font-black text-xs text-zinc-400 uppercase tracking-widest">
                  <User className="h-4 w-4" /> Pelanggan
                </h3>
                <button 
                  type="button"
                  onClick={() => setIsNewCustomer(!isNewCustomer)}
                  className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  {isNewCustomer ? "Cari Pelanggan Lama" : "Tambah Pelanggan Baru"}
                </button>
              </div>

              {isNewCustomer ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      required
                      placeholder="Nama Lengkap"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none"
                      value={newCustomerData.name}
                      onChange={(e) => setNewCustomerData({...newCustomerData, name: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="tel"
                      required
                      placeholder="Nomor HP (WhatsApp)"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none"
                      value={newCustomerData.phone}
                      onChange={(e) => setNewCustomerData({...newCustomerData, phone: e.target.value})}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Cari Nama / No HP..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none"
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                    />
                  </div>
                  
                  {customerSearch && filteredCustomers.length > 0 && (
                    <div className="max-h-48 overflow-y-auto rounded-xl border border-zinc-100 bg-white dark:bg-zinc-950 shadow-lg">
                      {filteredCustomers.map(c => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setSelectedCustomerId(c.id);
                            setCustomerSearch(c.name);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 border-b border-zinc-50 dark:border-zinc-800 last:border-0 ${selectedCustomerId === c.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        >
                          <p className="font-bold text-sm">{c.name}</p>
                          <p className="text-[10px] text-zinc-400">{c.phone}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedCustomerId && !isNewCustomer && (
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {customers.find(c => c.id === selectedCustomerId)?.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-blue-700 dark:text-blue-300">Terpilih: {customers.find(c => c.id === selectedCustomerId)?.name}</p>
                            <p className="text-[10px] text-blue-600/70">Poin Loyalitas: {customers.find(c => c.id === selectedCustomerId)?.loyaltyPoints}</p>
                        </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="flex items-center gap-2 font-black text-xs text-zinc-400 uppercase tracking-widest mb-6">
                  <CreditCard className="h-4 w-4" /> Pembayaran & Deadline
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase mb-1.5 block">Status Bayar</label>
                        <div className="grid grid-cols-3 gap-2">
                            {["UNPAID", "PARTIAL", "PAID"].map(s => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setPaymentStatus(s as any)}
                                    className={`py-2 rounded-lg text-[10px] font-black border transition-all ${paymentStatus === s ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-50 dark:text-zinc-900' : 'bg-white text-zinc-500 border-zinc-100 hover:bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {paymentStatus !== "UNPAID" && (
                        <div>
                            <label className="text-[10px] font-bold text-zinc-400 uppercase mb-1.5 block">Metode Bayar</label>
                            <select
                                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none text-xs font-bold"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value as any)}
                            >
                                <option value="CASH">CASH</option>
                                <option value="QRIS">QRIS</option>
                                <option value="TRANSFER">TRANSFER</option>
                                <option value="DEBIT">DEBIT / KARTU</option>
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase mb-1.5 block">Estimasi Selesai</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input
                                type="date"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none text-xs font-bold"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 font-black text-xs text-zinc-400 uppercase tracking-widest">
                  <Calculator className="h-4 w-4" /> Daftar Layanan (Items)
                </h3>
                <button 
                  type="button"
                  onClick={addOrderItem}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Tambah Item
                </button>
              </div>

              <div className="space-y-4">
                {orderItems.map((item, index) => {
                  const selectedService = services.find(s => s.id === item.serviceId);
                  return (
                    <div key={index} className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-blue-100 transition-all bg-zinc-50/50 dark:bg-zinc-950/50 relative">
                        <div className="flex-1 w-full">
                            <label className="text-[9px] font-black text-zinc-400 uppercase mb-1 block">Jenis Layanan</label>
                            <select
                                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none text-sm font-bold"
                                value={item.serviceId}
                                onChange={(e) => updateOrderItem(index, { serviceId: Number(e.target.value) })}
                            >
                                {services.map(s => (
                                    <option key={s.id} value={s.id}>{s.name} (Rp {Number(s.price).toLocaleString()})</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="w-full sm:w-32">
                            <label className="text-[9px] font-black text-zinc-400 uppercase mb-1 block">Berat / Qty</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0.1"
                                    className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none text-sm font-black text-center"
                                    value={item.quantity}
                                    onChange={(e) => updateOrderItem(index, { quantity: parseFloat(e.target.value) || 0.1 })}
                                />
                                <span className="text-[10px] font-bold text-zinc-400">{selectedService?.unit}</span>
                            </div>
                        </div>

                        <div className="w-full sm:w-32 text-right">
                             <label className="text-[9px] font-black text-zinc-400 uppercase mb-1 block">Subtotal</label>
                             <p className="text-sm font-black text-zinc-900 dark:text-zinc-50 pt-2.5">
                                Rp {(Number(selectedService?.price || 0) * item.quantity).toLocaleString()}
                             </p>
                        </div>

                        {orderItems.length > 1 && (
                            <button 
                                type="button" 
                                onClick={() => removeOrderItem(index)}
                                className="sm:mt-5 p-2 text-zinc-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <textarea
                    rows={3}
                    placeholder="Catatan tambahan untuk cucian ini (misal: pakaian luntur, minta setrika tajam, dll)..."
                    className="w-full px-4 py-4 rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none text-sm italic"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Summary Bar */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-5xl z-50">
            <div className="rounded-3xl bg-white dark:bg-zinc-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-blue-100 dark:border-blue-900/30 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                        <Calculator className="h-8 w-8" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">Total Keseluruhan</span>
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                        </div>
                        <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 leading-none">Rp {totalPrice.toLocaleString()}</h3>
                    </div>
                </div>
                
                <div className="flex gap-3 w-full sm:w-auto">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-12 py-4 font-black text-white transition-all hover:bg-blue-700 hover:scale-[1.02] shadow-xl shadow-blue-500/30 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "MEMPROSES..." : <><Save className="h-5 w-5" /> SIMPAN PESANAN</>}
                    </button>
                </div>
            </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 text-red-600 text-sm font-bold bg-red-50 dark:bg-red-900/20 p-5 rounded-2xl border border-red-100 dark:border-red-900/30 animate-in shake">
            <AlertCircle className="h-5 w-5" /> {error}
          </div>
        )}
      </form>
    </div>
  );
}
