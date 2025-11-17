import React, { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ShippingBar from './components/ShippingBar'
import Sections from './components/Sections'
import Footer from './components/Footer'
import axios from 'axios'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [best, setBest] = useState([])
  const [news, setNews] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`${API}/api/products/best`).then(r => setBest(r.data)).catch(() => {})
    axios.get(`${API}/api/products/new`).then(r => setNews(r.data)).catch(() => {})
    axios.get(`${API}/api/categories`).then(r => setCategories(r.data)).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-[#E7F0FA] text-[#0D2440] font-[Inter]">
      <ShippingBar />
      <Navbar enableRealLinks />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Sections categories={categories} best={best} news={news} enableRealLinks />
      </main>
      <Footer />
    </div>
  )
}
