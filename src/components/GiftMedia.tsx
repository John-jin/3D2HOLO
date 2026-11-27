"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GiftMediaProps = {
  src: string;
  videoSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  objectPosition?: string;
};

export default function GiftMedia({
  src,
  videoSrc,
  alt,
  width,
  height,
  className = "",
  objectPosition,
}: GiftMediaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!videoSrc || active) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active, videoSrc]);

  useEffect(() => {
    if (active) videoRef.current?.play().catch(() => undefined);
  }, [active]);

  return (
    <div ref={rootRef} className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      {active && videoSrc && !failed ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={src}
          src={videoSrc}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      ) : null}
    </div>
  );
}
