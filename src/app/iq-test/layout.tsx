import type { Metadata } from 'next';

// ponytail: iq-test pages are all client components and can't export metadata;
// this layout sets the tab title for the whole /iq-test section.
export const metadata: Metadata = {
  title: 'IQ & Cognitive Practice Test',
  description:
    'A stateless practice environment for logic, pattern, and reasoning skills with detailed answer explanations. For educational and entertainment purposes only.',
};

export default function IqTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
