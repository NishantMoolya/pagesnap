import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;

const RENDER_SCALE = 2.0;

/**
 * Loads a PDF, calls onInit with total page count, then yields canvases.
 * @param {ArrayBuffer} arrayBuffer
 * @param {(index: number, canvas: HTMLCanvasElement) => void} onPageReady
 * @param {(pct: number, sub: string) => void} onProgress
 * @param {(total: number) => void} onInit - called once with total page count
 * @returns {Promise<number>} total page count
 */
export async function loadPdf(arrayBuffer, onPageReady, onProgress, onInit) {
  const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const total = pdfDoc.numPages;

  if (onInit) onInit(total);

  for (let i = 1; i <= total; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale: RENDER_SCALE });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;

    onPageReady(i - 1, canvas);
    onProgress(Math.round((i / total) * 100), "Page " + i + " of " + total);
  }

  return total;
}
