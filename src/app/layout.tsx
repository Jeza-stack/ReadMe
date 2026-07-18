import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeAtmosphere } from '@/components/ThemeAtmosphere';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter, Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

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
  metadataBase: new URL('https://read-me-self.vercel.app'),
  title: {
    default: 'ReadMe — English Literature, Language & AI Literacy',
    template: '%s | ReadMe',
  },
  description:
    'Free, academically rigorous study guides for English Literature, CEFR English, and AI literacy — built by a lecturer to complement the classroom, for students in the Pacific and beyond.',
  openGraph: {
    siteName: 'ReadMe',
    type: 'website',
    locale: 'en_GB',
    title: 'ReadMe — English Literature, Language & AI Literacy',
    description:
      'Free study guides: literature analysis, CEFR English lessons, AI literacy, and academic skills.',
  },
  twitter: {
    card: 'summary',
    title: 'ReadMe — English Literature, Language & AI Literacy',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn("font-body antialiased bg-background text-foreground", fontBody.variable, fontHeadline.variable, "min-h-screen flex flex-col")}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':true;if(d)document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-3 py-2 rounded">Skip to main content</a>
        <ThemeAtmosphere />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main id="main" className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
