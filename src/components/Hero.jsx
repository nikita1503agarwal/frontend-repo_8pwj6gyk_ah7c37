import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-[#E7F0FA] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-[#2E5E99] mb-4">
            <span className="h-2 w-2 rounded-full bg-[#2E5E99]"></span>
            New season just dropped
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0D2440]">
            SECRET <span className="font-light text-[#2E5E99]">CLOSET</span>
          </h1>
          <p className="mt-4 text-[#0D2440]/80 text-lg">
            Minimal pieces. Rounded details. Quiet luxury for every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/category/apparel" className="inline-flex items-center justify-center rounded-full bg-[#2E5E99] text-white px-6 py-3 font-semibold shadow hover:opacity-90 transition">
              Shop now
            </a>
            <a href="#new" className="inline-flex items-center justify-center rounded-full bg-white text-[#2E5E99] px-6 py-3 font-semibold shadow hover:bg-[#E7F0FA] transition">
              New arrivals
            </a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#E7F0FA]/0 via-[#E7F0FA]/40 to-[#E7F0FA]" />
    </section>
  );
}
