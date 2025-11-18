import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Services from "./components/Services";
import Cart from "./components/Cart";
import Reservation from "./components/Reservation";

function App() {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const base = import.meta.env.VITE_BACKEND_URL || "";

  // Seed demo menu if empty (first load)
  useEffect(() => {
    const seed = async () => {
      const res = await fetch(`${base}/api/menu`);
      const data = await res.json();
      if (!data.length) {
        const demo = [
          { title:"Truffle Fries", description:"Crispy fries with parmesan & truffle oil", price:8.5, category:"Starters", image:"https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop" },
          { title:"Miso Glazed Salmon", description:"With citrus fennel salad", price:18.0, category:"Mains", image:"https://images.unsplash.com/photo-1619521054570-f4d0b9593505?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxUcnVmZmxlJTIwRnJpZXN8ZW58MHwwfHx8MTc2MzQ5MjA3MXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" },
          { title:"Molten Chocolate", description:"Warm cake with vanilla ice cream", price:9.0, category:"Desserts", image:"https://images.unsplash.com/photo-1619521054570-f4d0b9593505?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxUcnVmZmxlJTIwRnJpZXN8ZW58MHwwfHx8MTc2MzQ5MjA3MXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" },
          { title:"Signature Mocktail", description:"Citrus, mint, ginger", price:6.0, category:"Drinks", image:"https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1400&auto=format&fit=crop" }
        ];
        await Promise.all(demo.map(d => fetch(`${base}/api/menu`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(d)})));
      }
    };
    seed();
  }, []);

  const onAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setOpenCart(true);
  };

  const onInc = (id) => setCart((prev) => prev.map((p) => p.id === id ? { ...p, quantity: p.quantity + 1 } : p));
  const onDec = (id) => setCart((prev) => prev.flatMap((p) => p.id === id ? (p.quantity > 1 ? [{ ...p, quantity: p.quantity - 1 }] : []) : [p]));

  const checkout = async (summary) => {
    const items = cart.map(({ id, title, price, quantity, image }) => ({ title, price, quantity }));
    const order = { name: "Guest", phone: "N/A", address: "Delivery", items, subtotal: summary.subtotal, delivery_fee: summary.delivery_fee, total: summary.total };
    await fetch(`${base}/api/orders`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) });
    alert("Order placed! Thank you.");
    setCart([]);
    setOpenCart(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar onCartOpen={() => setOpenCart(true)} onReserveClick={() => setReserveOpen(true)} />
      <main>
        <Hero onReserveClick={() => setReserveOpen(true)} />
        <Menu onAddToCart={onAddToCart} />
        <Services />
        <footer className="border-t border-white/10 py-10">
          <div className="max-w-7xl mx-auto px-6 text-white/60 text-sm">© {new Date().getFullYear()} Vibe Dine. All rights reserved.</div>
        </footer>
      </main>
      {openCart && (
        <Cart items={cart} onInc={onInc} onDec={onDec} onClose={() => setOpenCart(false)} onCheckout={checkout} />
      )}
      <Reservation open={reserveOpen} onClose={() => setReserveOpen(false)} />
    </div>
  );
}

export default App
