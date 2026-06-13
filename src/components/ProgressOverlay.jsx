import { useDoc } from "../context/DocContext";

export default function ProgressOverlay() {
  const { state } = useDoc();
  const { progress } = state;

  if (!progress) return null;

  const { title, sub, pct } = progress;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}>
      <div
        className="rounded-2xl border border-[var(--border)] p-8 w-full max-w-sm text-center"
        style={{ background: "var(--surface)" }}
      >
        <p className="font-semibold text-base text-[var(--text)] mb-1">{title}</p>
        <p className="text-sm text-[var(--muted)] mb-5 min-h-[1.25rem]">{sub}</p>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden mb-3"
             style={{ background: "var(--surface2)" }}>
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${Math.min(100, Math.max(0, pct))}%`,
              background: "linear-gradient(90deg, var(--accent), var(--accent2))",
            }}
          />
        </div>

        <span className="font-mono text-xs text-[var(--muted)]">
          {Math.round(pct)}%
        </span>
      </div>
    </div>
  );
}
