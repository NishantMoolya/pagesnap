import { useCallback } from "react";
import { useDoc } from "../context/DocContext";
import { exportPages } from "../utils/exporter";

export function useExport() {
  const { state, dispatch, showToast, hideProgress } = useDoc();

  const runExport = useCallback(async () => {
    const { pages, selected } = state;
    if (selected.size === 0) return;

    dispatch({
      type: "SET_PROGRESS",
      progress: { title: "Exporting…", sub: "Preparing images", pct: 0 },
    });

    try {
      await exportPages(pages, selected, (pct, sub) => {
        dispatch({ type: "SET_PROGRESS", progress: { title: "Exporting…", sub, pct } });
      });

      hideProgress();
      const n = selected.size;
      showToast(
        n === 1
          ? "✓ Image downloaded"
          : `✓ ${n} images downloaded as ZIP`
      );
    } catch (err) {
      hideProgress();
      showToast("Export failed. Please try again.", "error");
      console.error(err);
    }
  }, [state, dispatch, showToast, hideProgress]);

  return { runExport };
}
