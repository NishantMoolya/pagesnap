import { useRef, useState } from "react";
import { useFileLoader } from "../hooks/useFileLoader";

export default function DropZone() {
  const { loadFile } = useFileLoader();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files) => {
    if (files?.[0]) loadFile(files[0]);
  };

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          "w-full max-w-lg rounded-2xl border-2 border-dashed transition-all duration-200",
          "flex flex-col items-center justify-center text-center cursor-pointer",
          "px-6 py-12 sm:py-16 sm:px-12",
          isDragging
            ? "border-[var(--accent)] bg-[rgba(124,106,247,0.07)]"
            : "border-[var(--border)] hover:border-[var(--muted)] bg-transparent",
        ].join(" ")}
      >
        <div className="text-5xl mb-4 select-none">🗂️</div>
        <p className="text-lg font-semibold text-[var(--text)] mb-2">
          Drop your document here
        </p>
        <p className="text-sm text-[var(--muted)] mb-6 leading-relaxed">
          Supports <strong className="text-[var(--text)]">PDF</strong> files.
          <br className="hidden sm:block" />
          Select pages and export them as JPG images.
        </p>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
          className="px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-85"
          style={{ background: "var(--accent)" }}
        >
          Browse file
        </button>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,application/pdf"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
