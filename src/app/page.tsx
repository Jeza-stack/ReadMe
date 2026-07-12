import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Globe,
  Cpu,
  Users,
  GraduationCap,
  BrainCircuit,
  ArrowRight,
} from 'lucide-react';

// ── Data ────────────────────────────────────────────────────────

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=800`;

const englishCourses = [
  { slug: 'english-1', key: 'english-i', name: 'English I', blurb: 'Foundations: poetry, prose, short stories, and workplace English.', image: unsplash('photo-1456513080510-7bf3a84b82f8') },
  { slug: 'english-2', key: 'english-ii', name: 'English II', blurb: 'Poetry, prose, fiction, academic writing, and contemporary issues.', image: unsplash('photo-1503676260728-1c00da094a0b') },
  { slug: 'english-3', key: 'english-iii', name: 'English III', blurb: 'Poetry, Shakespeare, great speeches, and professional communication.', image: unsplash('photo-1513475382585-d06e58bcb0e0') },
  { slug: 'english-4', key: 'english-iv', name: 'English IV', blurb: 'Life writing, one-act plays, interviews, and advanced academic English.', image: unsplash('photo-1486312338219-ce68d2c6f44d') },
];

const pillars = [
  { name: 'CEFR English', href: '/courses/cefr-english', accent: '#0369A1', icon: Globe, blurb: 'A1 to C2 — grammar, vocabulary, and the four skills, level by level.', image: unsplash('photo-1522202176988-66273c2fd55f') },
  { name: 'AI for Students', href: '/courses/ai-tools', accent: '#6D28D9', icon: Cpu, blurb: 'Use AI well: study skills, assignments, ethics, and academic integrity.', image: unsplash('photo-1677442136019-21780ecad995') },
  { name: 'Soft Skills', href: '/soft-skills', accent: '#059669', icon: Users, blurb: 'Communication, teamwork, leadership, and career readiness.', image: unsplash('photo-1517048676732-d65bc937f952') },
  { name: 'Academic Success', href: '/courses/academic-language', accent: '#C2540A', icon: GraduationCap, blurb: 'Essay writing, referencing, critical thinking, and exam preparation.', image: unsplash('photo-1434030216411-0b793f4b4173') },
  { name: 'IQ Test (Cognitive Assessment)', href: '/iq-test', accent: '#475569', icon: BrainCircuit, blurb: 'A structured profile of your reasoning, verbal, and numerical strengths.', image: unsplash('photo-1558244661-d248897f7bc4') },
  { name: 'All Courses', href: '/courses', accent: '#6B7280', icon: BookOpen, blurb: 'Browse the full catalogue of guides, courses, and assessments.', image: unsplash('photo-1481627834876-b7833e8f5570') },
];

// ── Page (server component — no client JS, no loading flash) ────

export default function HomePage() {
  return (
    <div className="bg-[color:var(--ce-deep-navy,#0E141F)]">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-10 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-white leading-tight">
          Your courses. Your guides. One place.
        </h1>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
          Free, academically rigorous resources for English Literature, English
          Language, and AI literacy — built by a lecturer, for students.
        </p>
        <div className="mt-6">
          <Link
            href="/assessment/quick"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-7 py-3 transition-colors"
          >
            Find your CEFR level in 15 minutes — free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* English Courses — primary tier */}
      <section aria-labelledby="english-courses" className="max-w-5xl mx-auto px-4 pb-12">
        <h2 id="english-courses" className="font-headline text-2xl font-bold text-white mb-1">
          📘 English Courses
        </h2>
        <p className="text-slate-400 mb-5">
          Your prescribed units, literary works, and study guides — organised by course.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {englishCourses.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 overflow-hidden transition-colors"
              style={{ borderTop: '4px solid #7B2D3B' }}
            >
              <div className="relative h-36 w-full">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-6">
                <h3 className="font-headline text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {c.name}
                </h3>
                <p className="text-slate-300 mt-2 text-sm leading-relaxed">{c.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">
                  Open course <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore — secondary tier */}
      <section aria-labelledby="explore" className="max-w-5xl mx-auto px-4 pb-14">
        <h2 id="explore" className="font-headline text-2xl font-bold text-white mb-1">
          Explore
        </h2>
        <p className="text-slate-400 mb-5">
          Beyond your coursework — level up your English, AI skills, and study craft.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.href}
                href={p.href}
                className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 p-5 transition-colors"
                style={{ borderTop: `3px solid ${p.accent}` }}
              >
                <div className="flex items-center gap-3">
                  <span className="relative h-14 w-14 flex-shrink-0 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <div className="flex items-center gap-2 min-w-0">
                    <span style={{ color: p.accent }}>
                      <Icon className="w-4 h-4 flex-shrink-0" />
                    </span>
                    <h3 className="font-headline font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {p.name}
                    </h3>
                  </div>
                </div>
                <p className="text-slate-300 mt-3 text-sm leading-relaxed">{p.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-10 text-center">
          <h2 className="font-headline text-lg font-bold text-white">
            Built by Dr. Jaffer Basha
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm leading-relaxed">
            Experienced educator in English and Business Communication (IBS
            University, PNG · Southern Cross University). This website complements
            classroom learning—it supports lectures, tutorials, and independent
            study with clear, structured, academically rigorous resources.
          </p>
        </div>
      </section>
    </div>
  );
}
