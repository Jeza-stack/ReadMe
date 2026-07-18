import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-black text-primary mb-4">404</p>
      <h1 className="text-2xl font-bold mb-3">Page not found</h1>
      <p className="text-muted-foreground mb-8">
        This page doesn&apos;t exist or has moved. Try the course catalogue, or search with{' '}
        <kbd className="px-1.5 py-0.5 rounded border text-xs">Ctrl+K</kbd>.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/" className="underline underline-offset-4 hover:text-primary">
          Home
        </Link>
        <Link href="/courses" className="underline underline-offset-4 hover:text-primary">
          All Courses
        </Link>
        <Link href="/cefr" className="underline underline-offset-4 hover:text-primary">
          CEFR English
        </Link>
      </div>
    </div>
  );
}
