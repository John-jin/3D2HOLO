"use client";

import LenticularPreview from "@/components/generate/LenticularPreview";
import { interlaceImages } from "@/lib/interlace";
import { useEffect, useMemo, useRef, useState } from "react";

type Tab = "image" | "lens";
type Order = "rightToLeft" | "leftToRight";

const IMAGE_RE = /^image\/(png|jpe?g|gif|heic|heif)$/i;
const MAX_FILES = 48;

function PercentField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex w-1/2 flex-col gap-2">
      <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <div className="relative">
        <input
          id={id}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-[14px] border border-slate-200 bg-white/85 px-4 pe-10 text-[14px] text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20"
        />
        <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-slate-400">
          %
        </span>
      </div>
    </div>
  );
}

function InchField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex w-1/2 flex-col gap-2">
      <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <div className="relative">
        <input
          id={id}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full rounded-[14px] border border-slate-200 bg-white/85 px-4 pe-12 text-[14px] text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20"
        />
        <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-slate-400">
          英寸
        </span>
      </div>
    </div>
  );
}

export default function ImgsStudio() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [tab, setTab] = useState<Tab>("image");
  const [order, setOrder] = useState<Order>("rightToLeft");
  const [wStart, setWStart] = useState("0");
  const [wEnd, setWEnd] = useState("100");
  const [hStart, setHStart] = useState("0");
  const [hEnd, setHEnd] = useState("100");
  const [widthIn, setWidthIn] = useState("6");
  const [heightIn, setHeightIn] = useState("8");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const canInterlace = files.length >= 2 && !busy;

  const clearResult = () => {
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  };

  const take = (list: FileList | null) => {
    if (!list?.length) return;
    const incoming = Array.from(list).filter(
      (f) => IMAGE_RE.test(f.type) || /\.(heic|heif|jpe?g|png|gif)$/i.test(f.name),
    );
    if (!incoming.length) return;
    clearResult();
    setError(null);
    setFiles((prev) => {
      const room = Math.max(0, MAX_FILES - prev.length);
      if (!room) return prev;
      return [...prev, ...incoming.slice(0, room)];
    });
    // allow picking the same files again / next batch
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeAt = (index: number) => {
    clearResult();
    setError(null);
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    clearResult();
    setError(null);
    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const moveFile = (from: number, to: number) => {
    if (from === to || to < 0 || to >= files.length) return;
    clearResult();
    setFiles((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const runInterlace = async () => {
    if (files.length < 2 || busy) return;
    setBusy(true);
    setError(null);
    try {
      const { blob } = await interlaceImages({
        files,
        order,
        crop: {
          wStart: Number(wStart),
          wEnd: Number(wEnd),
          hStart: Number(hStart),
          hEnd: Number(hEnd),
        },
        widthIn: Number(widthIn) || 6,
        heightIn: Number(heightIn) || 8,
      });
      const url = URL.createObjectURL(blob);
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "交错失败，请重试");
    } finally {
      setBusy(false);
    }
  };

  const previews = useMemo(
    () => files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })),
    [files],
  );

  /** View order for motion preview — same as live: rightToLeft keeps upload order */
  const motionFrames = useMemo(() => {
    const urls = previews.map((p) => p.url);
    return order === "rightToLeft" ? urls : [...urls].reverse();
  }, [previews, order]);

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  return (
    <div className="studio-page">
      <button
        type="button"
        className="fixed bottom-6 end-6 z-[1200] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/85 text-white shadow-[0_22px_44px_-24px_rgba(15,23,42,0.95)] backdrop-blur-xl transition hover:-translate-y-[1px] hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300/70 lg:bottom-8 lg:end-8"
        aria-label="重新打开帮助引导"
        title="帮助引导"
      >
        <svg viewBox="64 64 896 896" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
          <path d="M764 280.9c-14-30.6-33.9-58.1-59.3-81.6C653.1 151.4 584.6 125 512 125s-141.1 26.4-192.7 74.2c-25.4 23.6-45.3 51-59.3 81.7-14.6 32-22 65.9-22 100.9v27c0 6.2 5 11.2 11.2 11.2h54c6.2 0 11.2-5 11.2-11.2v-27c0-99.5 88.6-180.4 197.6-180.4s197.6 80.9 197.6 180.4c0 40.8-14.5 79.2-42 111.2-27.2 31.7-65.6 54.4-108.1 64-24.3 5.5-46.2 19.2-61.7 38.8a110.85 110.85 0 00-23.9 68.6v31.4c0 6.2 5 11.2 11.2 11.2h54c6.2 0 11.2-5 11.2-11.2v-31.4c0-15.7 10.9-29.5 26-32.9 58.4-13.2 111.4-44.7 149.3-88.7 19.1-22.3 34-47.1 44.3-74 10.7-27.9 16.1-57.2 16.1-87 0-35-7.4-69-22-100.9zM512 787c-30.9 0-56 25.1-56 56s25.1 56 56 56 56-25.1 56-56-25.1-56-56-56z" />
        </svg>
      </button>

      <div className="studio-shell">
        <div className="studio-grid">
          {/* Left stages — h-fit so grid row (= sidebar) matches content height */}
          <div className="min-w-0 lg:h-fit lg:self-start">
            <div className="flex flex-col gap-5">
              {/* Upload */}
              <section
                className="studio-stage studio-noise p-5 md:p-6"
                data-tour="generate-imgs-strip"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-700">
                      图像
                    </p>
                    {files.length > 0 && (
                      <p className="text-[12px] leading-5 text-slate-600">
                        可拖拽缩略图调整帧顺序
                      </p>
                    )}
                  </div>
                  {files.length > 0 && (
                    <div className="-me-2 -mt-2">
                      <button
                        type="button"
                        onClick={clearAll}
                        aria-label="清空全部图片"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-900/[0.06] hover:text-rose-600"
                        title="清空"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                          <path
                            d="M4 7h16M9 7V5h6v2m-8 3v8m4-8v8m4-8v8M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/png,image/jpg,image/jpeg,image/gif,image/heic,image/heif,.heic,.heif"
                  multiple
                  className="hidden"
                  onChange={(e) => take(e.target.files)}
                />

                {files.length === 0 ? (
                  <div className="relative z-10 mt-1">
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
                      }}
                      onClick={() => inputRef.current?.click()}
                      onDragEnter={(e) => {
                        e.preventDefault();
                        setDragging(true);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setDragging(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        take(e.dataTransfer.files);
                      }}
                      className={`group relative flex min-h-[188px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border border-dashed p-6 transition duration-200 ${
                        dragging
                          ? "border-cyan-700/30 bg-cyan-50/60"
                          : "border-slate-200/90 bg-white/80 hover:border-cyan-700/30 hover:bg-cyan-50/60"
                      }`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_36%)] opacity-0 transition duration-200 group-hover:opacity-100" />
                      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                        <p className="max-w-[18rem] text-[15px] font-semibold leading-7 text-slate-700">
                          点击或拖拽图片到此区域上传
                        </p>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_22px_44px_-30px_rgba(15,23,42,0.95)]">
                          <svg viewBox="0 0 18 19" className="h-5 w-5" fill="none" aria-hidden>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                              d="M15.75 11.75v3a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-3M12.75 6.5 9 2.75 5.25 6.5M9 2.75v9"
                            />
                          </svg>
                        </div>
                        <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-slate-600">
                          上传
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="studio-empty-state studio-empty-state-plain relative z-10 mt-1 min-h-[190px] px-5 py-4">
                    <div className="relative z-10 flex h-full max-h-[380px] flex-row flex-wrap gap-5 overflow-x-auto overscroll-contain lg:max-h-none lg:flex-nowrap">
                      {previews.map((p, i) => (
                        <div
                          key={`${p.name}-${i}-${p.url}`}
                          className="flex shrink-0 flex-col items-center gap-2 pb-2"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", String(i));
                            e.dataTransfer.effectAllowed = "move";
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = "move";
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            const from = Number(e.dataTransfer.getData("text/plain"));
                            if (Number.isFinite(from)) moveFile(from, i);
                          }}
                        >
                          <span
                            className="max-w-[110px] truncate rounded-full bg-slate-100 px-3 py-1 text-center text-[12px] font-semibold text-slate-500"
                            title={p.name}
                          >
                            {p.name}
                          </span>
                          <div className="group/thumb relative flex h-[112px] w-[112px] cursor-grab items-center justify-center rounded-[24px] border border-slate-900/10 bg-white p-1 shadow-[0_20px_40px_-34px_rgba(15,23,42,0.6)] active:cursor-grabbing">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.url}
                              alt={p.name}
                              className="h-full w-full rounded-[18px] object-contain"
                              draggable={false}
                            />
                            <div className="pointer-events-none absolute inset-1 flex flex-col justify-between rounded-[18px] bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/80 p-3 opacity-0 transition group-hover/thumb:opacity-100">
                              <span className="mx-auto inline-flex min-w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/45 px-2.5 py-0.5 text-center text-[22px] font-semibold text-white/95 shadow-[0_18px_36px_-28px_rgba(15,23,42,0.9)] backdrop-blur-md">
                                {i + 1}
                              </span>
                              <div className="pointer-events-auto flex w-full flex-row justify-center gap-2.5">
                                <button
                                  type="button"
                                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 p-0 text-white shadow-[0_18px_36px_-26px_rgba(15,23,42,0.92)] backdrop-blur-md transition hover:border-rose-200/65 hover:bg-rose-400/20 hover:text-rose-100"
                                  aria-label={`删除图片 ${i + 1}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeAt(i);
                                  }}
                                >
                                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                                    <path
                                      d="M4 7h16M9 7V5h6v2m-8 3v8m4-8v8m4-8v8M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"
                                      stroke="currentColor"
                                      strokeWidth="1.7"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Compact add-more upload */}
                      <div className="relative z-10 flex shrink-0 items-center pb-2">
                        <button
                          type="button"
                          onClick={() => inputRef.current?.click()}
                          onDragEnter={(e) => {
                            e.preventDefault();
                            setDragging(true);
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            setDragging(false);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragging(false);
                            take(e.dataTransfer.files);
                          }}
                          className={`group relative flex h-[112px] w-[112px] shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border border-dashed p-2 transition duration-200 ${
                            dragging
                              ? "border-cyan-700/50 bg-cyan-50/60"
                              : "border-slate-400/80 bg-white/80 hover:border-cyan-700/50 hover:bg-cyan-50/60"
                          }`}
                        >
                          <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
                              <svg viewBox="0 0 18 19" className="h-4 w-4" fill="none" aria-hidden>
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.6"
                                  d="M15.75 11.75v3a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-3M12.75 6.5 9 2.75 5.25 6.5M9 2.75v9"
                                />
                              </svg>
                            </div>
                            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-600">
                              上传
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Preview */}
              <section className="studio-stage studio-stage-tall studio-noise flex flex-col p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-700">
                    交错图像
                  </p>
                </div>
                <div className="studio-empty-state studio-empty-state-plain studio-three-preview-frame relative mt-2 flex h-[420px] items-center justify-center overflow-visible px-4 py-4 md:h-[440px]">
                  {resultUrl ? (
                    <div className="absolute inset-0 z-20 flex items-center justify-center overflow-visible p-1">
                      <LenticularPreview
                        className="p-1"
                        autoSway
                        frameSrcs={motionFrames}
                        src={resultUrl}
                        showSimGlow={false}
                        alt="交错结果预览"
                        yawRangeDeg={Math.min(50, Math.max(20, files.length))}
                        simVisibleLeftPct={Number(wStart) || 0}
                        simVisibleRightPct={Number(wEnd) || 100}
                        simVisibleTopPct={Number(hStart) || 0}
                        simVisibleBottomPct={Number(hEnd) || 100}
                      />
                    </div>
                  ) : busy ? (
                    <p className="relative z-10 max-w-xl text-center text-[16px] leading-8 text-slate-500">
                      正在交错生成预览…
                    </p>
                  ) : (
                    <p className="relative z-10 max-w-xl text-center text-[16px] leading-8 text-slate-500">
                      请至少上传两张图片，然后点击交错图像生成柱状透镜结果。
                    </p>
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar height = left column (grid stretch), actions sit at bottom */}
          <aside className="studio-sidebar studio-noise flex h-full min-h-0 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto p-5 md:p-6">
              <div className="space-y-3">
                <div className="studio-tab-surface" data-tour="generate-imgs-tabs">
                <div
                  role="radiogroup"
                  aria-label="segmented control"
                  className="grid w-full grid-cols-2 gap-1 text-[15px]"
                >
                  {(
                    [
                      ["image", "图像"],
                      ["lens", "透镜"],
                    ] as const
                  ).map(([key, label]) => {
                    const active = tab === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setTab(key)}
                        className={`rounded-full px-3 py-2 text-[15px] font-medium transition ${
                          active
                            ? "bg-slate-900 text-white shadow-[0_10px_24px_-16px_rgba(15,23,42,0.55)]"
                            : "text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-900"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-5" data-tour="generate-imgs-options">
                {tab === "image" ? (
                  <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-4">
                    <div className="flex flex-col gap-4">
                      <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        图像交错顺序
                      </span>
                      <div className="flex flex-row gap-[15px]">
                        {(
                          [
                            ["rightToLeft", "右侧视角在前"],
                            ["leftToRight", "左侧视角在前"],
                          ] as const
                        ).map(([value, label]) => (
                          <label
                            key={value}
                            className="flex w-1/2 cursor-pointer items-center gap-2 text-[14px] text-slate-700"
                          >
                            <input
                              type="radio"
                              name="order"
                              checked={order === value}
                              onChange={() => setOrder(value)}
                              className="h-4 w-4 accent-cyan-700"
                            />
                            {label}
                          </label>
                        ))}
                      </div>

                      <div className="mt-1 flex flex-col gap-5">
                        <div className="flex flex-row gap-[15px]">
                          <PercentField
                            id="wStart"
                            label="宽度起点"
                            value={wStart}
                            onChange={setWStart}
                          />
                          <PercentField
                            id="wEnd"
                            label="宽度终点"
                            value={wEnd}
                            onChange={setWEnd}
                          />
                        </div>
                        <div className="flex flex-row gap-[15px]">
                          <PercentField
                            id="hStart"
                            label="高度起点"
                            value={hStart}
                            onChange={setHStart}
                          />
                          <PercentField
                            id="hEnd"
                            label="高度终点"
                            value={hEnd}
                            onChange={setHEnd}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-4">
                    <div className="flex flex-row gap-[15px]">
                      <InchField
                        id="width"
                        label="宽度"
                        value={widthIn}
                        onChange={setWidthIn}
                      />
                      <InchField
                        id="height"
                        label="高度"
                        value={heightIn}
                        onChange={setHeightIn}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className="studio-action-bar border-t-0 px-5 pb-5 pt-1 md:px-6"
              data-tour="generate-imgs-action"
            >
              {error && (
                <p className="mb-3 text-center text-[13px] text-rose-600">{error}</p>
              )}
              <button
                type="button"
                disabled={!canInterlace}
                onClick={() => void runInterlace()}
                className="studio-primary-action inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-5 text-[15px] font-semibold transition hover:-translate-y-[1px] disabled:cursor-not-allowed"
              >
                {busy ? "交错中…" : "交错图像"}
              </button>
              <button
                type="button"
                disabled={!resultUrl}
                className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 px-5 text-[15px] font-semibold text-black shadow-[0_10px_28px_-10px_rgba(8,145,178,0.55)] transition hover:-translate-y-[1px] hover:shadow-[0_14px_32px_-10px_rgba(8,145,178,0.7)] disabled:cursor-not-allowed disabled:bg-none disabled:bg-cyan-600 disabled:shadow-none disabled:hover:translate-y-0"
              >
                购买成品
              </button>
              <button
                type="button"
                disabled={!resultUrl}
                className="mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-cyan-600/40 bg-white/80 px-5 text-[15px] font-semibold text-cyan-700 transition hover:border-cyan-600/60 hover:bg-cyan-600/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                加入购物车
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
