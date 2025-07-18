import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
  title: 'ReadMe - Your Educational Platform',
  description: 'A multi-course educational website for soft skills and professional development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn("font-body antialiased", fontBody.variable, fontHeadline.variable, "min-h-screen flex flex-col sunrise-gradient")}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
