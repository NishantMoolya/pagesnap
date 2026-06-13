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
