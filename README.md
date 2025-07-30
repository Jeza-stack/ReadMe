# Read Me

Learn english language using AI.

<!-- Deploy trigger: Updated to fix JSON parsing issue -->

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
The application will be available at `http://localhost:9002`

### Build
```bash
npm run build
```

## Technology Stack

- **Framework**: Next.js 15.3 with App Router
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Font**: Inter + Poppins

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx              # Root layout
│   ├── level/
│   │   ├── a1/page.tsx         # A1 level page
│   │   ├── a2/page.tsx         # A2 level page
│   │   ├── b1/page.tsx         # B1 level page
│   │   ├── b2/page.tsx         # B2 level page
│   │   ├── c1/page.tsx         # C1 level page
│   │   └── c2/page.tsx         # C2 level page
│   └── assessment/page.tsx     # Assessment system
├── components/
│   ├── ui/                     # UI components
│   ├── Header.tsx              # Navigation header
│   └── Footer.tsx              # Site footer
└── lib/
    └── utils.ts                # Utility functions
```

## CEFR Standards Compliance

This platform follows the official Common European Framework of Reference for Languages guidelines:

- **Can-do statements** for each level
- **Progressive skill development** 
- **Four skills integration** (Reading, Writing, Listening, Speaking)
- **Cultural competence** at advanced levels
- **Assessment criteria** aligned with CEFR descriptors

## Contributing

This is an educational platform designed to help English learners progress systematically through the CEFR framework. The content is structured to provide clear learning paths and measurable progress indicators.

## License

Educational use project for English language learning.
