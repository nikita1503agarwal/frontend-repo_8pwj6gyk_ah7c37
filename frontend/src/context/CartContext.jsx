import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart_items') || '[]') } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = 1, selected_options = null) => {
    setItems(prev => {
      const key = product.id + JSON.stringify(selected_options || {})
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i)
      }
      return [
        ...prev,
        {
          key,
          product_id: product.id,
          name: product.name,
          price: product.sale_price ?? product.price,
          quantity,
          image: product.images?.[0],
          selected_options,
        }
      ]
    })
  }

  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key))
  const updateQty = (key, qty) => setItems(prev => prev.map(i => i.key === key ? { ...i, quantity: Math.max(1, qty) } : i))
  const clear = () => setItems([])

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items])

  const value = { items, addItem, removeItem, updateQty, clear, subtotal }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() { return useContext(CartContext) }
