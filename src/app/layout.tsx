import type { Metadata } from 'next';
import './globals.css';
// Simple navigation for CEFR platform
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter, Poppins } from 'next/font/google';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'CEFR English Learning Platform - Master English Step by Step',
  description: 'Learn English systematically with our CEFR-aligned platform. From A1 beginner to C2 proficiency, master all language skills with interactive lessons and assessments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn("font-body antialiased", fontBody.variable, fontHeadline.variable, "min-h-screen flex flex-col")}>
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-14 flex items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EN</span>
              </div>
              <span className="font-bold text-xl">CEFR English</span>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="border-t bg-background py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; 2024 CEFR English Learning Platform. Made with ❤️ for English learners worldwide.</p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
