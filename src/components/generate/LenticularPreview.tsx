"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Props = {
  alt?: string;
  className?: string;
  /** Ordered view frames for motion (already direction-sorted) */
  frameSrcs?: string[];
  /** Interlaced composite — used for aspect/size */
  src: string;
  yawRangeDeg?: number;
  leftYawRangeDeg?: number;
  rightYawRangeDeg?: number;
  showSimBackdrop?: boolean;
  showSimGlow?: boolean;
  simVisibleLeftPct?: number;
  simVisibleRightPct?: number;
  simVisibleTopPct?: number;
  simVisibleBottomPct?: number;
  simFlipY?: boolean;
  autoSway?: boolean;
};

/**
 * Live-site SimPreview (module 82267): CSS 3D card + frame blend + auto sway.
 */
export default function LenticularPreview({
  alt = "generated interlaced result",
  className = "",
  frameSrcs = [],
  src,
  yawRangeDeg = 20,
  leftYawRangeDeg,
  rightYawRangeDeg,
  showSimBackdrop = true,
  showSimGlow = false,
  simVisibleLeftPct = 0,
  simVisibleRightPct = 100,
  simVisibleTopPct = 0,
  simVisibleBottomPct = 100,
  simFlipY = false,
  autoSway = true,
}: Props) {
  const [tilt, setTilt] = useState({ x: 50, y: 50, rotateX: 0, rotateY: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const sizeImgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const pointerActive = useRef(false);
  const [box, setBox] = useState<{ width: number; height: number } | null>(null);

  const frames = frameSrcs.length > 1 ? frameSrcs : src ? [src] : [];
  const blendPos = frames.length > 1 ? (tilt.x / 100) * (frames.length - 1) : 0;
  const idx = Math.min(
    frames.length - 1,
    Math.max(0, Math.floor(blendPos)),
  );
  const frac = frames.length > 1 ? Math.min(1, Math.max(0, blendPos - idx)) : 0;
  const frameA = frames[idx] ?? src;
  const frameB = frac > 0.001 ? (frames[idx + 1] ?? frameA) : null;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const img = sizeImgRef.current;
    if (!root || !img) return;

    const measure = () => {
      const r = root.getBoundingClientRect();
      const nw = img.naturalWidth || 1;
      const nh = img.naturalHeight || 1;
      const scale = Math.min(r.width / nw, r.height / nh);
      setBox({
        width: Math.max(1, Math.floor(nw * scale)),
        height: Math.max(1, Math.floor(nh * scale)),
      });
    };

    const ro = new ResizeObserver(() => {
      if (img.complete && img.naturalWidth > 1) measure();
    });
    ro.observe(root);
    if (img.complete && img.naturalWidth > 1) measure();
    else img.onload = () => measure();
    return () => {
      ro.disconnect();
      img.onload = null;
    };
  }, [src]);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const sync = () => {
      rectRef.current = card.getBoundingClientRect();
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(card);
    window.addEventListener("scroll", sync, true);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", sync, true);
    };
  }, [box?.height, box?.width]);

  const applyTilt = useCallback(
    (xPct: number, yPct: number) => {
      const leftSpan = leftYawRangeDeg ?? yawRangeDeg / 2;
      const rightSpan = rightYawRangeDeg ?? yawRangeDeg / 2;
      setTilt({
        x: xPct,
        y: yPct,
        rotateX: (0.5 - yPct / 100) * 8,
        rotateY:
          xPct >= 50
            ? ((xPct - 50) / 50) * rightSpan
            : -((50 - xPct) / 50) * leftSpan,
      });
    },
    [leftYawRangeDeg, rightYawRangeDeg, yawRangeDeg],
  );

  useEffect(() => {
    if (!autoSway || frames.length <= 1) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const n = frames.length;
    const cycle = 2 * (n - 1);
    let last = performance.now();
    let elapsed = 0;
    let raf = 0;

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pointerActive.current) {
        elapsed = (elapsed + dt) % 4000;
        const t = (elapsed / 4000) * cycle;
        const view = t <= n - 1 ? t : cycle - t;
        applyTilt((Math.min(n - 1, Math.max(0, view)) / (n - 1)) * 100, 50);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [applyTilt, autoSway, frames.length]);

  const left = Math.max(0, Math.min(100, simVisibleLeftPct));
  const top = Math.max(0, Math.min(100, simVisibleTopPct));
  const cropW = Math.max(1, Math.max(left, Math.min(100, simVisibleRightPct)) - left);
  const cropH = Math.max(1, Math.max(top, Math.min(100, simVisibleBottomPct)) - top);
  const imgW = 10000 / cropW;
  const imgH = 10000 / cropH;
  const imgLeft = -(100 * left) / cropW;
  const imgTop = -(100 * top) / cropH;
  const flip = simFlipY ? ({ transform: "scaleY(-1)" } as const) : {};

  return (
    <div
      ref={rootRef}
      className={`relative flex h-full min-h-0 w-full min-w-0 items-center justify-center ${className}`}
    >
      {/* sizing reference = interlaced result aspect */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={sizeImgRef}
        className="hidden h-full max-h-full w-full max-w-full object-contain"
        src={src}
        alt={alt}
        aria-hidden
      />

      <div className="relative flex h-full min-h-0 w-full min-w-0 items-center justify-center overflow-visible [perspective:1400px]">
        {showSimGlow && (
          <>
            <div className="absolute -start-10 bottom-8 h-32 w-32 rounded-full bg-blue-500/20 blur-[56px]" />
            <div className="absolute -end-8 top-8 h-32 w-32 rounded-full bg-cyan-400/20 blur-[56px]" />
          </>
        )}

        <div
          ref={cardRef}
          className={`relative flex min-h-0 min-w-0 items-center justify-center overflow-hidden transition-transform duration-150 ease-out will-change-transform ${
            showSimBackdrop ? "bg-slate-900/[0.03]" : ""
          }`}
          style={{
            width: box?.width ?? "100%",
            height: box?.height ?? "100%",
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          }}
          onMouseEnter={(e) => {
            pointerActive.current = true;
            rectRef.current = e.currentTarget.getBoundingClientRect();
          }}
          onMouseLeave={() => {
            pointerActive.current = false;
          }}
          onMouseMove={(e) => {
            const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
            rectRef.current = rect;
            const w = box?.width ?? rect.width;
            const h = box?.height ?? rect.height;
            if (!w || !h) return;
            applyTilt(
              100 * Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
              100 * Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)),
            );
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute max-h-none max-w-none"
              src={frameA}
              alt={alt}
              draggable={false}
              style={{
                width: `${imgW}%`,
                height: `${imgH}%`,
                left: `${imgLeft}%`,
                top: `${imgTop}%`,
                ...flip,
              }}
            />
            {frameB && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="absolute max-h-none max-w-none"
                src={frameB}
                alt=""
                aria-hidden
                draggable={false}
                style={{
                  width: `${imgW}%`,
                  height: `${imgH}%`,
                  left: `${imgLeft}%`,
                  top: `${imgTop}%`,
                  opacity: frac,
                  ...flip,
                }}
              />
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-white/5 to-transparent" />
        </div>
      </div>
    </div>
  );
}
