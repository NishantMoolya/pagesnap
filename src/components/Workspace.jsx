import Toolbar from "./Toolbar";
import PageGrid from "./PageGrid";

export default function Workspace() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Toolbar />
      <PageGrid />
    </div>
  );
}
