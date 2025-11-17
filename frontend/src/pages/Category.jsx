import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function CategoryPage(){
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    axios.get(`${API}/api/categories`).then(r => setCategories(r.data))
  }, [])

  useEffect(() => {
    const params = {}
    if (q) params.q = q
    if (category && category !== 'all') params.category = category
    if (sort) params.sort = sort
    axios.get(`${API}/api/products`, { params }).then(r => setItems(r.data))
  }, [q, category, sort])

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-4">Browse</h1>
      <div className="flex flex-wrap gap-3 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="px-3 py-2 rounded-full ring-1 ring-[#7BA4D0]/30" />
        <select value={category} onChange={e=>setCategory(e.target.value)} className="px-3 py-2 rounded-full ring-1 ring-[#7BA4D0]/30">
          <option value="all">All</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="px-3 py-2 rounded-full ring-1 ring-[#7BA4D0]/30">
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(p => (
          <a key={p.id} href={`/product/${p.id}`} className="rounded-xl overflow-hidden bg-white ring-1 ring-[#7BA4D0]/20 hover:ring-[#2E5E99] transition flex flex-col">
            <div className="aspect-square bg-[#e9f3fd]"><img src={p.images?.[0]} alt={p.name} className="w-full h-full object-cover" loading="lazy"/></div>
            <div className="p-3">
              <div className="text-sm font-medium line-clamp-1">{p.name}</div>
              <div className="text-xs text-[#2E5E99]">{p.brand}</div>
              <div className="mt-1 font-semibold">${(p.sale_price ?? p.price)}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
