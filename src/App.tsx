import { AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer';

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {/* Floating WhatsApp CTA */}
      <Link
        to="/enquiry"
        aria-label="Go to Inquiry page"
        className="inquiry-float flex flex-col items-center justify-center"
      >
        <img
          src="/trails-inquiry.png"   // change path to your image
          alt="Inquiry"
          className="inquiry-icon"
        />
        <span className="text-[10px] sm:text-xs font-bold text-[#173036] tracking-wider uppercase mt-1">Inquiry</span>
      </Link>
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default App;
