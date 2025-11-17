import React, { useMemo, useState } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Checkout(){
  const { items, subtotal, clear } = useCart()
  const [shippingMethod, setShippingMethod] = useState('home_delivery')
  const [form, setForm] = useState({ full_name:'', email:'', phone:'', address_line1:'', city:'', state:'', postal_code:'', country:'US' })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [placing, setPlacing] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const shippingCost = useMemo(() => {
    if (shippingMethod === 'store_pickup') return 0
    if (subtotal >= 75) return 0
    if (shippingMethod === 'express') return 14.99
    return 6.99
  }, [shippingMethod, subtotal])

  const total = useMemo(() => subtotal + shippingCost, [subtotal, shippingCost])

  const placeOrder = async (e) => {
    e.preventDefault()
    setPlacing(true)
    try {
      const payload = {
        items: items.map(i => ({ product_id: i.product_id, name: i.name, price: i.price, quantity: i.quantity, image: i.image, selected_options: i.selected_options })),
        shipping: { ...form, method: shippingMethod },
        payment: { method: paymentMethod, status: 'pending' },
        subtotal: Number(subtotal.toFixed(2)),
        shipping_cost: Number(shippingCost.toFixed(2)),
        discount: 0,
        total: Number(total.toFixed(2)),
      }
      const r = await axios.post(`${API}/api/orders`, payload)
      setOrderId(r.data.id)
      clear()
    } catch (e) {
      alert('Could not place order')
    } finally {
      setPlacing(false)
    }
  }

  if (items.length === 0 && !orderId) {
    return <div className="py-8">Your cart is empty.</div>
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      {orderId ? (
        <div className="p-6 bg-white rounded-xl ring-1 ring-[#7BA4D0]/20">
          <div className="text-lg font-medium">Thank you! Your order was placed.</div>
          <div className="mt-2 text-sm">Order ID: <span className="font-mono">{orderId}</span></div>
        </div>
      ) : (
        <form onSubmit={placeOrder} className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl ring-1 ring-[#7BA4D0]/20 p-4">
              <div className="font-medium mb-3">Shipping Information</div>
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Full name" value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} className="col-span-2 px-3 py-2 rounded-md ring-1 ring-[#7BA4D0]/30" />
                <input required placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="col-span-1 px-3 py-2 rounded-md ring-1 ring-[#7BA4D0]/30" />
                <input required placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="col-span-1 px-3 py-2 rounded-md ring-1 ring-[#7BA4D0]/30" />
                <input placeholder="Address line 1" value={form.address_line1} onChange={e=>setForm({...form, address_line1:e.target.value})} className="col-span-2 px-3 py-2 rounded-md ring-1 ring-[#7BA4D0]/30" />
                <input placeholder="City" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} className="col-span-1 px-3 py-2 rounded-md ring-1 ring-[#7BA4D0]/30" />
                <input placeholder="State" value={form.state} onChange={e=>setForm({...form, state:e.target.value})} className="col-span-1 px-3 py-2 rounded-md ring-1 ring-[#7BA4D0]/30" />
                <input placeholder="Postal Code" value={form.postal_code} onChange={e=>setForm({...form, postal_code:e.target.value})} className="col-span-1 px-3 py-2 rounded-md ring-1 ring-[#7BA4D0]/30" />
                <input placeholder="Country" value={form.country} onChange={e=>setForm({...form, country:e.target.value})} className="col-span-1 px-3 py-2 rounded-md ring-1 ring-[#7BA4D0]/30" />
              </div>
            </div>

            <div className="bg-white rounded-xl ring-1 ring-[#7BA4D0]/20 p-4">
              <div className="font-medium mb-3">Shipping Method</div>
              <div className="flex gap-3">
                {[
                  { key:'home_delivery', label:'Home Delivery', note: subtotal>=75? 'Free over $75': '$6.99 standard' },
                  { key:'express', label:'Express', note:'$14.99 1-2 days' },
                  { key:'store_pickup', label:'Store Pickup', note:'Free' },
                ].map(opt => (
                  <label key={opt.key} className={`flex-1 p-3 rounded-lg ring-1 ${shippingMethod===opt.key? 'ring-[#2E5E99] bg-[#E7F0FA]':'ring-[#7BA4D0]/30'}`}>
                    <input type="radio" name="ship" className="mr-2" checked={shippingMethod===opt.key} onChange={()=>setShippingMethod(opt.key)} />
                    <span className="font-medium">{opt.label}</span>
                    <div className="text-xs text-[#2E5E99]">{opt.note}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl ring-1 ring-[#7BA4D0]/20 p-4">
              <div className="font-medium mb-3">Payment</div>
              <div className="flex gap-3">
                {[
                  { key:'cod', label:'Cash on Delivery' },
                  { key:'card', label:'Card (demo)' },
                  { key:'wallet', label:'Wallet (demo)' },
                ].map(opt => (
                  <label key={opt.key} className={`flex-1 p-3 rounded-lg ring-1 ${paymentMethod===opt.key? 'ring-[#2E5E99] bg-[#E7F0FA]':'ring-[#7BA4D0]/30'}`}>
                    <input type="radio" name="pay" className="mr-2" checked={paymentMethod===opt.key} onChange={()=>setPaymentMethod(opt.key)} />
                    <span className="font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl ring-1 ring-[#7BA4D0]/20 h-fit">
            <div className="font-medium mb-2">Order Summary</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold border-t pt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button disabled={placing} type="submit" className="mt-4 w-full px-4 py-2 rounded-full bg-[#2E5E99] text-white disabled:opacity-60">{placing? 'Placing order...' : 'Place Order'}</button>
          </div>
        </form>
      )}
    </div>
  )
}
