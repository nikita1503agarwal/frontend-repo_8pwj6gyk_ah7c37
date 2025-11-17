import React from 'react'

export function CategoryCards({ categories = [] }) {
  const mapped = categories.length ? categories : ['Apparel','Footwear','Fragrance']
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Shop by Category</h2>
        <a href="/category/all" className="text-[#2E5E99] text-sm">View all</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mapped.map((c, i) => (
          <a key={i} href={`/category/${c}`} className="rounded-xl overflow-hidden bg-white group ring-1 ring-[#7BA4D0]/20 hover:ring-[#2E5E99] transition">
            <div className="aspect-[4/3] bg-gradient-to-br from-[#e9f3fd] to-[#d3e5f7]" />
            <div className="p-3 text-sm font-medium group-hover:text-[#2E5E99]">{c}</div>
          </a>
        ))}
      </div>
    </section>
  )
}

export function ProductCard({ p }) {
  const price = p.sale_price ?? p.price
  return (
    <a href={`/product/${p.id}`} className="rounded-xl overflow-hidden bg-white ring-1 ring-[#7BA4D0]/20 hover:ring-[#2E5E99] transition flex flex-col">
      <div className="aspect-square bg-[#e9f3fd]"><img src={p.images?.[0]} alt={p.name} className="w-full h-full object-cover" loading="lazy"/></div>
      <div className="p-3">
        <div className="text-sm font-medium line-clamp-1">{p.name}</div>
        <div className="text-xs text-[#2E5E99]">{p.brand}</div>
        <div className="mt-1 font-semibold">${price}</div>
      </div>
    </a>
  )
}

export function ProductGrid({ title, items = [], link }) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {link && <a href={link} className="text-[#2E5E99] text-sm">View all</a>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  )
}

export default function Sections({ categories, best, news }) {
  return (
    <div>
      <section className="py-10">
        <div className="rounded-2xl bg-gradient-to-br from-[#d8e8fa] to-[#afcdea] p-8 text-center">
          <h1 className="text-2xl md:text-4xl font-semibold text-[#0D2440]">Refresh your wardrobe</h1>
          <p className="mt-2 text-[#2E5E99]">Minimal styles, soft tones, everyday comfort.</p>
          <div className="mt-4 flex gap-3 justify-center">
            <a href="/category/Apparel" className="px-4 py-2 rounded-full bg-[#2E5E99] text-white">Shop Apparel</a>
            <a href="/category/Footwear" className="px-4 py-2 rounded-full bg-white text-[#2E5E99] ring-1 ring-[#7BA4D0]/30">Shop Footwear</a>
          </div>
        </div>
      </section>

      <CategoryCards categories={categories} />
      <ProductGrid title="Best Sellers" items={best} link="/category/all?sort=rating" />
      <ProductGrid title="New Arrivals" items={news} link="/category/all?sort=newest" />
    </div>
  )
}
