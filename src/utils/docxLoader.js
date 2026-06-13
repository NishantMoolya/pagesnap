import { renderAsync } from "docx-preview";
import html2canvas from "html2canvas";

/**
 * Renders a DOCX file using docx-preview into a hidden container,
 * then screenshots each page section with html2canvas.
 * This reuses the same canvas pipeline as the PDF workflow.
 *
 * @param {ArrayBuffer} arrayBuffer
 * @param {(index: number, canvas: HTMLCanvasElement) => void} onPageReady
 * @param {(pct: number, sub: string) => void} onProgress
 * @param {(total: number) => void} onInit
 * @returns {Promise<number>} total page count
 */
export async function loadDocx(arrayBuffer, onPageReady, onProgress, onInit) {
  onProgress(5, "Rendering DOCX…");

  // Hidden host container
  const host = document.createElement("div");
  host.style.cssText = [
    "position:fixed",
    "left:-99999px",
    "top:0",
    "width:794px",         // A4 at 96dpi
    "background:#fff",
    "z-index:-1",
    "visibility:hidden",
  ].join(";");
  document.body.appendChild(host);

  try {
    // Render the whole DOCX into the host div
    await renderAsync(arrayBuffer, host, null, {
      className: "docx",
      inWrapper: true,
      ignoreWidth: false,
      ignoreHeight: false,
      ignoreFonts: false,
      breakPages: true,
      ignoreLastRenderedPageBreak: false,
      experimental: false,
      trimXmlDeclaration: true,
      useBase64URL: true,
      renderChanges: false,
      renderHeaders: true,
      renderFooters: true,
      renderFootnotes: true,
      renderEndnotes: true,
    });

    onProgress(30, "Detecting pages…");

    // docx-preview renders each page as a <section> inside .docx-wrapper
    const sections = host.querySelectorAll(".docx-wrapper section");
    const total = sections.length || 1;

    if (onInit) onInit(total);
    onProgress(35, `Found ${total} page${total !== 1 ? "s" : ""}`);

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      // Temporarily make the section visible for html2canvas
      section.style.visibility = "visible";

      const canvas = await html2canvas(section, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: section.offsetWidth || 794,
        height: section.offsetHeight,
        windowWidth: 794,
      });

      section.style.visibility = "";

      onPageReady(i, canvas);
      onProgress(
        35 + Math.round(((i + 1) / total) * 65),
        `Page ${i + 1} of ${total}`
      );
    }

    return total;
  } finally {
    host.remove();
  }
}
