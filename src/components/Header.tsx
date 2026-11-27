"use client";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import { getLocaleFromPath } from "@/lib/locales";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

type MenuItem = {
  path: string;
  title: string;
  desc: string;
};

type MenuColumn = {
  heading: string;
  width: string;
  items: MenuItem[];
};

type LocalizedItem = { href: string; title: string; desc: string };
type LocalizedColumn = {
  heading: string;
  width: string;
  items: LocalizedItem[];
};

const makeMenu: MenuColumn[] = [
  {
    heading: "2D",
    width: "w-[320px]",
    items: [
      {
        path: "/generate/imgs",
        title: "照片转 3D 打印",
        desc: "把照片变成定制 3D 打印照片",
      },
      {
        path: "/generate/ai",
        title: "一张照片转 3D 打印",
        desc: "AI 把一张照片变成 3D 打印",
      },
    ],
  },
  {
    heading: "3D",
    width: "w-[320px]",
    items: [
      {
        path: "/generate/3d",
        title: "3D 模型转 3D 打印",
        desc: "上传模型，定制动态 3D 打印",
      },
      {
        path: "/generate/sketchfab",
        title: "Sketchfab 模型转 3D 打印",
        desc: "粘贴 Sketchfab 链接，定制模型 3D 打印",
      },
    ],
  },
];

const learnMenu: MenuColumn[] = [
  {
    heading: "下载",
    width: "w-[250px]",
    items: [
      {
        path: "/test-materials",
        title: "测试材料",
        desc: "测试用图片和模型",
      },
    ],
  },
];

function withCode(code: string, path: string) {
  return `/${code}${path.startsWith("/") ? path : `/${path}`}`;
}

function localizeColumns(code: string, cols: MenuColumn[]): LocalizedColumn[] {
  return cols.map((col) => ({
    ...col,
    items: col.items.map((item) => ({
      href: withCode(code, item.path),
      title: item.title,
      desc: item.desc,
    })),
  }));
}

function Logo({
  size = "lg",
  href = "/zh",
}: {
  size?: "sm" | "lg";
  href?: string;
}) {
  const box = size === "lg" ? "h-10 w-10 md:h-11 md:w-11" : "h-8 w-8";
  return (
    <Link
      href={href}
      aria-label="3D2HOLO Home"
      className="group inline-flex items-center gap-[10px] rounded-xl py-[2px] transition duration-300 hover:-translate-y-[1px]"
    >
      <span
        className={`relative inline-flex shrink-0 items-center justify-center rounded-xl p-[2px] ${box}`}
      >
        <span className="absolute -inset-[2px] rounded-[14px] bg-gradient-to-br from-cyan-300/70 via-blue-300/50 to-indigo-400/70 blur-[6px] transition duration-300 group-hover:blur-[8px]" />
        <span className="absolute inset-0 rounded-xl bg-[conic-gradient(from_180deg_at_50%_50%,#a5f3fc,#bfdbfe,#c7d2fe,#a5f3fc)]" />
        <span className="absolute inset-[1px] rounded-[10px] border border-white/85 bg-white/85 shadow-[0_8px_24px_-14px_rgba(37,99,235,0.95)] backdrop-blur-sm" />
        <Image
          src="/images/3d2holo-logo-tech.svg"
          alt="3d Hologram Generator"
          fill
          className="relative z-10 rounded-[10px] object-contain p-[2px] transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </span>
      <span className="hidden text-[18px] font-bold tracking-tight text-[#2563eb] sm:inline">
        3D2HOLO
      </span>
    </Link>
  );
}

function MegaPanel({ columns }: { columns: LocalizedColumn[] }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_34px_90px_-48px_rgba(15,23,42,0.25)] backdrop-blur-xl">
      <div
        className={`grid w-max items-start gap-3 ${
          columns.length > 1 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {columns.map((col) => (
          <div
            key={col.heading}
            className={`flex ${col.width} flex-col rounded-[22px] border border-slate-100 bg-slate-50/80 p-4`}
          >
            <h3 className="pb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              {col.heading}
            </h3>
            <div className="grid gap-3">
              {col.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[20px] border border-slate-200/80 bg-white px-4 py-4 transition duration-200 hover:-translate-y-[2px] hover:border-cyan-200 hover:shadow-[0_28px_60px_-42px_rgba(14,116,144,0.25)]"
                >
                  <div className="space-y-1">
                    <h4 className="text-[15px] font-semibold leading-5 text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-[13px] leading-6 text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function navBtnClass(active: boolean) {
  return active
    ? "inline-flex h-11 items-center rounded-full bg-cyan-600/10 px-4 text-[14px] font-semibold leading-none text-cyan-700 transition-all duration-200"
    : "inline-flex h-11 items-center rounded-full px-4 text-[14px] font-semibold leading-none text-slate-600 transition-all duration-200 hover:bg-slate-900/[0.04] hover:text-slate-900 group-hover:bg-slate-900/[0.04] group-hover:text-slate-900";
}

function NavDropdown({
  label,
  columns,
  active = false,
}: {
  label: string;
  columns: LocalizedColumn[];
  active?: boolean;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className={navBtnClass(active)}
        aria-haspopup="true"
      >
        {label}
      </button>
      <div className="absolute left-1/2 top-full z-[1200] hidden w-max -translate-x-1/2 pt-[14px] group-hover:block group-focus-within:block">
        <MegaPanel columns={columns} />
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || "/zh";
  const locale = getLocaleFromPath(pathname);
  const code = locale.code;
  const rest = pathname.replace(new RegExp(`^/${code}`), "") || "/";

  const homeActive = rest === "/" || rest === "";
  const makeActive = rest.startsWith("/generate");
  const learnActive =
    rest.startsWith("/test-materials") || rest.startsWith("/tools");

  const makeColumns = useMemo(() => localizeColumns(code, makeMenu), [code]);
  const learnColumns = useMemo(() => localizeColumns(code, learnMenu), [code]);
  const mobileMakeLinks = makeColumns.flatMap((c) => c.items);
  const mobileLearnLinks = learnColumns.flatMap((c) => c.items);
  const homeHref = `/${code}`;

  return (
    <header className="relative z-[1100] overflow-visible py-3">
      <div className="relative w-full overflow-visible border-b border-slate-900/10">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-2 overflow-visible px-3 pb-3 pt-2 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-3 lg:px-6">
          <div className="flex min-w-0 items-center gap-2 lg:justify-self-start lg:gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-900/10 bg-white/70 p-0 text-slate-700 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.25)] transition hover:border-cyan-700/30 hover:bg-white hover:text-cyan-700 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="open menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
            <span className="lg:hidden">
              <Logo size="sm" href={homeHref} />
            </span>
            <span className="hidden lg:inline-flex">
              <Logo size="lg" href={homeHref} />
            </span>
          </div>

          <nav className="relative hidden min-w-0 items-center justify-center gap-2 overflow-visible lg:flex lg:justify-self-center">
            <Link href={homeHref} className={navBtnClass(homeActive)}>
              主页
            </Link>
            <NavDropdown
              label="制作"
              columns={makeColumns}
              active={makeActive}
            />
            <NavDropdown
              label="学习"
              columns={learnColumns}
              active={learnActive}
            />
          </nav>

          <div className="flex min-w-0 items-center justify-end gap-1.5 lg:justify-self-end lg:gap-3">
            <Link
              href={withCode(code, "/cart")}
              aria-label="购物车"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-900/10 bg-white/70 text-slate-700 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.25)] transition hover:border-cyan-700/30 hover:bg-white hover:text-cyan-700"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                <path
                  d="M6 6h15l-1.5 9h-12L6 6Zm0 0L5 3H2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="20" r="1.3" fill="currentColor" />
                <circle cx="18" cy="20" r="1.3" fill="currentColor" />
              </svg>
            </Link>
            <LocaleSwitcher />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-0 bg-[#2563eb] p-0 text-[13px] font-semibold text-white shadow-[0_24px_44px_-30px_rgba(37,99,235,0.95)] md:w-auto md:px-5 md:text-[14px]"
            >
              登录
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            id="mobile-menu"
            className="border-t border-slate-900/10 bg-white/95 px-4 py-4 backdrop-blur lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              <Link
                href={homeHref}
                className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                主页
              </Link>
              <p className="mt-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                制作
              </p>
              {mobileMakeLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.title}
                </Link>
              ))}
              <p className="mt-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                学习
              </p>
              {mobileLearnLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
