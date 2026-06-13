import JSZip from "jszip";

const JPEG_QUALITY = 0.92;

/**
 * Converts a canvas to a JPEG Blob.
 */
function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY);
  });
}

/**
 * Triggers a browser download of the given blob.
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/**
 * Pads a number with leading zeros.
 */
function padded(n, digits = 3) {
  return String(n).padStart(digits, "0");
}

/**
 * Exports selected pages as JPG(s), downloading as ZIP if more than one.
 * @param {Array<{ canvas: HTMLCanvasElement }>} pages - all pages
 * @param {Set<number>} selectedIndices - 0-based indices to export
 * @param {function(pct: number, sub: string): void} onProgress
 */
export async function exportPages(pages, selectedIndices, onProgress) {
  const indices = Array.from(selectedIndices).sort((a, b) => a - b);

  if (indices.length === 1) {
    const idx = indices[0];
    onProgress(50, "Generating image…");
    const blob = await canvasToBlob(pages[idx].canvas);
    onProgress(100, "Done");
    downloadBlob(blob, `page_${padded(idx + 1)}.jpg`);
    return;
  }

  // Multiple pages → zip
  const zip = new JSZip();

  for (let i = 0; i < indices.length; i++) {
    const idx = indices[i];
    const pct = Math.round((i / indices.length) * 80);
    onProgress(pct, `Converting page ${idx + 1}…`);
    const blob = await canvasToBlob(pages[idx].canvas);
    zip.file(`page_${padded(idx + 1)}.jpg`, blob);
  }

  onProgress(85, "Creating ZIP…");

  const zipBlob = await zip.generateAsync({ type: "blob" }, (meta) => {
    onProgress(85 + Math.round(meta.percent * 0.15), "Compressing…");
  });

  onProgress(100, "Done");
  downloadBlob(zipBlob, `pagesnap_export_${indices.length}.zip`);
}
