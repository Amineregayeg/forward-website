'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const trainingModules = [
  {
    id: 1,
    title: 'SFMC — Executive Overview',
    duration: '90 min',
    description:
      'Strategic overview of Marketing Cloud capabilities, ROI potential, and governance requirements for leadership teams.',
    details: 'Covers platform architecture, compliance considerations, and executive decision frameworks.',
    image: '/image1.jpg',
  },
  {
    id: 2,
    title: 'Automations, Data Quality & Governance',
    duration: 'Full day',
    description:
      'Deep dive into automation studio, journey builder best practices, and data quality frameworks.',
    details: 'Hands-on exercises with real scenarios. Includes documentation templates.',
    image: '/image2.jpg',
  },
  {
    id: 3,
    title: 'Lifecycle Campaigns & Segmentation',
    duration: 'Full day',
    description:
      'Master subscriber lifecycle campaigns, advanced segmentation techniques, and personalization at scale.',
    details: 'Build real campaigns during the session. Take home ready-to-deploy templates.',
    image: '/image3.jpg',
  },
];

export default function TrainingSection() {
  const [expandedId, setExpandedId] = useState<number | null>(2);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="training" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Training Programs
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">
              Build lasting capability
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              Practical, hands-on training that your teams will actually use. No fluff, just actionable skills.
            </p>
          </motion.div>

          {/* Hover Accordion */}
          <div className="flex flex-col md:flex-row gap-2">
            {trainingModules.map((module) => (
              <motion.div
                key={module.id}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  expandedId === module.id ? 'md:w-[60%] w-full' : 'md:w-[20%] w-full'
                }`}
                onMouseEnter={() => setExpandedId(module.id)}
                onClick={() => setExpandedId(module.id)}
                initial={false}
              >
                <div
                  className="h-[400px] relative p-6 flex flex-col justify-end bg-cover bg-center"
                  style={{ backgroundImage: `url(${module.image})` }}
                >
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30" />
                  <AnimatePresence mode="wait">
                    {expandedId === module.id ? (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 relative z-10"
                      >
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                          {module.duration}
                        </span>
                        <h3 className="text-2xl font-bold text-white">{module.title}</h3>
                        <p className="text-slate-200">{module.description}</p>
                        <p className="text-slate-300 text-sm">{module.details}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToContact();
                          }}
                          className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all group"
                        >
                          Request this training
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:rotate-180 md:[writing-mode:vertical-rl] relative z-10"
                      >
                        <h3 className="text-xl font-bold text-white">{module.title}</h3>
                        <span className="text-sm text-slate-300">{module.duration}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
