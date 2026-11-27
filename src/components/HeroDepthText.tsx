"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const FONT_STACK =
  '"Noto Sans SC","PingFang SC","Microsoft YaHei","Segoe UI",sans-serif';

function makeTextTexture(text: string) {
  const measure = document.createElement("canvas").getContext("2d");
  if (!measure) return { texture: null as THREE.CanvasTexture | null, aspect: 3 };

  measure.font = `900 320px ${FONT_STACK}`;
  const width = Math.ceil(measure.measureText(text).width + 360);
  const height = Math.ceil(680);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { texture: null as THREE.CanvasTexture | null, aspect: 3 };

  ctx.clearRect(0, 0, width, height);
  ctx.font = `900 320px ${FONT_STACK}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const cx = width / 2;
  const cy = height / 2 + 25.6;
  const gradient = ctx.createLinearGradient(0, 54, 0, height - 36);
  gradient.addColorStop(0, "#0369a1");
  gradient.addColorStop(0.38, "#0891b2");
  gradient.addColorStop(0.72, "#06b6d4");
  gradient.addColorStop(1, "#22d3ee");

  ctx.strokeStyle = "rgba(14, 116, 144, 0.18)";
  ctx.lineWidth = 12;
  ctx.strokeText(text, cx, cy);
  ctx.fillStyle = gradient;
  ctx.fillText(text, cx, cy);

  ctx.globalCompositeOperation = "source-atop";
  const shine = ctx.createLinearGradient(0, 0, width, height);
  shine.addColorStop(0.2, "rgba(255,255,255,0)");
  shine.addColorStop(0.5, "rgba(255,255,255,0.3)");
  shine.addColorStop(0.8, "rgba(255,255,255,0)");
  ctx.fillStyle = shine;
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return { texture, aspect: width / height };
}

type HeroDepthTextProps = {
  text: string;
};

export default function HeroDepthText({ text }: HeroDepthTextProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = wrapRef.current;
    if (!host) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanupScene: (() => void) | null = null;
    let idleId: number | null = null;
    let timeoutId: number | null = null;
    let bootObserver: IntersectionObserver | null = null;

    const boot = async () => {
      if (disposed || cleanupScene) return;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
      camera.position.set(0, 0, 8.15);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "default",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.setClearColor(0, 0);
      host.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const { texture, aspect } = makeTextTexture(text);
      if (!texture) {
        renderer.dispose();
        renderer.domElement.remove();
        return;
      }

      const planeW = 5.3 * aspect;
      const planeH = 5.3;
      const geometry = new THREE.PlaneGeometry(planeW, planeH);
      const layers: THREE.Mesh[] = [];

      for (let i = 0; i < 12; i += 1) {
        const z = (i - 10) * 0.065;
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(0.56, 0.85, 0.3 + 0.008 * i),
          map: texture,
          transparent: true,
          opacity: 0.94,
          alphaTest: 0.22,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, z);
        group.add(mesh);
        layers.push(mesh);
      }

      const frontMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.12,
        depthTest: true,
      });
      const front = new THREE.Mesh(geometry, frontMat);
      front.position.z = 0.2;
      group.add(front);

      const glowGeo = new THREE.PlaneGeometry(1.04 * planeW, 5.936);
      const glowMat = new THREE.MeshBasicMaterial({
        color: "#22d3ee",
        map: texture,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
        alphaTest: 0.12,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.set(0, 0, -0.9);
      group.add(glow);

      const target = { x: 0, y: 0 };
      const current = { x: 0, y: 0 };
      let raf = 0;
      let animating = false;
      let visible = true;
      let last = performance.now();
      let idleClock = 0;
      let lastPointer = -Infinity;
      const pointerBias = { y: 0 };
      let frameSkip = 0;

      const renderFrame = (now: number) => {
        const dt = Math.min(now - last, 100);
        last = now;
        idleClock += dt;
        const sway = 0.55 * Math.sin((idleClock / 12000) * Math.PI * 2);
        const fade = Math.min(1, (now - lastPointer) / 3000);
        target.y = pointerBias.y * (1 - fade);
        current.x += (target.x - current.x) * 0.1;
        current.y += (target.y - current.y) * 0.1;
        group.rotation.x = current.x;
        group.rotation.y = current.y + sway;
        glow.position.x = (current.y + sway) * 0.08;
        renderer.render(scene, camera);
      };

      const resize = () => {
        const rect = host.getBoundingClientRect();
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(1, Math.floor(rect.height));
        const a = w / h;
        renderer.setSize(w, h, false);
        camera.left = (-4.45 * a) / 2;
        camera.right = (4.45 * a) / 2;
        camera.top = 2.225;
        camera.bottom = -2.225;
        camera.updateProjectionMatrix();
        group.scale.setScalar(Math.min(1, (4.45 * a) / planeW));
        renderFrame(performance.now());
      };

      const loop = (now: number) => {
        if (now - lastPointer < 3000 || frameSkip++ % 2 === 0) {
          renderFrame(now);
        }
        if (!visible || document.hidden) {
          animating = false;
          raf = 0;
          return;
        }
        raf = window.requestAnimationFrame(loop);
      };

      const ensureLoop = () => {
        if (animating || !visible || document.hidden) return;
        animating = true;
        raf = window.requestAnimationFrame(loop);
      };

      const onPointerMove = (e: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        pointerBias.y = ((e.clientX - rect.left) / rect.width - 0.5) * 1.1;
        lastPointer = performance.now();
        ensureLoop();
      };

      const ro = new ResizeObserver(resize);
      ro.observe(host);
      resize();
      setReady(true);
      host.addEventListener("pointermove", onPointerMove);

      const io = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) ensureLoop();
      });
      io.observe(host);
      ensureLoop();

      const onVisibility = () => {
        if (!document.hidden && visible) ensureLoop();
      };
      document.addEventListener("visibilitychange", onVisibility);

      cleanupScene = () => {
        if (raf) window.cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        host.removeEventListener("pointermove", onPointerMove);
        geometry.dispose();
        glowGeo.dispose();
        texture.dispose();
        frontMat.dispose();
        glowMat.dispose();
        for (const mesh of layers) {
          (mesh.material as THREE.Material).dispose();
        }
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    bootObserver = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        bootObserver?.disconnect();
        const ric = window.requestIdleCallback;
        const start = () => {
          boot().catch(() => undefined);
        };
        if (ric) {
          idleId = ric(start, { timeout: 1200 });
        } else {
          timeoutId = window.setTimeout(start, 180);
        }
      },
      { rootMargin: "160px" },
    );
    bootObserver.observe(host);

    return () => {
      disposed = true;
      bootObserver?.disconnect();
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      cleanupScene?.();
    };
  }, [text]);

  return (
    <span className="hero-depth-stage mt-2 block" aria-label={text}>
      <span
        ref={wrapRef}
        className={`hero-depth-canvas-wrap${ready ? " hero-depth-canvas-wrap-visible" : ""}`}
        aria-hidden="true"
      />
      <span
        className={`hero-depth-fallback${ready ? " hero-depth-fallback-hidden" : ""}`}
        style={text.length > 17 ? { fontSize: "0.72em" } : undefined}
      >
        {text}
      </span>
    </span>
  );
}
