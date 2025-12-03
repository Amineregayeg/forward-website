import SmoothScroll from "@/components/ui/smooth-scroll";
import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustedBy from "@/components/TrustedBy";
import MainCtaStripe from "@/components/MainCtaStripe";
import TrainingSection from "@/components/TrainingSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import LegalDialog from "@/components/LegalSection";
import LiquidGlassWidget from "@/components/LiquidGlassWidget";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-white">
        {/* Floating Navigation */}
        <FloatingNav />

        {/* Hero Section */}
        <Hero />

        {/* Services - Stacking Cards */}
        <Services />

        {/* Trusted By - Infinity Brand Loop */}
        <TrustedBy />

        {/* Main CTA - Stripe Card with Gradient Border */}
        <MainCtaStripe />

        {/* Training Section - Hover Accordion */}
        <TrainingSection />

        {/* Work / Case Studies Section */}
        <WorkSection />

        {/* About Section */}
        <AboutSection />

        {/* Contact Section - Gradient Border Form */}
        <ContactSection />

        {/* Footer */}
        <footer className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Logo & Description */}
              <div className="md:col-span-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1177.86 262.3"
                  className="h-10 w-auto mb-4"
                >
                  <g>
                    <text
                      fill="white"
                      fontSize="119.23"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fontWeight="700"
                      transform="translate(197.51 166.75)"
                    >
                      <tspan>Forward</tspan>
                    </text>
                    <polygon fill="white" points="36.4 233.42 103.59 180.08 36.4 180.08 36.4 233.42" />
                    <polygon fill="white" points="171.19 126.42 116.26 85.86 116.26 116.26 36.4 116.26 36.4 142.94 116.26 142.94 116.26 170.02 171.19 126.42" />
                    <polygon fill="white" points="107.14 79.12 0 0 0 79.12 107.14 79.12" />
                    <polygon fill="white" points="0 261.43 0 262.3 1.1 261.43 0 261.43" />
                  </g>
                </svg>
                <p className="text-slate-400 max-w-md">
                  Advisory-first CRM consulting for enterprise Salesforce. Based in France, serving EU/EMEA clients who value senior expertise over agency overhead.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">Services</a>
                  </li>
                  <li>
                    <a href="#training" className="hover:text-white transition-colors">Training</a>
                  </li>
                  <li>
                    <a href="#work" className="hover:text-white transition-colors">Our Work</a>
                  </li>
                  <li>
                    <a href="#about" className="hover:text-white transition-colors">About</a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-slate-400">
                  <li>
                    <a href="#contact" className="hover:text-white transition-colors">Get in Touch</a>
                  </li>
                  <li>Bobigny, France</li>
                  <li>EU/EMEA Coverage</li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} SAS FORWARD. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-slate-500">
                <LegalDialog>
                  <button className="hover:text-white transition-colors">Privacy Policy</button>
                </LegalDialog>
                <LegalDialog>
                  <button className="hover:text-white transition-colors">Legal Notice</button>
                </LegalDialog>
              </div>
            </div>
          </div>
        </footer>

        {/* Liquid Glass Widget - Floating Social */}
        <LiquidGlassWidget />
      </main>
    </SmoothScroll>
  );
}
