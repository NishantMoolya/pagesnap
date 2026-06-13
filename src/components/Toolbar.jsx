import { useDoc } from "../context/DocContext";
import { useExport } from "../hooks/useExport";

export default function Toolbar() {
  const { state, dispatch } = useDoc();
  const { runExport } = useExport();
  const { fileName, totalPages, selected, pages } = state;

  const readyCount = pages.filter((p) => p.ready).length;
  const selectedCount = selected.size;

  const handleSelectAll = () => dispatch({ type: "SELECT_ALL" });
  const handleClear = () => dispatch({ type: "CLEAR_SELECTION" });
  const handleReset = () => dispatch({ type: "RESET" });

  return (
    <div className="bg-[var(--surface)] border-b border-[var(--border)] px-3 sm:px-5 py-3 flex flex-wrap gap-2 items-center shrink-0">
      {/* File info */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-base shrink-0">📄</span>
        <span className="font-mono text-xs text-[var(--accent2)] truncate max-w-[140px] sm:max-w-[240px]">
          {fileName}
        </span>
      </div>

      <div className="hidden sm:block w-px h-5 bg-[var(--border)]" />

      <span className="font-mono text-xs text-[var(--muted)]">
        {readyCount}/{totalPages} pages
      </span>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-auto flex-wrap justify-end">
        <span className="text-xs text-[var(--muted)] hidden sm:inline">
          {selectedCount === 0 ? "None selected" : `${selectedCount} selected`}
        </span>

        <button
          onClick={handleSelectAll}
          className="text-xs px-3 py-1.5 rounded-md bg-[var(--surface2)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-colors"
        >
          Select all
        </button>

        {selectedCount > 0 && (
          <button
            onClick={handleClear}
            className="text-xs px-3 py-1.5 rounded-md bg-[var(--surface2)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)] transition-colors"
          >
            Clear
          </button>
        )}

        <button
          onClick={runExport}
          disabled={selectedCount === 0}
          className="text-xs px-3 py-1.5 rounded-md font-medium text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-85"
          style={{ background: "var(--accent)" }}
        >
          {selectedCount === 0
            ? "Export JPGs"
            : selectedCount === 1
            ? "Export 1 JPG"
            : `Export ${selectedCount} JPGs`}
        </button>

        <button
          onClick={handleReset}
          className="text-xs px-3 py-1.5 rounded-md bg-[var(--surface2)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--border)] transition-colors"
        >
          New file
        </button>
      </div>
    </div>
  );
}
