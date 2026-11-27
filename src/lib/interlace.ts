export type InterlaceOrder = "rightToLeft" | "leftToRight";

export type InterlaceOptions = {
  files: File[];
  order: InterlaceOrder;
  /** Crop window in percent 0–100 */
  crop: {
    wStart: number;
    wEnd: number;
    hStart: number;
    hEnd: number;
  };
  /** Print size in inches — used for aspect / pixel budget */
  widthIn: number;
  heightIn: number;
  /** Preview DPI (capped for performance) */
  dpi?: number;
};

function clampPct(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`无法读取图片：${file.name}`));
    };
    img.src = url;
  });
}

function drawCropped(
  img: HTMLImageElement,
  crop: InterlaceOptions["crop"],
  outW: number,
  outH: number,
): ImageData {
  const sx0 = (clampPct(crop.wStart) / 100) * img.naturalWidth;
  const sx1 = (clampPct(crop.wEnd) / 100) * img.naturalWidth;
  const sy0 = (clampPct(crop.hStart) / 100) * img.naturalHeight;
  const sy1 = (clampPct(crop.hEnd) / 100) * img.naturalHeight;
  const sw = Math.max(1, sx1 - sx0);
  const sh = Math.max(1, sy1 - sy0);

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas 不可用");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, sx0, sy0, sw, sh, 0, 0, outW, outH);
  return ctx.getImageData(0, 0, outW, outH);
}

/**
 * Column-wise lenticular interlacing for browser preview.
 * View i contributes every N-th column (order controls which view is first).
 */
export async function interlaceImages(
  options: InterlaceOptions,
): Promise<{ blob: Blob; width: number; height: number; views: number }> {
  const { files, order, crop } = options;
  if (files.length < 2) throw new Error("请至少上传两张图片");

  const widthIn = Math.max(0.5, options.widthIn || 6);
  const heightIn = Math.max(0.5, options.heightIn || 8);
  const dpi = Math.min(180, Math.max(72, options.dpi ?? 120));

  let outW = Math.round(widthIn * dpi);
  let outH = Math.round(heightIn * dpi);
  const maxSide = 1800;
  const scale = Math.min(1, maxSide / Math.max(outW, outH));
  outW = Math.max(2, Math.round(outW * scale));
  outH = Math.max(2, Math.round(outH * scale));

  // Ensure width divisible by view count so strips align cleanly
  const n = files.length;
  outW = Math.max(n, outW - (outW % n));

  const images = await Promise.all(files.map(loadImage));
  const frames = images.map((img) => drawCropped(img, crop, outW, outH));

  const out = new ImageData(outW, outH);
  const dst = out.data;

  for (let col = 0; col < outW; col++) {
    const slot = col % n;
    const viewIndex =
      order === "rightToLeft" ? n - 1 - slot : slot;
    const src = frames[viewIndex].data;
    for (let y = 0; y < outH; y++) {
      const i = (y * outW + col) * 4;
      dst[i] = src[i];
      dst[i + 1] = src[i + 1];
      dst[i + 2] = src[i + 2];
      dst[i + 3] = src[i + 3];
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 不可用");
  ctx.putImageData(out, 0, 0);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("导出失败"))),
      "image/png",
    );
  });

  return { blob, width: outW, height: outH, views: n };
}
