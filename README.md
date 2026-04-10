# [ Dev Portfolio]

A high-performance, edge-optimized professional portfolio built to demonstrate modern CI/CD workflows and secure communication systems.

## The Stack


    Frontend: Next.js 15+ (App Router, Server Components)

    Styling: Tailwind CSS & Framer Motion (for fluid, 60fps animations)

    Backend: Next.js Server Actions (Edge Runtime)

    Email Engine: Brevo API via secure server-side fetching

    Deployment: Cloudflare Pages (CI/CD integrated with GitHub)

## Project Structure

```text
.
├── src/
│   └── app/
│       ├── actions.ts      # Fullstack Server Actions (Email logic)
│       ├── layout.tsx      # Fonts, Metadata, and Global CSS
│       └── page.tsx        # Main Portfolio UI & Animations
├── public/                 # Static assets (Images, Favicons)
├── wrangler.jsonc          # Cloudflare Deployment Configuration
├── open-next.config.ts     # Next.js ↔ Cloudflare Adapter settings
├── .dev.vars               # (Ignored) Local Secret Storage
└── README.md               # Project Documentation
```

## Getting Started

    Clone & Install:
    Bash

    git clone https://github.com/CiobanDaniel/my-portfolio.git
    cd portfolio
    npm install

    Environment Setup:
    Create a .dev.vars file in the root:
    Plaintext

    BREVO_API_KEY=your_api_key_here

    Run Development Server:
    Bash

    npm run dev