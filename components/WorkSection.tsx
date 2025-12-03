'use client';
import { useRef } from 'react';
import { useTransform, motion, useScroll } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const caseStudies = [
  {
    title: 'Global Pharma Leader',
    industry: 'Healthcare / Pharma',
    color: '#1e293b',
    challenge: 'Fragmented consent data across 15 markets preventing compliant lifecycle campaigns',
    outcome: 'Unified consent framework with 99.9% audit compliance and 340% increase in marketable contacts',
    tags: ['SFMC', 'Veeva', 'GDPR', 'Consent'],
  },
  {
    title: 'European Insurance Group',
    industry: 'Financial Services',
    color: '#334155',
    challenge: 'Manual campaign processes causing 6-week delays and compliance risks',
    outcome: 'Automated governance workflows reducing launch time to 5 days with full audit trails',
    tags: ['Automation', 'Governance', 'Lifecycle'],
  },
];

export default function WorkSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="work" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">
            Real results for regulated industries
          </h2>
        </motion.div>

        <div ref={container} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              style={{ y: index === 1 ? y : undefined }}
              className="group"
            >
              <div
                className="h-full rounded-2xl overflow-hidden"
                style={{ backgroundColor: study.color }}
              >
                <div className="p-8 md:p-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-sm text-slate-300">{study.industry}</span>
                      <h3 className="text-2xl font-bold text-white mt-1">{study.title}</h3>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-400">Challenge</span>
                      <p className="text-slate-200 mt-2">{study.challenge}</p>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-wider text-green-400">Outcome</span>
                      <p className="text-white mt-2 font-medium">{study.outcome}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
                    {study.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
