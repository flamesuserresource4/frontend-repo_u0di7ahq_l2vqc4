import { motion } from "framer-motion";

export default function Hero({ onReserveClick }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.08),transparent_35%),radial-gradient(circle_at_40%_80%,rgba(34,197,94,0.08),transparent_35%)]" />
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 mb-6 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now delivering across the city
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Savor the moment. Taste the trend.
          </h1>
          <p className="text-white/70 mt-6 text-lg max-w-xl">
            A modern restaurant experience with seasonal menus, ambient vibes, and seamless online ordering.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={onReserveClick} className="px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:shadow-lg hover:shadow-white/20 transition">Reserve a table</button>
            <a href="#menu" className="px-6 py-3 rounded-xl bg-slate-800/60 border border-white/10 text-white hover:bg-slate-700/60 transition">Explore menu</a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-white/60">
            <div>
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-xs">Average rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs">Online ordering</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">30m</div>
              <div className="text-xs">Fast delivery</div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-400/20 via-yellow-300/10 to-fuchsia-400/20 blur-3xl rounded-3xl" />
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop" alt="Restaurant" className="w-full h-96 object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
