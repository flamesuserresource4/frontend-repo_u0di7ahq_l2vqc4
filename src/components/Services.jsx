import { Bike, Utensils, Phone, Clock, CreditCard } from "lucide-react";

const items = [
  { icon: Bike, title: "Delivery", desc: "Fast, tracked delivery across the city." },
  { icon: Utensils, title: "Dine-in", desc: "Cozy ambiance with modern aesthetic." },
  { icon: Phone, title: "Takeaway", desc: "Order ahead and pick up on time." },
  { icon: Clock, title: "Catering", desc: "Events and corporate services on demand." },
  { icon: CreditCard, title: "Cashless", desc: "Pay securely online or on arrival." }
];

export default function Services(){
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Services</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({icon:Icon, title, desc}) => (
          <div key={title} className="rounded-2xl p-5 bg-white/[0.06] border border-white/10 text-white">
            <Icon className="w-6 h-6" />
            <div className="mt-3 font-semibold text-lg">{title}</div>
            <div className="text-white/70 text-sm">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
