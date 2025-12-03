'use client';
import { motion } from 'motion/react';
import { Marquee } from '@/components/ui/marquee';

const brands = [
  {
    name: 'MSD',
    logo: '/logos/02852_MSD_Logo_Horizontal_TealGrey_RGB.webp',
  },
  {
    name: 'Generali',
    logo: '/logos/generali.webp',
  },
  {
    name: 'Biogen',
    logo: '/logos/bio-logo.png',
  },
  {
    name: 'Mars',
    logo: '/logos/Mars,_Incorporated-Logo.wine.png',
  },
];

export default function TrustedBy() {
  return (
    <section className="py-16 bg-slate-200">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center text-sm font-medium text-slate-600 uppercase tracking-wider mb-8"
        >
          Trusted by teams at
        </motion.p>

        {/* Logo Marquee */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee className="[--gap:4rem] [--duration:25s]" pauseOnHover={true}>
            {brands.map((brand, index) => (
              <div
                key={index}
                className="h-14 flex items-center justify-center px-6"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-12 w-auto max-w-[160px] object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </Marquee>
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-200 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-200 to-transparent" />
        </div>
      </div>
    </section>
  );
}
