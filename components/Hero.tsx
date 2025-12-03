'use client';
import { motion } from 'motion/react';
import ScrollTextSwap from '@/components/ui/scroll-text-swap';
import ButtonCreativeRight from '@/components/ui/button-creative-right';
import ButtonCreativeTop from '@/components/ui/button-creative-top';
import ButtonHoverRight from '@/components/ui/button-hover-right';

const valueProps = [
  'Resilient CRM architectures',
  'Safe Salesforce & Veeva integrations',
  'Lifecycle marketing that performs',
  'Training that sticks',
];

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-32 pb-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 -z-10" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f910_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f910_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                  CRM architectures, integrations & training that make Salesforce{' '}
                  <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                    safer and more effective
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl"
              >
                Advisory-first consulting for resilient CRM architecture, secure SFDC↔SFMC
                integrations, lifecycle marketing automation, and team enablement in regulated industries.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 items-center"
              >
                <ButtonCreativeRight onClick={() => scrollToSection('#about')} />
                <ButtonCreativeTop onClick={() => scrollToSection('#work')} />
                <ButtonHoverRight onClick={() => scrollToSection('#contact')} />
              </motion.div>
            </div>

            {/* Right Content - Video Mask and Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div
                className="relative w-full aspect-square max-w-lg mx-auto overflow-visible"
                style={{
                  maskImage: `url("data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A")`,
                  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A")`,
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskSize: '100%',
                  WebkitMaskSize: '100%',
                  maskPosition: 'center 45%',
                  WebkitMaskPosition: 'center 45%',
                }}
              >
                {/* Impact Metrics Video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/videos/impact-metrics.mp4"
                />
              </div>

              {/* Floating decorative elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-12 -left-4 w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll Text Section */}
      <section className="bg-slate-900 relative">
        <ScrollTextSwap
          texts={valueProps}
          textClassName="text-left"
        />
      </section>
    </>
  );
}
