# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Forward website project - a B2B landing page for a boutique CRM/Salesforce Marketing Cloud consulting firm targeting enterprise clients in regulated industries (healthcare, pharma, insurance) across EU/EMEA.

**Company:** SAS FORWARD (French SAS based in Bobigny, France)

## Project Status

Pre-development phase. The repository contains:
- Strategy documents (`Forward_CRM_SFMC_Strategy.md`, `Forward_Executive_Summary.md`)
- Website content specification (`forward_website_content.txt`)
- Brand assets (`FS_BLUE_FORWARD.svg`)
- MCP configuration for shadcn and UI Layouts

## MCP Servers Configured

Two MCP servers are available via `.mcp.json`:
- **shadcn**: Standard shadcn component library
- **ui-layouts**: Additional layouts from ui-layouts.com registry

## Website Structure (To Be Built)

Pages: Homepage, Services, Training, About, Contact, Legal

### Key Sections (from strategy docs)
1. Hero (problem-focused headline + soft CTA)
2. Social Proof (client logos: MSD, GENERALI, Biogen, MARS)
3. Problem Section
4. Methodology (3-5 principles)
5. Results/Case Study Snapshots
6. Risk Mitigation Roadmap
7. Deep-Dive Case Study
8. Credentials & Differentiators
9. Final CTA

## Brand & Tone Guidelines

### Language
- Primary: French (with English alternatives)
- Tone: "Adaptive Formalism" - professional but not stiff
- Avoid: Generic agency speak, unquantified claims, jargon without explanation

### CTA Language (French)
- Use: "Réservez un atelier de découverte", "Planifiez votre diagnostic"
- Avoid: "Parlez à un expert", "Demandez une démo", "Commencez maintenant"

### Key Differentiators to Emphasize
1. Governance-first architecture (audit-ready Day 1)
2. Senior expert continuity (no consultant rotation)
3. Regulated industry expertise (GDPR, HIPAA, pharma compliance)
4. Cost efficiency (60% of Big 4 pricing)
5. Client independence focus (documented handoff)

## Technical Notes

When building this site:
- Use shadcn components via the configured MCP
- Mobile optimization required (40%+ traffic expected mobile)
- Form must include GDPR-compliant privacy checkbox
- Contact form fields: Name, Email, Company, Message
- Include reCAPTCHA
