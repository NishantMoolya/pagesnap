import { useEffect, useState } from "react";
import { useDoc } from "../context/DocContext";

export default function Toast() {
  const { state } = useDoc();
  const { toast } = state;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      // Tiny delay to trigger CSS transition
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [toast]);

  if (!toast) return null;

  const borderColor =
    toast.type === "success"
      ? "var(--success)"
      : toast.type === "error"
      ? "var(--danger)"
      : "var(--border)";

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-250 text-sm px-4 py-3 rounded-xl border whitespace-nowrap"
      style={{
        background: "var(--surface)",
        borderColor,
        transform: `translateX(-50%) translateY(${visible ? "0" : "72px"})`,
        opacity: visible ? 1 : 0,
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {toast.msg}
    </div>
  );
}
