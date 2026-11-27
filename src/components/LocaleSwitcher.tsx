"use client";

import { getLocaleFromPath, LOCALES, withLocale } from "@/lib/locales";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LocaleSwitcher() {
  const pathname = usePathname() || "/zh";
  const current = getLocaleFromPath(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative z-[1110]" ref={rootRef}>
      <button
        type="button"
        className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 text-[13px] font-semibold text-slate-700 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.25)] transition hover:bg-white hover:text-cyan-700 md:text-[14px]"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="locale-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="uppercase md:hidden">{current.short}</span>
        <span className="hidden max-w-[86px] truncate md:inline">
          {current.label}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="8"
          fill="none"
          className={`h-3 w-3 transition duration-200 ${
            open ? "rotate-180 text-cyan-700" : "text-slate-500"
          }`}
          aria-hidden
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m11 1.5-5 5-5-5"
          />
        </svg>
      </button>

      {open && (
        <div
          id="locale-menu"
          role="menu"
          aria-label="选择语言"
          className="absolute end-0 top-[52px] z-[1120] w-60 overflow-hidden rounded-[24px] border border-slate-200 bg-white/95 shadow-[0_34px_80px_-46px_rgba(15,23,42,0.25)] backdrop-blur-xl"
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              选择语言
            </p>
          </div>
          <div className="max-h-80 overflow-y-auto py-2">
            {LOCALES.map((locale) => {
              const active = locale.code === current.code;
              const href = withLocale(pathname, locale.code);
              return (
                <Link
                  key={locale.code}
                  href={href}
                  role="menuitemradio"
                  aria-checked={active}
                  className={`flex w-full items-center justify-between px-4 py-3 text-start text-[13px] transition ${
                    active
                      ? "bg-cyan-600/10 text-cyan-700"
                      : "text-slate-700 hover:bg-slate-900/[0.04] hover:text-slate-900"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span>{locale.label}</span>
                  {active && (
                    <span className="text-[16px] leading-none">✓</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
