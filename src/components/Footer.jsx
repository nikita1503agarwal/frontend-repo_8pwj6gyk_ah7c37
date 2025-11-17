export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#7BA4D0]/20">
      <div className="container mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="text-2xl font-extrabold text-[#0D2440]">SECRET <span className="font-light text-[#2E5E99]">CLOSET</span></div>
          <p className="mt-3 text-[#0D2440]/70">Minimalistic essentials for a cleaner wardrobe.</p>
          <form className="mt-4 flex gap-2">
            <input className="flex-1 rounded-full bg-[#E7F0FA] px-4 py-2 outline-none" placeholder="Your email" />
            <button className="rounded-full bg-[#2E5E99] text-white px-5 py-2 font-semibold">Subscribe</button>
          </form>
        </div>
        <div>
          <div className="font-semibold text-[#0D2440] mb-3">Company</div>
          <ul className="space-y-2 text-[#0D2440]/70">
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/policies/shipping">Shipping</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-[#0D2440] mb-3">Shop</div>
          <ul className="space-y-2 text-[#0D2440]/70">
            <li><a href="/category/apparel">Apparel</a></li>
            <li><a href="/category/footwear">Footwear</a></li>
            <li><a href="/category/accessories">Accessories</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-[#0D2440] mb-3">Support</div>
          <ul className="space-y-2 text-[#0D2440]/70">
            <li>Returns & Exchanges</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#7BA4D0]/20 py-4 text-center text-sm text-[#0D2440]/60">© {new Date().getFullYear()} Secret Closet. All rights reserved.</div>
    </footer>
  );
}
