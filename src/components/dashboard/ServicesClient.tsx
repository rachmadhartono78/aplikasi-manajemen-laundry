"use client";

import { useState } from "react";
import { 
  WashingMachine, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2,
  Tag,
  Clock,
  Shirt,
  X,
  Save,
  AlertCircle
} from "lucide-react";
import { createService, updateService, deleteService } from "@/actions/service";

interface Service {
  id: number;
  name: string;
  price: any;
  unit: string;
  description: string | null;
}

export default function ServicesClient({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit: "kg",
    description: "",
  });

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        price: service.price.toString(),
        unit: service.unit,
        description: service.description || "",
      });
    } else {
      setEditingService(null);
      setFormData({
        name: "",
        price: "",
        unit: "kg",
        description: "",
      });
    }
    setError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fData = new FormData();
    fData.append("name", formData.name);
    fData.append("price", formData.price);
    fData.append("unit", formData.unit);
    fData.append("description", formData.description);

    let result;
    if (editingService) {
      result = await updateService(editingService.id, fData);
    } else {
      result = await createService(fData);
    }

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      handleCloseModal();
      window.location.reload(); // Simple refresh for now
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    const result = await deleteService(id);
    if (result.success) {
      window.location.reload();
    } else {
      alert("Failed to delete service: " + result.error);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Layanan Laundry</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Daftar harga dan jenis pengerjaan laundry konvensional.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus className="h-4 w-4" /> Tambah Layanan
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input 
          type="text" 
          placeholder="Cari nama layanan..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:ring-2 focus:ring-blue-600 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-white py-24 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-800">
            <WashingMachine className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-50">Layanan tidak ditemukan</h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
            Belum ada layanan yang sesuai dengan pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <div key={service.id} className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-blue-500/50 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${service.name.includes("Express") ? "bg-orange-100 text-orange-600" : "bg-blue-50 text-blue-600"} dark:bg-opacity-20`}>
                    {service.name.includes("Express") ? <Clock className="h-6 w-6" /> : <WashingMachine className="h-6 w-6" />}
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleOpenModal(service)}
                      className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-blue-600 transition-all"
                    >
                        <Edit3 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-600 transition-all"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {service.description || "Layanan cuci berkualitas tinggi."}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-4 border-zinc-100 dark:border-zinc-800">
                <div>
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-0.5">Harga per {service.unit}</span>
                    <p className="text-xl font-black text-zinc-900 dark:text-zinc-50">Rp {Number(service.price).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-xl font-bold">{editingService ? "Ubah Layanan" : "Tambah Layanan Baru"}</h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Nama Layanan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Cuci Kering (Kiloan)"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Harga (Rp)</label>
                    <input
                      type="number"
                      required
                      placeholder="6000"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Unit</label>
                    <select
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none font-bold"
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    >
                      <option value="kg">kg</option>
                      <option value="pcs">pcs</option>
                      <option value="set">set</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Deskripsi (Opsional)</label>
                  <textarea
                    rows={2}
                    placeholder="Penjelasan singkat layanan..."
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-xs font-bold bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                  <AlertCircle className="h-4 w-4" /> {error}
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-2.5 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 font-bold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Menyimpan..." : <><Save className="h-4 w-4" /> Simpan</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
