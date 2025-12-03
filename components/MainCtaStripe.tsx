'use client';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  'Audit-ready governance from day one',
  'Senior consultants throughout (no rotations)',
  'Documented handoffs for full independence',
];

export default function MainCtaStripe() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Gradient Border Wrapper */}
        <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-slate-400 via-slate-600 to-slate-400">
          {/* Inner Card (Stripe Card style) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white rounded-2xl overflow-hidden"
          >
            {/* Background gradient accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-100 to-transparent" />

            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-slate-600">90-day transformation</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                    Need to fix CRM data quality and governance in 90 days?
                  </h2>

                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <button
                    onClick={scrollToContact}
                    className="group inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-900/20"
                  >
                    Schedule a diagnostic call
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Right Visual - Forward Hero Video */}
                <div className="relative">
                  <div className="aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      src="/videos/forward-hero-square.mp4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
