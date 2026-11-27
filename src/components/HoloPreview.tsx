"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type HoloPreviewProps = {
  alt?: string;
  fallbackSrc?: string;
  videoSrc?: string;
  spriteSheetSrc?: string;
  frameCount?: number;
  spriteColumns?: number;
  spriteRows?: number;
  fps?: number;
  hint?: string;
  className?: string;
};

function canPlayWebmVp9() {
  if (typeof document === "undefined") return false;
  const ok = !!document
    .createElement("video")
    .canPlayType('video/webm; codecs="vp9"');
  if (!ok) return false;
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isSafari =
    /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|FxiOS/i.test(ua);
  return !(isIOS || isSafari);
}

export default function HoloPreview({
  alt = "Hologram simulation preview",
  fallbackSrc = "/images/home-preview/preview_1-fallback.webp",
  videoSrc = "/images/home-preview/preview-sequence.webm",
  spriteSheetSrc = "/images/home-preview/sprite-sheet.webp",
  frameCount = 60,
  spriteColumns = 10,
  spriteRows = 6,
  fps = 25,
  hint = "左右倾斜设备或移动鼠标预览",
  className = "aspect-[2/1] w-full max-w-[48rem]",
}: HoloPreviewProps) {
  const [frame, setFrame] = useState(0);
  const [sheet, setSheet] = useState<ImageBitmap | null>(null);
  const [spriteArmed, setSpriteArmed] = useState(false);
  const [videoArmed, setVideoArmed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const sheetRef = useRef<ImageBitmap | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const targetTilt = useRef({ rotateX: 0, rotateY: -15 });
  const currentTilt = useRef({ rotateX: 0, rotateY: -15 });
  const rafTilt = useRef<number | null>(null);
  const spriteStarted = useRef(false);
  const videoStarted = useRef(false);

  const [preferVideo] = useState(() => canPlayWebmVp9() && !!videoSrc);
  const useSprite = !!spriteSheetSrc && frameCount >= 2 && !preferVideo;
  const showCanvas =
    frameCount >= 2 &&
    spriteColumns >= 1 &&
    spriteRows >= 1 &&
    sheet !== null;

  const armSprite = useCallback(() => {
    if (!useSprite || frameCount < 2 || spriteStarted.current) return;
    spriteStarted.current = true;
    setSpriteArmed(true);
  }, [frameCount, useSprite]);

  const armVideo = useCallback(() => {
    if (!preferVideo || !videoSrc || frameCount < 2 || videoStarted.current) {
      return;
    }
    videoStarted.current = true;
    setVideoArmed(true);
  }, [frameCount, preferVideo, videoSrc]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const bitmap = sheetRef.current;
    if (!canvas || !bitmap) return;
    const parent = canvas.parentElement;
    const height = parent?.clientHeight ?? canvas.clientHeight;
    if (!height) return;

    const cellW = bitmap.width / spriteColumns;
    const cellH = bitmap.height / spriteRows;
    const width = Math.round((height / cellH) * cellW);
    const dpr = window.devicePixelRatio || 1;
    const bufW = Math.round(width * dpr);
    const bufH = Math.round(height * dpr);

    if (canvas.width !== bufW || canvas.height !== bufH) {
      canvas.width = bufW;
      canvas.height = bufH;
    }
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.left = "50%";
    canvas.style.top = "0";
    canvas.style.transform = "translateX(-50%)";

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const idx = Math.min(frameRef.current, frameCount - 1);
    const col = idx % spriteColumns;
    const row = Math.floor(idx / spriteColumns);
    ctx.drawImage(
      bitmap,
      col * cellW,
      row * cellH,
      cellW,
      cellH,
      0,
      0,
      width,
      height,
    );
  }, [frameCount, spriteColumns, spriteRows]);

  const tickTilt = () => {
    const el = stageRef.current;
    if (!el) return;
    const cur = currentTilt.current;
    const tgt = targetTilt.current;
    cur.rotateX += (tgt.rotateX - cur.rotateX) * 0.18;
    cur.rotateY += (tgt.rotateY - cur.rotateY) * 0.18;
    el.style.transform = `rotateX(${cur.rotateX.toFixed(2)}deg) rotateY(${cur.rotateY.toFixed(2)}deg)`;
    if (
      Math.abs(tgt.rotateX - cur.rotateX) < 0.05 &&
      Math.abs(tgt.rotateY - cur.rotateY) < 0.05
    ) {
      rafTilt.current = null;
      return;
    }
    rafTilt.current = window.requestAnimationFrame(tickTilt);
  };

  const setTilt = (rotateX: number, rotateY: number) => {
    targetTilt.current = { rotateX, rotateY };
    if (rafTilt.current === null) {
      rafTilt.current = window.requestAnimationFrame(tickTilt);
    }
  };

  const applyPointer = (clientX: number, clientY: number, rect: DOMRect) => {
    const nx = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const ny = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    setTilt((0.5 - ny) * 8, (nx - 0.5) * 60);
    const next = Math.max(0, frameCount - 1 - Math.floor(nx * frameCount));
    setFrame((prev) => (prev === next ? prev : next));
  };

  // Prefetch sprite after first interaction / load
  useEffect(() => {
    if (!useSprite || frameCount < 2) return;
    let timer: number | null = null;
    const kick = () => {
      timer = window.setTimeout(() => armSprite(), 0);
    };
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });
    return () => {
      window.removeEventListener("load", kick);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, [armSprite, frameCount, useSprite]);

  useEffect(() => {
    if (!spriteArmed || !spriteSheetSrc || frameCount < 2) return;
    let alive = true;
    let bitmap: ImageBitmap | null = null;
    (async () => {
      try {
        const res = await fetch(spriteSheetSrc, { cache: "force-cache" });
        if (!res.ok) throw new Error(`Failed to load ${spriteSheetSrc}`);
        const blob = await res.blob();
        bitmap = await createImageBitmap(blob);
        if (!alive) {
          bitmap.close();
          return;
        }
        setSheet((prev) => {
          prev?.close();
          return bitmap;
        });
        setFrame(0);
      } catch {
        bitmap?.close();
        if (alive) {
          setSheet((prev) => {
            prev?.close();
            return null;
          });
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [frameCount, spriteArmed, spriteSheetSrc]);

  // Optional: build sprite from webm frames when video preferred
  useEffect(() => {
    if (!preferVideo || !videoSrc || frameCount < 2 || !videoArmed) return;
    let cancelled = false;
    (async () => {
      const video = videoRef.current;
      if (!video) return;
      if (!video.getAttribute("src")) {
        video.src = videoSrc;
        video.load();
        return;
      }
      if (video.videoWidth === 0 || video.videoHeight === 0) return;

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const canvas = document.createElement("canvas");
      canvas.width = vw * spriteColumns;
      canvas.height = vh * spriteRows;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const seek = (t: number) =>
        new Promise<void>((resolve) => {
          const onSeeked = () => {
            video.removeEventListener("seeked", onSeeked);
            resolve();
          };
          video.addEventListener("seeked", onSeeked);
          video.currentTime = t;
        });

      try {
        for (let i = 0; i < frameCount; i += 1) {
          if (cancelled) return;
          const t = (i + 0.5) / fps;
          if (Math.abs(video.currentTime - t) > 0.001 || i === 0) {
            await seek(t);
          }
          if (cancelled) return;
          ctx.drawImage(
            video,
            (i % spriteColumns) * vw,
            Math.floor(i / spriteColumns) * vh,
          );
        }
        const bitmap = await createImageBitmap(canvas);
        if (cancelled) {
          bitmap.close();
          return;
        }
        setSheet((prev) => {
          prev?.close();
          return bitmap;
        });
        setFrame(0);
        video.removeAttribute("src");
        video.load();
      } catch {
        // keep fallback image
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [
    frameCount,
    fps,
    preferVideo,
    spriteColumns,
    spriteRows,
    videoArmed,
    videoReady,
    videoSrc,
  ]);

  useEffect(() => {
    if (videoArmed || videoStarted.current || !preferVideo || frameCount < 2) {
      return;
    }
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            armVideo();
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armVideo, frameCount, preferVideo, videoArmed]);

  useEffect(() => {
    sheetRef.current = sheet;
    frameRef.current = frame;
    if (showCanvas) drawFrame();
  }, [drawFrame, frame, sheet, showCanvas]);

  useEffect(() => () => sheet?.close(), [sheet]);

  useEffect(
    () => () => {
      if (rafTilt.current !== null) {
        window.cancelAnimationFrame(rafTilt.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!showCanvas) return;
    const onResize = () => drawFrame();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame, showCanvas, sheet]);

  useEffect(() => {
    const el = stageRef.current?.parentElement;
    if (!el) return;
    const update = () => {
      rectRef.current = el.getBoundingClientRect();
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("scroll", update, true);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update, true);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative aspect-[5/4] [perspective:1400px] md:aspect-[16/11] ${className}`}
      onMouseEnter={(e) => {
        if (useSprite) armSprite();
        armVideo();
        rectRef.current = e.currentTarget.getBoundingClientRect();
      }}
      onMouseMove={(e) => {
        const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
        rectRef.current = rect;
        applyPointer(e.clientX, e.clientY, rect);
      }}
      onTouchStart={(e) => {
        if (useSprite) armSprite();
        armVideo();
        const t = e.touches[0];
        if (!t) return;
        const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
        rectRef.current = rect;
        applyPointer(t.clientX, t.clientY, rect);
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (!t) return;
        const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
        rectRef.current = rect;
        applyPointer(t.clientX, t.clientY, rect);
      }}
      onFocus={() => {
        if (useSprite) armSprite();
        armVideo();
      }}
    >
      <div
        ref={stageRef}
        className="relative h-full overflow-visible transition-transform duration-150 ease-out will-change-transform"
        style={{ transform: "rotateX(0deg) rotateY(-15deg)" }}
      >
        {showCanvas ? (
          <canvas ref={canvasRef} className="absolute block" aria-label={alt} />
        ) : (
          <Image
            src={fallbackSrc}
            alt={alt}
            fill
            className="object-contain object-center"
            sizes="(min-width: 1280px) 480px, (min-width: 768px) 420px, calc(100vw - 2rem)"
            quality={55}
            draggable={false}
          />
        )}
        {videoSrc ? (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-px w-px -translate-x-1/2 opacity-0"
            onLoadedData={() => setVideoReady(true)}
          />
        ) : null}
        {hint ? (
          <div className="absolute -bottom-3 left-1/2 flex w-max max-w-[min(85vw,280px)] -translate-x-1/2 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/80 px-4 py-2 text-center text-[11px] font-mono uppercase tracking-[0.2em] text-white">
            {hint}
          </div>
        ) : null}
      </div>
    </div>
  );
}
