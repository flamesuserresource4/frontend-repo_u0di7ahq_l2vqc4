import { useState } from "react";

export default function Reservation({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", guests: 2, notes: "" });
  const base = import.meta.env.VITE_BACKEND_URL || "";

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${base}/api/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, guests: Number(form.guests) })
    });
    if (res.ok) {
      onClose();
      alert("Reservation requested! We'll confirm shortly.");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <form onSubmit={submit} className="relative w-full max-w-lg bg-slate-900/95 backdrop-blur p-6 rounded-2xl border border-white/10">
        <h3 className="text-white text-xl font-semibold mb-4">Reserve a table</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <input required placeholder="Name" className="px-3 py-2 rounded-lg bg-white/10 text-white" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input placeholder="Email" className="px-3 py-2 rounded-lg bg-white/10 text-white" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input required placeholder="Phone" className="px-3 py-2 rounded-lg bg-white/10 text-white" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
          <input required type="date" className="px-3 py-2 rounded-lg bg-white/10 text-white" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
          <input required type="time" className="px-3 py-2 rounded-lg bg-white/10 text-white" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} />
          <input required type="number" min="1" max="20" className="px-3 py-2 rounded-lg bg-white/10 text-white" value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})} />
        </div>
        <textarea placeholder="Notes" className="mt-3 w-full h-24 px-3 py-2 rounded-lg bg-white/10 text-white" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
        <div className="mt-4 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10 text-white">Cancel</button>
          <button className="px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold">Submit</button>
        </div>
      </form>
    </div>
  );
}
