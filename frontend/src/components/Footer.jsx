import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-12 border-t border-[#7BA4D0]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-[#0D2440]/80">
        <div className="flex flex-wrap gap-6 justify-between">
          <div>
            <div className="font-semibold text-[#0D2440]">Secret Closet</div>
            <div className="text-xs">Minimal styles, soft tones, everyday comfort.</div>
          </div>
          <div className="space-y-1">
            <a href="/about" className="hover:text-[#2E5E99]">About</a><br/>
            <a href="/contact" className="hover:text-[#2E5E99]">Contact</a><br/>
            <a href="/faq" className="hover:text-[#2E5E99]">FAQ</a>
          </div>
          <div className="space-y-1">
            <a href="/policies/shipping" className="hover:text-[#2E5E99]">Shipping</a><br/>
            <a href="/policies/returns" className="hover:text-[#2E5E99]">Returns</a><br/>
            <a href="/policies/privacy" className="hover:text-[#2E5E99]">Privacy</a>
          </div>
        </div>
        <div className="mt-6 text-xs text-[#0D2440]/60">© {new Date().getFullYear()} Secret Closet</div>
      </div>
    </footer>
  )
}
