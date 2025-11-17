import React from 'react'
import { useCart } from '../context/CartContext'
import { Trash2 } from 'lucide-react'

export default function CartPage(){
  const { items, removeItem, updateQty, subtotal } = useCart()
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div className="p-6 bg-white rounded-xl ring-1 ring-[#7BA4D0]/20">Your cart is empty.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {items.map(i => (
              <div key={i.key} className="flex gap-3 p-3 bg-white rounded-xl ring-1 ring-[#7BA4D0]/20">
                <img src={i.image} alt={i.name} className="w-20 h-20 rounded object-cover" />
                <div className="flex-1">
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm text-[#2E5E99]">${i.price.toFixed(2)}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="number" min={1} value={i.quantity} onChange={e => updateQty(i.key, Number(e.target.value))} className="w-16 px-2 py-1 rounded-md ring-1 ring-[#7BA4D0]/30" />
                    <button onClick={() => removeItem(i.key)} className="px-2 py-1 text-red-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white rounded-xl ring-1 ring-[#7BA4D0]/20 h-fit">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <a href="/checkout" className="mt-4 block text-center px-4 py-2 rounded-full bg-[#2E5E99] text-white">Proceed to Checkout</a>
          </div>
        </div>
      )}
    </div>
  )
}
