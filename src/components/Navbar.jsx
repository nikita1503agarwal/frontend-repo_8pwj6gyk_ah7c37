import { useState } from 'react';
import { Menu, ShoppingCart, Search, User } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-[#7BA4D0]/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <Menu className="h-6 w-6 text-[#0D2440]" />
          </button>
          <a href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute -top-4 left-3 text-[#2E5E99]">👚</div>
              <span className="text-xl font-extrabold text-[#0D2440] tracking-tight">SECRET</span>
              <span className="text-xl font-light text-[#2E5E99] tracking-tight">CLOSET</span>
            </div>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[#0D2440]/80">
          <a href="/category/apparel" className="hover:text-[#2E5E99]">Apparel</a>
          <a href="/category/footwear" className="hover:text-[#2E5E99]">Footwear</a>
          <a href="/category/accessories" className="hover:text-[#2E5E99]">Accessories</a>
          <a href="/about" className="hover:text-[#2E5E99]">About</a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-[#E7F0FA] rounded-full px-3 py-2">
            <Search className="h-4 w-4 text-[#2E5E99]" />
            <input placeholder="Search" className="bg-transparent outline-none px-2 text-sm" />
          </div>
          <a href="/account" aria-label="Account">
            <User className="h-6 w-6 text-[#0D2440]" />
          </a>
          <a href="/cart" aria-label="Cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-[#0D2440]" />
            <span className="absolute -top-2 -right-2 bg-[#2E5E99] text-white text-xs rounded-full h-5 w-5 grid place-items-center">2</span>
          </a>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#7BA4D0]/20 bg-white">
          <nav className="px-4 py-3 grid gap-3">
            <a href="/category/apparel" className="py-2">Apparel</a>
            <a href="/category/footwear" className="py-2">Footwear</a>
            <a href="/category/accessories" className="py-2">Accessories</a>
            <a href="/about" className="py-2">About</a>
          </nav>
        </div>
      )}
    </header>
  );
}
