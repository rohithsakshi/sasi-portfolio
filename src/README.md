# Sasidharan K. — Portfolio Website

## 🚀 Quick Start

```bash
npm install
npm run dev
```
Open http://localhost:3000

## 📁 Project Structure

```
sasi-portfolio/
├── app/
│   ├── globals.css          ← Color palette, glass system, fonts
│   ├── layout.tsx           ← Root layout
│   ├── page.tsx             ← Main page (lazy loads 3D + particles)
│   └── components/
│       ├── Navbar.tsx       ← Floating glass navbar
│       ├── Hero.tsx         ← Full-screen hero with rotating skills
│       ├── Skills.tsx       ← Skills grid + animated progress bars
│       ├── Projects.tsx     ← Featured projects cards
│       ├── Thesis.tsx       ← Thesis research stats
│       ├── Experience.tsx   ← Timeline + achievements
│       ├── Contact.tsx      ← Contact section + footer
│       ├── Scene3D.tsx      ← Three.js floating orbs + rings
│       └── ParticleBackground.tsx  ← tsParticles background
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🎨 Color Palette (from your reference image)

| Name       | Hex       | Usage                         |
|------------|-----------|-------------------------------|
| White      | #f5f8ff   | Glass surfaces, text on dark  |
| Light Blue | #c8d8e8   | Background, light surfaces    |
| Slate      | #607080   | Muted text, secondary cards   |
| Royal Blue | #1a6ef5   | Primary accent, CTAs          |
| Sky Blue   | #1a9ef5   | Secondary accent, gradients   |
| BG         | #a8bed0   | Page background base          |

## ✨ Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Framer Motion** – all animations, scroll-triggered reveals
- **Three.js / @react-three/fiber** – floating 3D orbs and rings
- **tsParticles** – interactive particle background
- **CSS Custom Properties** – glassmorphism design system
- **No Tailwind** – pure CSS with CSS variables

## 🌊 Glassmorphism System

```css
.glass {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.25);
  box-shadow: 0 8px 64px rgba(26,110,245,0.12);
}
```

## 📦 Sections

1. **Hero** — Name, rotating skills text, social links, scroll indicator
2. **Skills** — 4 category cards + 6 animated proficiency bars
3. **Projects** — 3 project cards with highlights
4. **Thesis** — Research stats, process stages
5. **Experience** — Timeline with internship & education
6. **Contact** — CTA + contact links grid
