export default function Header() {
  return (
    <header className="flex items-center gap-3 px-4 sm:px-8 py-4 border-b border-[var(--border)] bg-[var(--surface)] shrink-0">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0"
           style={{ background: "linear-gradient(135deg, var(--accent), var(--accent2))" }}>
        📄
      </div>
      <span className="font-semibold text-base tracking-tight text-[var(--text)]">PageSnap</span>
      <span className="hidden sm:block text-xs font-mono text-[var(--muted)] ml-auto">
        PDF → JPG
      </span>
    </header>
  );
}
