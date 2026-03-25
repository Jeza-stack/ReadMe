import { cn } from '@/lib/utils';

export function Section({ id, title, lead, children, className }: { id?: string; title?: string; lead?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('py-24', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl md:text-6xl font-bold mb-6">{title}</h2>
            {lead && <p className="text-xl text-foreground/70 max-w-3xl mx-auto">{lead}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}