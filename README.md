# CEFR English Learning Platform

A comprehensive static website for learning English based on the Common European Framework of Reference for Languages (CEFR). This platform provides structured learning paths from complete beginner (A1) to native-like proficiency (C2).

## Features

### 🎯 CEFR-Aligned Content
- **Six proficiency levels**: A1, A2, B1, B2, C1, C2
- Detailed level descriptions and can-do statements
- Progressive skill development across all levels

### 📚 Comprehensive Curriculum
- **Grammar**: Level-appropriate grammar topics with lessons
- **Vocabulary**: Thematic vocabulary sets for each level
- **Four Skills**: Reading, Writing, Listening, Speaking practice
- **Assessments**: Practice tests and final evaluations

### 🔍 Assessment System
- **Quick Assessment** (15 minutes): Basic level estimation
- **Comprehensive Test** (90 minutes): Full skills evaluation
- **Skills-Based Assessment** (45 minutes): Targeted skill testing
- Detailed feedback and learning recommendations

### 💻 Modern Interface
- Responsive design built with Next.js and Tailwind CSS
- Interactive components using shadcn/ui
- Dark mode support
- Progressive navigation between levels

## Level Structure

### A1 - Beginner
- Basic greetings and personal information
- Present simple tense and articles
- Essential vocabulary for daily life
- Simple reading and writing tasks

### A2 - Elementary
- Past tenses and future forms
- Shopping, travel, and work vocabulary
- Simple conversations and routine tasks
- Basic email and message writing

### B1 - Intermediate
- Present perfect and conditionals
- Abstract concepts and technology vocabulary
- Travel situations and experience descriptions
- Essay writing and presentations

### B2 - Upper Intermediate
- Advanced conditionals and passive voice
- Academic and professional vocabulary
- Complex text comprehension
- Detailed writing and discussions

### C1 - Advanced
- Discourse markers and complex structures
- Specialized professional terminology
- Academic research and cultural contexts
- Professional presentations and reports

### C2 - Proficiency
- Native-like language mastery
- Expert professional communication
- Cultural subtleties and nuanced expression
- Creative and analytical writing

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
