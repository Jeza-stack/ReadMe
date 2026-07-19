'use client';

import { Brain, Lightbulb, Target, BookOpen, Puzzle, User, Settings } from 'lucide-react';

// Six satellite concepts orbiting the brain, matching the reference composition:
// Ideas (top), Goals (upper-left), Learning (upper-right), Problems (lower-left),
// Yourself (bottom), Creativity (lower-right). Colours are intentionally vivid and
// theme-agnostic — the graphic reads on both the light and dark page background.
type Node = {
  key: string;
  label: string;
  Icon: typeof Brain;
  color: string;
  // position of the node centre, as % of the square container
  x: number;
  y: number;
  // matching endpoint in the 0..400 SVG viewBox, plus a quadratic control point
  ex: number;
  ey: number;
  cx: number;
  cy: number;
};

const NODES: Node[] = [
  { key: 'ideas', label: 'Ideas', Icon: Lightbulb, color: '#F5B301', x: 50, y: 10, ex: 200, ey: 42, cx: 172, cy: 118 },
  { key: 'goals', label: 'Goals', Icon: Target, color: '#22C55E', x: 17, y: 30, ex: 70, ey: 122, cx: 120, cy: 152 },
  { key: 'learning', label: 'Learning', Icon: BookOpen, color: '#EC4899', x: 83, y: 30, ex: 330, ey: 122, cx: 280, cy: 152 },
  { key: 'problems', label: 'Problems', Icon: Puzzle, color: '#3B82F6', x: 17, y: 70, ex: 70, ey: 278, cx: 120, cy: 248 },
  { key: 'creativity', label: 'Creativity', Icon: Settings, color: '#A855F7', x: 83, y: 70, ex: 330, ey: 278, cx: 280, cy: 248 },
  { key: 'yourself', label: 'Yourself', Icon: User, color: '#FB923C', x: 50, y: 90, ex: 200, ey: 358, cx: 228, cy: 282 },
];

export function MindMapHeroGraphic() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]" aria-hidden="true">
      {/* Connector + glow layer */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#3B82F6" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="160" fill="url(#brainGlow)" />

        {NODES.map((n) => {
          const d = `M200,200 Q${n.cx},${n.cy} ${n.ex},${n.ey}`;
          return (
            <g key={n.key}>
              {/* soft outer glow */}
              <path d={d} fill="none" stroke={n.color} strokeOpacity="0.25" strokeWidth="7" strokeLinecap="round" />
              {/* bright core */}
              <path d={d} fill="none" stroke={n.color} strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
              <circle cx={n.ex} cy={n.ey} r="3.5" fill={n.color} />
            </g>
          );
        })}
      </svg>

      {/* Central brain hub */}
      <div className="absolute left-1/2 top-1/2 flex h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <Brain
          className="h-full w-full text-cyan-400"
          strokeWidth={1.25}
          style={{ filter: 'drop-shadow(0 0 14px rgba(34,211,238,0.55))' }}
        />
      </div>

      {/* Concept nodes */}
      {NODES.map((n) => {
        const { Icon } = n;
        return (
          <div
            key={n.key}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 sm:h-16 sm:w-16"
              style={{
                borderColor: n.color,
                backgroundColor: `${n.color}1f`,
                boxShadow: `0 0 18px ${n.color}66`,
              }}
            >
              <Icon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: n.color }} strokeWidth={1.75} />
            </div>
            <span
              className="text-[10px] font-bold uppercase tracking-wider sm:text-xs"
              style={{ color: n.color }}
            >
              {n.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
