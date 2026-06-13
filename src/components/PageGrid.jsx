import { useDoc } from "../context/DocContext";
import PageCard from "./PageCard";

export default function PageGrid() {
  const { state } = useDoc();
  const { pages } = state;

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-5">
      <div
        className="grid gap-3 sm:gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        }}
      >
        {pages.map((_, index) => (
          <PageCard key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
