'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Building2, Server, Mail, Shield, Database, AlertCircle, Calendar } from 'lucide-react';

const legalSections = [
  {
    id: 'publisher',
    icon: Building2,
    title: 'Publisher',
    content: `Company: SAS FORWARD
Registered address: 8 Rue Primo Levi, 93000 Bobigny, France
Legal form: Société par actions simplifiée (SAS)
CEO: Hatem Ben Maad`,
  },
  {
    id: 'hosting',
    icon: Server,
    title: 'Hosting',
    content: 'OVHcloud — 2 rue Kellermann, 59100 Roubaix, France.',
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Contact',
    content: 'For any question about this website, you can reach us via the contact form.',
  },
  {
    id: 'intellectual-property',
    icon: Shield,
    title: 'Intellectual Property',
    content:
      'All content on this website (texts, visuals, logo, layout) is the property of SAS FORWARD or its respective owners. Any reproduction, distribution, or modification without prior permission is prohibited.',
  },
  {
    id: 'personal-data',
    icon: Database,
    title: 'Personal Data',
    content:
      'Data submitted via the contact form is used only to respond to your request and is not shared with third parties. You can request access, rectification or deletion by contacting us through the form.',
  },
  {
    id: 'liability',
    icon: AlertCircle,
    title: 'Liability',
    content:
      'We strive to provide accurate information. However, SAS FORWARD cannot be held liable for errors, omissions, or unavailability of information and services.',
  },
];

interface LegalDialogProps {
  children: React.ReactNode;
}

export default function LegalDialog({ children }: LegalDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Legal Information
            </span>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
              Legal Notice
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
          <Accordion type="single" collapsible defaultValue="publisher" className="w-full">
            {legalSections.map((section) => {
              const Icon = section.icon;
              return (
                <AccordionItem key={section.id} value={section.id} className="border-b border-slate-200 last:border-0">
                  <AccordionTrigger className="px-4 py-4 hover:bg-slate-100 transition-colors [&[data-state=open]]:bg-slate-100">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon className="w-4 h-4 text-slate-600" />
                      </div>
                      <span className="font-semibold text-slate-900 text-sm">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="pl-11 text-slate-600 whitespace-pre-line leading-relaxed text-sm">
                      {section.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Last Update */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Calendar className="w-3 h-3" />
          <span>Last update: 2025-12-03</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
