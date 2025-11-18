import { ShoppingCart, Menu as MenuIcon } from "lucide-react";

export default function Navbar({ onCartOpen, onReserveClick }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-white font-extrabold tracking-tight text-xl">Vibe Dine</a>
        <nav className="hidden md:flex items-center gap-6 text-white/80">
          <a href="#menu" className="hover:text-white">Menu</a>
          <a href="#services" className="hover:text-white">Services</a>
          <button onClick={onReserveClick} className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-semibold">Reserve</button>
          <button onClick={onCartOpen} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20">
            <ShoppingCart className="w-4 h-4"/> Cart
          </button>
        </nav>
        <button className="md:hidden text-white/80">
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}
