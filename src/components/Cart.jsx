import { X, Minus, Plus, ShoppingCart } from "lucide-react";

export default function Cart({ items, onInc, onDec, onClose, onCheckout }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const delivery = items.length ? 4.0 : 0;
  const total = subtotal + delivery;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-full max-w-md h-full bg-slate-900/95 backdrop-blur border-l border-white/10 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-white font-semibold">
            <ShoppingCart className="w-5 h-5" /> Cart
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white"><X /></button>
        </div>

        {items.length === 0 ? (
          <div className="text-white/60">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/10">
                <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="text-white font-medium">{it.title}</div>
                  <div className="text-white/60 text-sm">${it.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onDec(it.id)} className="p-1 rounded bg-white/10 text-white"><Minus className="w-4 h-4"/></button>
                  <div className="w-8 text-center text-white">{it.quantity}</div>
                  <button onClick={() => onInc(it.id)} className="p-1 rounded bg-white text-slate-900"><Plus className="w-4 h-4"/></button>
                </div>
              </div>
            ))}

            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
              <div className="flex justify-between text-white/80"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-white/80"><span>Delivery</span><span>${delivery.toFixed(2)}</span></div>
              <div className="flex justify-between text-white font-semibold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
              <button onClick={() => onCheckout({ subtotal, delivery_fee: delivery, total })} className="mt-3 w-full px-4 py-3 rounded-lg bg-white text-slate-900 font-semibold">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
