import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTopButton } from './ScrollToTopButton';

const WHATSAPP_URL = 'https://wa.me/94773268999?text=Hi%20WanderQuest%2C%20I%27d%20like%20to%20inquire%20about%20a%20tour.';

function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 left-6 z-40 flex items-end gap-2">
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-3 mb-1 max-w-[200px]"
              >
                <p className="text-xs font-semibold text-gray-800 mb-0.5">Chat with a travel expert</p>
                <p className="text-xs text-gray-400">Usually replies in under 5 minutes</p>
                <div className="absolute -right-1.5 bottom-4 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.35, type: 'spring', bounce: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label="Chat with us on WhatsApp"
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            style={{ backgroundColor: '#25D366' }}
          >
            <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" aria-hidden="true">
              <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.371.647 4.593 1.773 6.507L2.667 29.333l6.987-1.76A13.267 13.267 0 0 0 16.004 29.333c7.36 0 13.329-5.973 13.329-13.333S23.364 2.667 16.004 2.667zm0 24C10.373 26.667 5.333 21.627 5.333 16c0-5.627 5.04-10.667 10.671-10.667S26.667 10.373 26.667 16 21.63 26.667 16.004 26.667zm5.949-7.893c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.227-.16.187-.347.213-.667.053-.32-.16-1.347-.493-2.56-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.267-.64-.533-.547-.72-.56h-.613c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.26 3.453 5.48 4.84.747.32 1.333.507 1.787.667.747.24 1.427.2 1.96.12.6-.093 1.84-.747 2.107-1.467.267-.72.267-1.333.187-1.467-.08-.133-.293-.213-.613-.373z"/>
            </svg>
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
      <WhatsAppButton />
      <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          style: { fontFamily: 'Plus Jakarta Sans, sans-serif', borderRadius: '12px' },
          duration: 4000,
        }}
      />
    </div>
  );
}
