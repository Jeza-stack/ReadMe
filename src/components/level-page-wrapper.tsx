'use client';

import dynamic from 'next/dynamic';
import { Loading } from '@/components/ui/loading';

// Dynamically import level pages for code splitting
const A1Page = dynamic(() => import('@/app/level/a1/page'), {
  loading: () => <Loading size="lg" className="mx-auto mt-8" />
});

const A2Page = dynamic(() => import('@/app/level/a2/page'), {
  loading: () => <Loading size="lg" className="mx-auto mt-8" />
});

const B1Page = dynamic(() => import('@/app/level/b1/page'), {
  loading: () => <Loading size="lg" className="mx-auto mt-8" />
});

const B2Page = dynamic(() => import('@/app/level/b2/page'), {
  loading: () => <Loading size="lg" className="mx-auto mt-8" />
});

const C1Page = dynamic(() => import('@/app/level/c1/page'), {
  loading: () => <Loading size="lg" className="mx-auto mt-8" />
});

const C2Page = dynamic(() => import('@/app/level/c2/page'), {
  loading: () => <Loading size="lg" className="mx-auto mt-8" />
});

interface LevelPageWrapperProps {
  level: 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';
}

export function LevelPageWrapper({ level }: LevelPageWrapperProps) {
  const components = {
    a1: A1Page,
    a2: A2Page,
    b1: B1Page,
    b2: B2Page,
    c1: C1Page,
    c2: C2Page,
  };

  const Component = components[level];
  
  if (!Component) {
    return <div>Level not found</div>;
  }

  return <Component />;
}