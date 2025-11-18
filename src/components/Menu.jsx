import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Starters", "Mains", "Desserts", "Drinks"];

export default function Menu({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("All");
  const base = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    const fetchMenu = async () => {
      const url = `${base}/api/menu${active !== "All" ? `?category=${active}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      setItems(data);
    };
    fetchMenu();
  }, [active]);

  return (
    <section id="menu" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Signature Menu</h2>
        <div className="flex gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={`px-3 py-1.5 rounded-lg text-sm border transition ${active === c ? "bg-white text-slate-900 border-white" : "text-white/70 border-white/10 hover:border-white/30"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.06] backdrop-blur">
              <img src={item.image || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop"} alt={item.title} className="h-44 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{item.title}</div>
                    <div className="text-white/60 text-sm">{item.category}</div>
                  </div>
                  <div className="text-white font-bold">${item.price.toFixed(2)}</div>
                </div>
                <p className="text-white/70 text-sm mt-2 line-clamp-2">{item.description}</p>
                <button onClick={() => onAddToCart(item)} className="mt-4 w-full px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold hover:shadow-lg hover:shadow-white/20 transition">Add to cart</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
