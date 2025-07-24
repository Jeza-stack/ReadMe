import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { GlobalScripts } from '@/components/global-scripts';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter, Poppins } from 'next/font/google';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap', // Optimize font loading
  preload: true,
});

const fontHeadline = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-headline',
  display: 'swap', // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  title: 'CEFR English Learning Platform - Master English Step by Step',
  description: 'Learn English systematically with our CEFR-aligned platform. From A1 beginner to C2 proficiency, master all language skills with interactive lessons and assessments.',
  // Add performance-related meta tags
  other: {
    'theme-color': '#3b82f6',
    'color-scheme': 'dark light',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/favicon.ico" as="image" />
      </head>
      <body className={cn("font-body antialiased", fontBody.variable, fontHeadline.variable, "min-h-screen flex flex-col")}>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="border-t bg-background py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; 2024 CEFR English Learning Platform. Made with ❤️ for English learners worldwide.</p>
          </div>
        </footer>
        <GlobalScripts />
        <Toaster />
      </body>
    </html>
  );
}
