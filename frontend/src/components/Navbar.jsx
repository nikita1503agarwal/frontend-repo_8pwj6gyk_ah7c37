import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ShoppingCart, User, Search, Menu } from 'lucide-react'
import axios from 'axios'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Navbar({ enableRealLinks }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [focused, setFocused] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setFocused(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    if (!query) { setSuggestions([]); return }
    const timeout = setTimeout(async () => {
      try {
        const r = await axios.get(`${API}/api/products`, { params: { q: query, limit: 8, sort: 'rating' } })
        setSuggestions(r.data)
      } catch {}
    }, 200)
    return () => clearTimeout(timeout)
  }, [query])

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[#E7F0FA]/80 border-b border-[#7BA4D0]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(v => !v)} className="p-2 rounded-md hover:bg-white/70 text-[#2E5E99]">
            <Menu size={22} />
          </button>
          <a href="/" className="font-semibold text-lg text-[#0D2440]">Secret Closet</a>
        </div>

        <div ref={boxRef} className="relative w-full max-w-lg hidden md:block">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 ring-1 ring-[#7BA4D0]/40 focus-within:ring-[#2E5E99] transition`}> 
            <Search size={18} className="text-[#2E5E99]" />
            <input value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)} placeholder="Search products, brands..." className="w-full bg-transparent outline-none text-sm" />
          </div>
          {focused && suggestions.length > 0 && (
            <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg ring-1 ring-[#7BA4D0]/30 overflow-hidden">
              {suggestions.map(s => (
                <a key={s.id} href={`/product/${s.id}`} className="flex gap-3 items-center p-3 hover:bg-[#E7F0FA]">
                  <img src={s.images?.[0]} alt={s.name} className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{s.name}</div>
                    <div className="text-xs text-[#2E5E99]">{s.brand} · ${s.sale_price ?? s.price}</div>
                  </div>
                </a>
              ))}
              <a href={`/category/all?q=${encodeURIComponent(query)}`} className="block p-3 text-center text-[#2E5E99] hover:bg-[#E7F0FA] text-sm">See all results</a>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a href="/account" className="p-2 rounded-md hover:bg-white/70 text-[#2E5E99]"><User size={22} /></a>
          <a href="/cart" className="p-2 rounded-md hover:bg-white/70 text-[#2E5E99] relative">
            <ShoppingCart size={22} />
          </a>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-[#7BA4D0]/20 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-2 text-sm">
            {['Apparel','Footwear','Fragrance','Accessories'].map(c => (
              <a key={c} href={`/category/${c}`} className="px-3 py-2 rounded-md bg-[#E7F0FA] hover:bg-[#dbe8f7] text-[#0D2440]">{c}</a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
