import { DocProvider, useDoc } from "./context/DocContext";
import Header from "./components/Header";
import DropZone from "./components/DropZone";
import Workspace from "./components/Workspace";
import ProgressOverlay from "./components/ProgressOverlay";
import Toast from "./components/Toast";

function AppInner() {
  const { state } = useDoc();
  const hasFile = !!state.fileName;

  return (
    <div className="flex flex-col h-full" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="flex flex-col flex-1 min-h-0">
        {hasFile ? <Workspace /> : <DropZone />}
      </main>
      <footer className="px-4 py-3 border-t border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--muted)]">
        <p>
          Open source project — contribute or view the source on{' '}
          <a
            className="text-[var(--primary)] underline"
            href="https://github.com/NishantMoolya/pagesnap"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </footer>
      <ProgressOverlay />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <DocProvider>
      <AppInner />
    </DocProvider>
  );
}

