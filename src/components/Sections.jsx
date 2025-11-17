import { useEffect, useState } from 'react';
import DummyLink from './DummyLink';

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Section({ title, children, id }) {
  return (
    <section id={id} className="container mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0D2440]">{title}</h2>
        <DummyLink className="text-[#2E5E99] hover:underline">View all</DummyLink>
      </div>
      {children}
    </section>
  );
}

function ProductCard({ p }) {
  return (
    <DummyLink className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden w-full text-left">
      <div className="aspect-square bg-[#E7F0FA] grid place-items-center">
        <img src={p.images?.[0] || 'https://via.placeholder.com/400x400?text=Product'} alt={p.name} className="h-48 object-contain rounded-lg" loading="lazy" />
      </div>
      <div className="p-4">
        <div className="text-sm text-[#7BA4D0]">{p.brand}</div>
        <div className="font-semibold text-[#0D2440]">{p.name}</div>
        <div className="mt-1 text-[#2E5E99]">${p.price?.toFixed?.(2)}</div>
      </div>
    </DummyLink>
  );
}

export function CategoryCards() {
  const cats = [
    { name: 'Apparel', href: '/category/apparel' },
    { name: 'Footwear', href: '/category/footwear' },
    { name: 'Accessories', href: '/category/accessories' },
  ];
  return (
    <Section title="Shop by category">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cats.map(c => (
          <DummyLink key={c.name} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6">
            <div className="h-28 rounded-xl bg-[#E7F0FA] mb-4" />
            <div className="font-semibold text-[#0D2440]">{c.name}</div>
          </DummyLink>
        ))}
      </div>
    </Section>
  );
}

export function BestSellers() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${baseUrl}/api/products/best`).then(r => r.json()).then(setItems).catch(() => setItems([]));
  }, []);
  return (
    <Section title="Best sellers">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </Section>
  );
}

export function NewArrivals() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${baseUrl}/api/products/new`).then(r => r.json()).then(setItems).catch(() => setItems([]));
  }, []);
  return (
    <Section id="new" title="New arrivals">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </Section>
  );
}

export function Deals() {
  return (
    <Section title="Deals">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1,2,3].map(i => (
          <DummyLink key={i} className="bg-white rounded-2xl shadow-sm p-6 text-left">
            <div className="h-36 bg-[#E7F0FA] rounded-xl mb-4" />
            <div className="font-semibold text-[#0D2440]">Special offer {i}</div>
            <p className="text-[#0D2440]/70 text-sm">Limited time savings on curated picks.</p>
          </DummyLink>
        ))}
      </div>
    </Section>
  );
}
