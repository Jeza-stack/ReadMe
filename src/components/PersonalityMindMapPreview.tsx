import { cn } from '@/lib/utils';
import { PERSONALITY_MAP } from '@/data/mindMapping';

/**
 * A teaching component, not decoration: it shows the *structure* of a personality mind map.
 *
 * Pure HTML + CSS — no SVG, no canvas, no image assets. Used twice: the hero renders the
 * finished map (stage 4), and the Build-Along section renders stages 1→4 to show the same
 * map being constructed. Carries no hero-specific styling for exactly that reason.
 *
 * stage 1 = centre only · 2 = centre + empty branches · 3 = + keywords · 4 = + cross-link
 */
export type MapStage = 1 | 2 | 3 | 4;

export function PersonalityMindMapPreview({
  stage = 4,
  className,
}: {
  stage?: MapStage;
  className?: string;
}) {
  const showBranches = stage >= 2;
  const showKeywords = stage >= 3;
  const showCrossLink = stage >= 4;

  return (
    <div className={cn('w-full', className)}>
      {/* Centre — the anchor everything hangs from */}
      <div className="flex justify-center">
        <span className="inline-flex items-center justify-center rounded-full border-2 border-[var(--ce-golden-yellow)] bg-[var(--ce-golden-yellow)]/10 px-8 py-4 font-headline text-2xl font-bold tracking-wide text-[var(--ce-golden-yellow)]">
          {PERSONALITY_MAP.centre}
        </span>
      </div>

      {showBranches && (
        <>
          {/* Connector from centre down into the branch grid */}
          <div className="flex justify-center" aria-hidden="true">
            <div className="h-6 w-px bg-white/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {PERSONALITY_MAP.branches.map((branch) => (
              <div
                key={branch.name}
                className={cn('rounded-lg border bg-white/5 p-4', branch.borderClass)}
              >
                <div className="flex items-center gap-2">
                  <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', branch.dotClass)} aria-hidden="true" />
                  <h4 className={cn('text-sm font-bold uppercase tracking-wider', branch.colorClass)}>
                    {branch.name}
                  </h4>
                </div>

                {showKeywords ? (
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {branch.items.map((item) => (
                      <li key={item} className="text-sm text-foreground/75">
                        — {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  // Stage 2: the skeleton exists but carries no detail yet.
                  <div className="mt-3 flex flex-col gap-2" aria-hidden="true">
                    <div className="h-2 w-2/3 rounded bg-white/10" />
                    <div className="h-2 w-1/2 rounded bg-white/10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {showCrossLink && (
        <div className="mt-4 rounded-lg border border-dashed border-white/25 px-4 py-3 text-center">
          <span className="text-sm font-medium text-foreground/70">{PERSONALITY_MAP.crossLink}</span>
        </div>
      )}
    </div>
  );
}
