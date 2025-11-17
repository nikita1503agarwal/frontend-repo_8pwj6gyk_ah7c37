import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductPage(){
  const [p, setP] = useState(null)
  const [selected, setSelected] = useState({})
  const { addItem } = useCart()

  useEffect(() => {
    const id = window.location.pathname.split('/').pop()
    axios.get(`${API}/api/products/${id}`).then(r => setP(r.data))
  }, [])

  if (!p) return <div className="py-8">Loading...</div>

  const price = p.sale_price ?? p.price

  return (
    <div className="py-8 grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl ring-1 ring-[#7BA4D0]/20 overflow-hidden">
        <img src={p.images?.[0]} alt={p.name} className="w-full aspect-square object-cover" />
      </div>
      <div className="bg-white rounded-xl ring-1 ring-[#7BA4D0]/20 p-4">
        <h1 className="text-2xl font-semibold">{p.name}</h1>
        <div className="text-[#2E5E99]">{p.brand}</div>
        <div className="mt-2 text-2xl font-semibold">${price}</div>
        {p.options?.size && (
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Size</div>
            <div className="flex flex-wrap gap-2">
              {p.options.size.map(s => (
                <button key={s} onClick={()=>setSelected({...selected, size:s})} className={`px-3 py-1 rounded-full ring-1 ${selected.size===s? 'ring-[#2E5E99] bg-[#E7F0FA]':'ring-[#7BA4D0]/30'}`}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {p.options?.color && (
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Color</div>
            <div className="flex flex-wrap gap-2">
              {p.options.color.map(s => (
                <button key={s} onClick={()=>setSelected({...selected, color:s})} className={`px-3 py-1 rounded-full ring-1 ${selected.color===s? 'ring-[#2E5E99] bg-[#E7F0FA]':'ring-[#7BA4D0]/30'}`}>{s}</button>
              ))}
            </div>
          </div>
        )}

        <button onClick={()=>addItem(p, 1, selected)} className="mt-6 px-4 py-2 rounded-full bg-[#2E5E99] text-white">Add to Cart</button>
        <p className="mt-4 text-sm text-[#0D2440] opacity-80">{p.description}</p>
      </div>
    </div>
  )
}
