'use client';
import { useRef } from 'react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { CheckCircle } from 'lucide-react';

const services = [
  {
    title: 'CRM Consulting',
    description: 'Strategic advisory for your CRM transformation',
    color: '#1e293b',
    image: '/crm_consulting.jpg',
    points: [
      'Discovery workshops & diagnostics',
      'Target architecture design',
      'Governance frameworks (GDPR, HIPAA)',
      'ROI modeling & business case',
    ],
  },
  {
    title: 'Integrations & Automations',
    description: 'Robust connections that scale with your business',
    color: '#334155',
    image: '/automation.jpg',
    points: [
      'Salesforce ↔ Marketing Cloud integrations',
      'Veeva CRM & Vault connectivity',
      'Data model & consent management',
      'Identity resolution & automation workflows',
    ],
  },
  {
    title: 'Training & Enablement',
    description: 'Build internal capability that lasts',
    color: '#475569',
    image: '/training.jpg',
    points: [
      'SFMC certification prep & workshops',
      'Lifecycle campaign design',
      'Segmentation & data quality best practices',
      'Documented handoffs for independence',
    ],
  },
];

interface CardProps {
  i: number;
  title: string;
  description: string;
  color: string;
  image: string;
  points: string[];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card = ({ i, title, description, color, image, points, progress, range, targetScale }: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative -top-[25%] h-[500px] w-[90%] max-w-4xl rounded-2xl p-8 md:p-12 origin-top text-white shadow-2xl"
      >
        <div className="flex flex-col md:flex-row gap-8 h-full">
          <div className="flex-1 space-y-6">
            <div>
              <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">
                Service {i + 1}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mt-2">{title}</h3>
              <p className="text-slate-300 mt-3 text-lg">{description}</p>
            </div>

            <ul className="space-y-3">
              {points.map((point, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            className="flex-1 rounded-xl overflow-hidden"
            style={{ scale: imageScale }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Services() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="services" className="bg-white">
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-slate-500 uppercase tracking-wider"
          >
            What we deliver
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mt-4"
          >
            Services built for enterprise CRM
          </motion.h2>
        </div>
      </div>

      <div ref={container} className="relative">
        {services.map((service, i) => {
          const targetScale = 1 - (services.length - i) * 0.05;
          return (
            <Card
              key={i}
              i={i}
              {...service}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
