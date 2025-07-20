# 🌟 CEFR English Learning Platform

A comprehensive, interactive English learning platform covering all 6 CEFR levels (A1-C2) with modern web technologies.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-cyan)
![React](https://img.shields.io/badge/React-18+-blue)

## 🚀 Features

### 📚 Complete CEFR Coverage
- **A1 Beginner**: 150 words, 20 grammar topics, 16 activities
- **A2 Elementary**: 300 words, 24 grammar topics, 20 activities
- **B1 Intermediate**: 500 words, 25 grammar topics, 25 activities
- **B2 Upper-Intermediate**: 750 words, 30 grammar topics, 30 activities
- **C1 Advanced**: 1000 words, 35 grammar topics, 35 activities
- **C2 Mastery**: 1500+ words, 40 grammar topics, 40 activities

### 🎯 Interactive Learning
- **Progress Tracking**: Persistent progress with localStorage
- **Interactive Exercises**: Multiple choice, fill-in-the-blank, matching
- **Vocabulary Mastery**: Pronunciation guides and spaced repetition
- **Skills Practice**: Reading, writing, listening, speaking activities
- **Assessment Tests**: Level-appropriate evaluations

### 📱 Modern Design
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Dark/Light Mode**: Automatic theme detection
- **Professional UI**: shadcn/ui components with Tailwind CSS
- **Smooth Animations**: Engaging user experience
- **Accessibility**: WCAG compliant design

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern UI components
- **Lucide React**: Professional icons

### Backend
- **Next.js API Routes**: Server-side functionality
- **LocalStorage**: Client-side data persistence
- **Static Generation**: Optimized performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd cefr-english-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

### Deploy to Netlify

1. **Build static files**
```bash
npm run build
npm run export
```

2. **Deploy to Netlify**
- Drag and drop `out` folder to Netlify
- Or connect GitHub repository

### Deploy to GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**
```json
{
  "scripts": {
    "deploy": "npm run build && npm run export && gh-pages -d out"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

## 🌐 Deployment Options

### 🔥 Vercel (Recommended)
- **Pros**: Optimized for Next.js, automatic deployments, global CDN
- **Cons**: Limited free tier
- **Best for**: Production applications

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cefr-english-platform)

### 🌊 Netlify
- **Pros**: Generous free tier, easy setup, form handling
- **Cons**: Requires static export for full features
- **Best for**: Static sites, MVP deployment

### 🐙 GitHub Pages
- **Pros**: Free for public repos, integrated with GitHub
- **Cons**: Static only, limited server features
- **Best for**: Open source projects, demos

### ☁️ AWS Amplify
- **Pros**: Full AWS integration, scalable
- **Cons**: More complex setup, costs
- **Best for**: Enterprise applications

### 🔵 DigitalOcean App Platform
- **Pros**: Simple deployment, reasonable pricing
- **Cons**: Smaller ecosystem
- **Best for**: Mid-size applications

## 📱 Mobile Optimization

### Responsive Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Mobile Features
- Touch-optimized interface
- Swipe navigation
- Offline capability
- Progressive Web App ready

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_APP_NAME="CEFR English Platform"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### Custom Styling
Modify `tailwind.config.js` for theme customization:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      }
    }
  }
}
```

## 📊 Performance

### Build Output
```
Route (app)                Size    First Load JS
○ /                       175 B   105 kB
○ /level/a1              7.29 kB  129 kB
○ /level/a2              7.27 kB  129 kB
○ /level/b1              8.46 kB  130 kB
○ /level/b2              9.15 kB  131 kB
○ /level/c1              9.23 kB  131 kB
○ /level/c2               10 kB   132 kB
```

### Optimization Features
- ✅ Static generation for all pages
- ✅ Image optimization
- ✅ Bundle splitting
- ✅ Tree shaking
- ✅ Minification

## 🧪 Testing

### Run Tests
```bash
npm test
```

### E2E Testing
```bash
npm run test:e2e
```

## 📚 Documentation

### Project Structure
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── level/
│       ├── a1/page.tsx
│       ├── a2/page.tsx
│       ├── b1/page.tsx
│       ├── b2/page.tsx
│       ├── c1/page.tsx
│       └── c2/page.tsx
└── components/
    └── ui/
```

### Key Components
- `LevelPage`: Individual CEFR level interface
- `VocabularyCard`: Interactive word learning
- `ProgressTracker`: Learning progress visualization
- `ExerciseComponent`: Interactive language exercises

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🆘 Support

### Common Issues
- **Build errors**: Check Node.js version (18+)
- **Styling issues**: Clear browser cache
- **Progress not saving**: Check localStorage permissions

### Getting Help
- 📧 Create an issue on GitHub
- 💬 Join our Discord community
- 📖 Check the documentation

## 🔮 Roadmap

### Planned Features
- [ ] Audio pronunciation system
- [ ] Offline mode enhancement
- [ ] Multi-language interface
- [ ] Teacher dashboard
- [ ] Progress analytics
- [ ] Certificate generation

### Version History
- **v1.0.0**: Initial release with all CEFR levels
- **v1.1.0**: Mobile optimization
- **v1.2.0**: Performance improvements

---

## 🌟 Acknowledgments

- CEFR Framework by Council of Europe
- Next.js team for the amazing framework
- Tailwind CSS for the utility classes
- shadcn for the beautiful UI components

**Made with ❤️ for English learners worldwide**
