# 📚 ReadMe - AI-Powered English Learning Platform

> Learn English language using AI with structured CEFR-aligned curriculum

[![Vercel Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://read-me-self.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

## 🎯 About This Project

**ReadMe** is a comprehensive English learning platform that follows the **Common European Framework of Reference for Languages (CEFR)** standards. Our platform provides:

- 📖 **Interactive Literature**: Classic poetry, prose, and famous speeches
- 🎯 **6 CEFR Levels**: From A1 (Beginner) to C2 (Proficiency)
- 🤖 **AI-Enhanced Learning**: Intelligent content and assessments
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🎥 **Multimedia Content**: Videos, interactive texts, and quizzes

## 🚀 Quick Start

### Prerequisites
- 📦 Node.js 18+ and npm
- 🌐 Modern web browser

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/ReadMe.git
cd ReadMe

# Install dependencies
npm install

# Start development server
npm run dev
```

🎉 **The application will be available at** `http://localhost:9002`

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Technology Stack

<div align="center">

| Technology | Description | Badge |
|------------|-------------|-------|
| **Next.js 15.3** | React framework with App Router | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) |
| **TypeScript** | Full type safety | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) |
| **Tailwind CSS** | Utility-first CSS framework | ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white) |
| **shadcn/ui** | Beautiful UI components | ![Radix](https://img.shields.io/badge/Radix_UI-161618?style=flat&logo=radix-ui&logoColor=white) |
| **Lucide React** | Beautiful icons | ![Lucide](https://img.shields.io/badge/Lucide-F56565?style=flat&logo=lucide&logoColor=white) |

</div>

## 📁 Project Structure

```
src/
├── 📱 app/
│   ├── page.tsx                 # 🏠 Homepage
│   ├── layout.tsx              # 📐 Root layout
│   ├── 📊 level/
│   │   ├── a1/page.tsx         # 🟢 A1 Beginner
│   │   ├── a2/page.tsx         # 🟢 A2 Elementary  
│   │   ├── b1/page.tsx         # 🟡 B1 Intermediate
│   │   ├── b2/page.tsx         # 🟡 B2 Upper Intermediate
│   │   ├── c1/page.tsx         # 🔴 C1 Advanced
│   │   └── c2/page.tsx         # 🔴 C2 Proficiency
│   ├── 📚 courses/
│   │   └── [courseSlug]/
│   │       └── [workSlug]/     # 📖 Individual literary works
│   └── ✅ assessment/page.tsx   # 🧪 Assessment system
├── 🧩 components/
│   ├── ui/                     # 🎨 UI components (shadcn/ui)
│   ├── Header.tsx              # 🧭 Navigation header
│   ├── Footer.tsx              # 📄 Site footer
│   └── LiteraryWorkClient.tsx  # 📚 Interactive content viewer
├── 📊 data/
│   └── readme-data.json        # 📖 Course content & literature
└── 🔧 lib/
    ├── utils.ts               # 🛠️ Utility functions
    └── types.ts               # 📝 TypeScript definitions
```

## 🎓 CEFR Levels & Features

<details>
<summary><strong>🟢 A1-A2: Beginner & Elementary</strong></summary>

- ✅ Basic vocabulary and grammar
- ✅ Simple conversations and texts  
- ✅ Essential daily communication
- ✅ Foundation building exercises

</details>

<details>
<summary><strong>🟡 B1-B2: Intermediate & Upper Intermediate</strong></summary>

- ✅ Complex grammar structures
- ✅ Academic and professional vocabulary
- ✅ Literary analysis skills
- ✅ Advanced writing techniques

</details>

<details>
<summary><strong>🔴 C1-C2: Advanced & Proficiency</strong></summary>

- ✅ Native-like language mastery
- ✅ Cultural nuances and subtleties
- ✅ Professional communication
- ✅ Creative and analytical writing

</details>

## 📚 Content Features

### 🎭 Literary Works
- **Poetry**: Classic and contemporary poems with interactive glossaries
- **Prose**: Short stories and excerpts with comprehension activities  
- **Speeches**: Historic speeches with video content and analysis

### 🎥 Multimedia Integration
- **YouTube Videos**: Embedded historic speeches (Nehru, Obama, Jobs)
- **Interactive Text**: Click-to-define difficult words
- **Quizzes**: Comprehension and knowledge testing
- **Progress Tracking**: Personal learning journey

### 🤖 AI-Enhanced Features
- **Smart Content**: AI-curated learning materials
- **Adaptive Assessments**: Personalized difficulty adjustment
- **Progress Analytics**: Detailed learning insights

## 🌐 Live Demo

🚀 **Visit the live application**: [read-me-self.vercel.app](https://read-me-self.vercel.app)

## 🤝 Contributing

We welcome contributions to improve the learning experience! 

### How to Contribute:
1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

## 📜 Educational Standards

This platform follows the official **Common European Framework of Reference for Languages** guidelines:

- ✅ **Can-do statements** for each level
- ✅ **Progressive skill development** 
- ✅ **Four skills integration** (Reading, Writing, Listening, Speaking)
- ✅ **Cultural competence** at advanced levels
- ✅ **Assessment criteria** aligned with CEFR descriptors

## 📄 License

Educational use project for English language learning.

---

<div align="center">

**Made with ❤️ for English learners worldwide**

[![GitHub stars](https://img.shields.io/github/stars/your-username/ReadMe?style=social)](https://github.com/your-username/ReadMe)
[![GitHub forks](https://img.shields.io/github/forks/your-username/ReadMe?style=social)](https://github.com/your-username/ReadMe)

*Thank you for visiting — happy learning!* 🚀📚

</div>
