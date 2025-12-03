'use client';
import { motion } from 'motion/react';
import { Users, Shield, Target, GraduationCap } from 'lucide-react';

const differentiators = [
  {
    icon: Users,
    title: 'Small senior team',
    description: 'No junior consultants or offshore handoffs',
  },
  {
    icon: Shield,
    title: 'Architecture-first',
    description: 'Governance and audit-readiness from day one',
  },
  {
    icon: Target,
    title: 'Regulated expertise',
    description: 'Deep experience in pharma, healthcare, insurance',
  },
  {
    icon: GraduationCap,
    title: 'Enablement focus',
    description: 'We build your capability, then step back',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - About Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                About Forward
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Boutique consulting for{' '}
                <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                  enterprise Salesforce
                </span>
              </h2>

              <div className="space-y-4 text-lg text-slate-600">
                <p>
                  Forward is an advisory-first CRM consultancy focused exclusively on the
                  Salesforce ecosystem — Sales Cloud, Marketing Cloud, and integrations with
                  industry platforms like Veeva.
                </p>
                <p>
                  We work with enterprise teams in regulated industries who need more than
                  implementation — they need architecture that survives audits, integrations
                  that scale, and internal capability that lasts beyond the engagement.
                </p>
                <p>
                  Based in France, serving EU/EMEA clients who value senior expertise over
                  agency overhead.
                </p>
              </div>

              {/* Logo */}
              <div className="pt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1177.86 262.3"
                  className="h-12 w-auto opacity-80"
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
              </div>
            </motion.div>

            {/* Right - Differentiators */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                What makes us different
              </h3>

              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="text-center p-4 bg-slate-900 rounded-xl text-white">
                  <div className="text-3xl font-bold">60%</div>
                  <div className="text-sm text-slate-300">of Big 4 pricing</div>
                </div>
                <div className="text-center p-4 bg-slate-800 rounded-xl text-white">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-slate-300">Senior consultants</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
