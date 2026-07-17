import { PERSONALITY_MAP } from '@/data/mindMapping';

/**
 * A mind map drawn the way a real mind-mapping application draws one: thick colour-coded
 * branches curving out of a dark centre node into solid branch pills, with keyword pills
 * hanging off each. Styled after the reference poster (public/mind-map-summary.png).
 *
 * Inline SVG — no dependency, no image asset, scales to any width and reads correctly on
 * the dark theme.
 *
 * stage 1 = centre only · 2 = + branch pills · 3 = + keywords · 4 = + cross-link
 */
export type MapStage = 1 | 2 | 3 | 4;

const CX = 500;
const CY = 300;
const R = 54;

type Side = 'left' | 'right';

/** Geometry per branch, matching the reference layout: two branches each side. */
const GEOMETRY: {
  side: Side;
  bx: number; // branch pill centre x
  by: number; // branch pill centre y
  keyX: number; // keyword pill centre x
  keyTop: number; // first keyword centre y
}[] = [
  { side: 'right', bx: 700, by: 176, keyX: 895, keyTop: 120 }, // Strengths
  { side: 'left', bx: 300, by: 424, keyX: 105, keyTop: 392 }, // Weaknesses
  { side: 'right', bx: 700, by: 424, keyX: 895, keyTop: 392 }, // Values
  { side: 'left', bx: 300, by: 176, keyX: 105, keyTop: 120 }, // Goals
];

/** Solid branch colour, then the soft tint used behind its keyword pills. */
const PALETTE = [
  { solid: '#16a34a', tint: 'rgba(22,163,74,0.16)', text: '#4ade80' }, // Strengths — green
  { solid: '#ef4444', tint: 'rgba(239,68,68,0.16)', text: '#fca5a5' }, // Weaknesses — red
  { solid: '#2563eb', tint: 'rgba(37,99,235,0.18)', text: '#93c5fd' }, // Values — blue
  { solid: '#f59e0b', tint: 'rgba(245,158,11,0.16)', text: '#fcd34d' }, // Goals — amber
];

const PILL_W = 168;
const PILL_H = 34;
const KEY_GAP = 42;

export function MindMapSvg({ stage = 4, className }: { stage?: MapStage; className?: string }) {
  const showBranches = stage >= 2;
  const showKeywords = stage >= 3;
  const showCrossLink = stage >= 4;

  const branches = PERSONALITY_MAP.branches;

  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-labelledby="mindmap-title mindmap-desc"
    >
      <title id="mindmap-title">A personality mind map</title>
      <desc id="mindmap-desc">
        {showBranches
          ? `A central node labelled ME with four branches: ${branches
              .map((b) => b.name)
              .join(', ')}.${
              showKeywords
                ? ' ' + branches.map((b) => `${b.name}: ${b.items.join(', ')}.`).join(' ')
                : ''
            }${showCrossLink ? ` A dashed link connects ${PERSONALITY_MAP.crossLink}.` : ''}`
          : 'A single central node labelled ME, ready for branches.'}
      </desc>

      {showBranches &&
        branches.map((branch, i) => {
          const g = GEOMETRY[i];
          const c = PALETTE[i];
          const right = g.side === 'right';
          // Where the trunk leaves the centre circle, and where it meets the branch pill.
          const startX = CX + (right ? R - 6 : -R + 6);
          const endX = g.bx + (right ? -PILL_W / 2 : PILL_W / 2);

          return (
            <g key={branch.name}>
              {/* Trunk: a thick curve out of the centre, the way real apps draw them. */}
              <path
                d={`M ${startX} ${CY} C ${startX + (right ? 90 : -90)} ${CY} ${
                  endX - (right ? 90 : -90)
                } ${g.by} ${endX} ${g.by}`}
                stroke={c.solid}
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
              />

              {/* Branch pill */}
              <rect
                x={g.bx - PILL_W / 2}
                y={g.by - PILL_H / 2 - 4}
                width={PILL_W}
                height={PILL_H + 8}
                rx={(PILL_H + 8) / 2}
                fill={c.solid}
              />
              <text
                x={g.bx}
                y={g.by + 6}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="19"
                fontWeight="700"
              >
                {branch.name}
              </text>

              {showKeywords &&
                branch.items.map((item, k) => {
                  const ky = g.keyTop + k * KEY_GAP;
                  const twigStart = g.bx + (right ? PILL_W / 2 : -PILL_W / 2);
                  const twigEnd = g.keyX + (right ? -78 : 78);
                  return (
                    <g key={item}>
                      {/* Twig from the branch pill out to the keyword */}
                      <path
                        d={`M ${twigStart} ${g.by} C ${twigStart + (right ? 46 : -46)} ${g.by} ${
                          twigEnd - (right ? 46 : -46)
                        } ${ky} ${twigEnd} ${ky}`}
                        stroke={c.solid}
                        strokeWidth="2.5"
                        fill="none"
                        opacity={0.85}
                      />
                      {/* Keyword pill — tinted, not solid, so the branch stays dominant */}
                      <rect
                        x={g.keyX - 78}
                        y={ky - 15}
                        width={156}
                        height={30}
                        rx={15}
                        fill={c.tint}
                        stroke={c.solid}
                        strokeOpacity={0.45}
                        strokeWidth="1"
                      />
                      <text
                        x={g.keyX}
                        y={ky + 5}
                        textAnchor="middle"
                        fill={c.text}
                        fontSize="14"
                        fontWeight="500"
                      >
                        {item}
                      </text>
                    </g>
                  );
                })}
            </g>
          );
        })}

      {/* Cross-link: the insight line — a strength pointed at a goal. Dashed by convention. */}
      {showCrossLink && (
        <g>
          <path
            d={`M ${GEOMETRY[0].bx - 40} ${GEOMETRY[0].by + 26} C ${GEOMETRY[0].bx - 90} ${
              CY - 30
            } ${GEOMETRY[3].bx + 90} ${CY - 30} ${GEOMETRY[3].bx + 40} ${GEOMETRY[3].by + 26}`}
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="7 7"
            fill="none"
            opacity={0.4}
          />
          <text x={CX} y={CY - 76} textAnchor="middle" fill="currentColor" fontSize="12" opacity={0.55}>
            supports
          </text>
        </g>
      )}

      {/* Centre last so the trunks tuck underneath it */}
      <circle cx={CX} cy={CY} r={R} fill="#0b1b3a" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      <circle cx={CX} cy={CY - 13} r="9" fill="#ffffff" opacity={0.92} />
      <path
        d={`M ${CX - 17} ${CY + 12} a 17 15 0 0 1 34 0 z`}
        fill="#ffffff"
        opacity={0.92}
      />
      <text x={CX} y={CY + 40} textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700" letterSpacing="1">
        {PERSONALITY_MAP.centre}
      </text>
    </svg>
  );
}
