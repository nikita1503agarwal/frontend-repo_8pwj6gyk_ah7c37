import Navbar from './components/Navbar';
import ShippingBar from './components/ShippingBar';
import Hero from './components/Hero';
import { CategoryCards, BestSellers, NewArrivals, Deals } from './components/Sections';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#E7F0FA]">
      <ShippingBar />
      <Navbar />
      <Hero />
      <CategoryCards />
      <BestSellers />
      <NewArrivals />
      <Deals />
      <Footer />
    </div>
  )
}

export default App