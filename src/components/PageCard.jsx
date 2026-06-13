import { useDoc } from "../context/DocContext";

function LoadingPlaceholder() {
  return (
    <div className="w-full aspect-[3/4] flex flex-col items-center justify-center gap-2 bg-[var(--surface2)]">
      <div
        className="spinner w-5 h-5 rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]"
      />
      <span className="text-[10px] text-[var(--muted)] font-mono">Rendering…</span>
    </div>
  );
}

export default function PageCard({ index }) {
  const { state, dispatch } = useDoc();
  const page = state.pages[index];
  const isSelected = state.selected.has(index);

  const toggle = () => {
    if (page?.ready) {
      dispatch({ type: "TOGGLE_PAGE", index });
    }
  };

  return (
    <div
      onClick={toggle}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => e.key === " " && toggle()}
      className={[
        "rounded-lg overflow-hidden cursor-pointer select-none",
        "border-2 transition-all duration-150 relative",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
        isSelected
          ? "border-[var(--accent)] shadow-[0_0_0_1px_var(--accent)]"
          : "border-[var(--border)] hover:border-[var(--muted)] hover:-translate-y-0.5",
        !page?.ready && "pointer-events-none opacity-60",
      ].join(" ")}
      style={{ background: "var(--surface)" }}
    >
      {/* Thumbnail */}
      {page?.ready ? (
        <img
          src={page.thumbUrl}
          alt={`Page ${index + 1}`}
          className="w-full aspect-[3/4] object-cover block"
          loading="lazy"
        />
      ) : (
        <LoadingPlaceholder />
      )}

      {/* Label bar */}
      <div className="flex items-center justify-between px-2 py-1.5">
        <span
          className={[
            "text-[11px] font-mono",
            isSelected ? "text-[var(--accent2)]" : "text-[var(--muted)]",
          ].join(" ")}
        >
          pg. {index + 1}
        </span>
        {isSelected && (
          <span className="text-[10px] text-[var(--accent)] font-semibold">✓</span>
        )}
      </div>

      {/* Selection overlay badge */}
      {isSelected && (
        <div
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: "var(--accent)" }}
        >
          ✓
        </div>
      )}
    </div>
  );
}
