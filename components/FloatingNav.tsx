'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Training', href: '#training' },
  { name: 'Our Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full transition-all duration-300',
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg border border-slate-200/50'
            : 'bg-white/70 backdrop-blur-md'
        )}
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1177.86 262.3"
              className="h-8 w-auto"
            >
              <g>
                <text
                  fill="#1b1f33"
                  fontSize="119.23"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="700"
                  transform="translate(197.51 166.75)"
                >
                  <tspan>Forward</tspan>
                </text>
                <polygon fill="#1b1f33" points="36.4 233.42 103.59 180.08 36.4 180.08 36.4 233.42" />
                <polygon fill="#1b1f33" points="171.19 126.42 116.26 85.86 116.26 116.26 36.4 116.26 36.4 142.94 116.26 142.94 116.26 170.02 171.19 126.42" />
                <polygon fill="#1b1f33" points="107.14 79.12 0 0 0 79.12 107.14 79.12" />
                <polygon fill="#1b1f33" points="0 261.43 0 262.3 1.1 261.43 0 261.43" />
              </g>
            </svg>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-slate-900 after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="hidden lg:block bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            Discuss your needs
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 bg-white rounded-2xl shadow-xl border border-slate-200 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-lg font-medium text-slate-700 hover:text-slate-900 transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="bg-slate-900 text-white px-5 py-3 rounded-full text-center font-medium hover:bg-slate-800 transition-colors mt-2"
              >
                Discuss your needs
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
