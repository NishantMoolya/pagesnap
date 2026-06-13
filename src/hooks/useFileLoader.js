import { useCallback } from "react";
import { useDoc } from "../context/DocContext";
import { loadPdf } from "../utils/pdfLoader";
import { loadDocx } from "../utils/docxLoader";

export function useFileLoader() {
  const { dispatch, showToast, hideProgress } = useDoc();

  const loadFile = useCallback(
    async (file) => {
      const name = file.name.toLowerCase();
      let fileType;

      if (name.endsWith(".pdf")) {
        fileType = "pdf";
      } else if (name.endsWith(".docx")) {
        fileType = "docx";
      } else {
        showToast("Please upload a PDF or DOCX file.", "error");
        return;
      }

      dispatch({ type: "SET_FILE_META", fileName: file.name, fileType });
      dispatch({
        type: "SET_PROGRESS",
        progress: { title: "Loading file…", sub: "Reading", pct: 0 },
      });

      const arrayBuffer = await file.arrayBuffer();

      const onProgress = (pct, sub) => {
        dispatch({
          type: "SET_PROGRESS",
          progress: { title: "Rendering pages…", sub, pct },
        });
      };

      const onPageReady = (index, canvas) => {
        const thumbUrl = canvas.toDataURL("image/jpeg", 0.75);
        dispatch({ type: "SET_PAGE_READY", index, canvas, thumbUrl });
      };

      const onInit = (count) => {
        dispatch({ type: "INIT_PAGES", count });
      };

      try {
        const loader = fileType === "pdf" ? loadPdf : loadDocx;
        const total = await loader(arrayBuffer, onPageReady, onProgress, onInit);
        hideProgress();
        showToast(`Loaded ${total} page${total !== 1 ? "s" : ""}`);
      } catch (err) {
        hideProgress();
        showToast("Failed to load file. Is it a valid PDF or DOCX?", "error");
        console.error(err);
      }
    },
    [dispatch, showToast, hideProgress]
  );

  return { loadFile };
}
