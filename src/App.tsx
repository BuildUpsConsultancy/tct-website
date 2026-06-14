import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, Link, Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { MessageCircle } from 'lucide-react';

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />

      {/* Floating Inquiry Icon */}
      <Link to="/enquiry" className="fixed bottom-6 right-6 z-50 group">
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#173036] text-[#a7d9d5] shadow-xl shadow-black/20 border border-[#a7d9d5]/20 group-hover:bg-[#1a4d56] group-hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <MessageCircle className="h-6 w-6" />
        </motion.div>
      </Link>
    </>
  );
}

export default App;