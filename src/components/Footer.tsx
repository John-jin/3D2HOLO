import Image from "next/image";
import Link from "next/link";

const product = [
  { href: "/zh/generate/imgs", label: "照片转 3D 打印" },
  { href: "/zh/generate/3d", label: "3D 模型转 3D 打印" },
  { href: "/zh/generate/ai", label: "一张照片转 3D 打印" },
  { href: "/zh/generate/sketchfab", label: "Sketchfab 转 3D 打印" },
];

const resources = [
  { href: "/zh/tools/hologram-video", label: "全息动效生成器" },
  { href: "/zh/tools/pitch-test", label: "光栅间距测试工具" },
  { href: "/zh/test-materials", label: "测试素材" },
];

const legal = [
  { href: "/zh/terms", label: "服务条款" },
  { href: "/zh/privacy-policy", label: "隐私政策" },
  { href: "/zh/return-policy", label: "退货政策" },
  { href: "/zh/accessibility-statement", label: "无障碍声明" },
];

const social = [
  {
    label: "3d2holo X",
    href: "https://x.com/3d2holo",
    icon: (
      <svg
        fillRule="evenodd"
        viewBox="64 64 896 896"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden
      >
        <path d="M921 912L601.11 445.75l.55.43L890.08 112H793.7L558.74 384 372.15 112H119.37l298.65 435.31-.04-.04L103 912h96.39L460.6 609.38 668.2 912zM333.96 184.73l448.83 654.54H706.4L257.2 184.73z" />
      </svg>
    ),
  },
  {
    label: "3d2holo YouTube",
    href: "https://www.youtube.com/@3d2holo",
    icon: (
      <svg
        viewBox="64 64 896 896"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden
      >
        <path d="M960 509.2c0-2.2 0-4.7-.1-7.6-.1-8.1-.3-17.2-.5-26.9-.8-27.9-2.2-55.7-4.4-81.9-3-36.1-7.4-66.2-13.4-88.8a139.52 139.52 0 00-98.3-98.5c-28.3-7.6-83.7-12.3-161.7-15.2-37.1-1.4-76.8-2.3-116.5-2.8-13.9-.2-26.8-.3-38.4-.4h-29.4c-11.6.1-24.5.2-38.4.4-39.7.5-79.4 1.4-116.5 2.8-78 3-133.5 7.7-161.7 15.2A139.35 139.35 0 0082.4 304C76.3 326.6 72 356.7 69 392.8c-2.2 26.2-3.6 54-4.4 81.9-.3 9.7-.4 18.8-.5 26.9 0 2.9-.1 5.4-.1 7.6v5.6c0 2.2 0 4.7.1 7.6.1 8.1.3 17.2.5 26.9.8 27.9 2.2 55.7 4.4 81.9 3 36.1 7.4 66.2 13.4 88.8 12.8 47.9 50.4 85.7 98.3 98.5 28.2 7.6 83.7 12.3 161.7 15.2 37.1 1.4 76.8 2.3 116.5 2.8 13.9.2 26.8.3 38.4.4h29.4c11.6-.1 24.5-.2 38.4-.4 39.7-.5 79.4-1.4 116.5-2.8 78-3 133.5-7.7 161.7-15.2 47.9-12.8 85.5-50.5 98.3-98.5 6.1-22.6 10.4-52.7 13.4-88.8 2.2-26.2 3.6-54 4.4-81.9.3-9.7.4-18.8.5-26.9 0-2.9.1-5.4.1-7.6v-5.6zm-72 5.2c0 2.1 0 4.4-.1 7.1-.1 7.8-.3 16.4-.5 25.7-.7 26.6-2.1 53.2-4.2 77.9-2.7 32.2-6.5 58.6-11.2 76.3-6.2 23.1-24.4 41.4-47.4 47.5-21 5.6-73.9 10.1-145.8 12.8-36.4 1.4-75.6 2.3-114.7 2.8-13.7.2-26.4.3-37.8.3h-28.6l-37.8-.3c-39.1-.5-78.2-1.4-114.7-2.8-71.9-2.8-124.9-7.2-145.8-12.8-23-6.2-41.2-24.4-47.4-47.5-4.7-17.7-8.5-44.1-11.2-76.3-2.1-24.7-3.4-51.3-4.2-77.9-.3-9.3-.4-18-.5-25.7 0-2.7-.1-5.1-.1-7.1v-4.8c0-2.1 0-4.4.1-7.1.1-7.8.3-16.4.5-25.7.7-26.6 2.1-53.2 4.2-77.9 2.7-32.2 6.5-58.6 11.2-76.3 6.2-23.1 24.4-41.4 47.4-47.5 21-5.6 73.9-10.1 145.8-12.8 36.4-1.4 75.6-2.3 114.7-2.8 13.7-.2 26.4-.3 37.8-.3h28.6l37.8.3c39.1.5 78.2 1.4 114.7 2.8 71.9 2.8 124.9 7.2 145.8 12.8 23 6.2 41.2 24.4 47.4 47.5 4.7 17.7 8.5 44.1 11.2 76.3 2.1 24.7 3.4 51.3 4.2 77.9.3 9.3.4 18 .5 25.7 0 2.7.1 5.1.1 7.1v4.8zM423 646l232-135-232-133z" />
      </svg>
    ),
  },
  {
    label: "3d2holo 抖音",
    href: "https://www.tiktok.com/@3d2holo",
    icon: (
      <svg
        fillRule="evenodd"
        viewBox="64 64 896 896"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden
      >
        <path d="M530.01 112.67c43.67-.67 87-.34 130.33-.67 2.67 51 21 103 58.33 139 37.33 37 90 54 141.33 59.66V445c-48-1.67-96.33-11.67-140-32.34-19-8.66-36.66-19.66-54-31-.33 97.33.34 194.67-.66 291.67-2.67 46.66-18 93-45 131.33-43.66 64-119.32 105.66-196.99 107-47.66 2.66-95.33-10.34-136-34.34C220.04 837.66 172.7 765 165.7 687c-.67-16.66-1-33.33-.34-49.66 6-63.34 37.33-124 86-165.34 55.33-48 132.66-71 204.99-57.33.67 49.34-1.33 98.67-1.33 148-33-10.67-71.67-7.67-100.67 12.33-21 13.67-37 34.67-45.33 58.34-7 17-5 35.66-4.66 53.66 8 54.67 60.66 100.67 116.66 95.67 37.33-.34 73-22 92.33-53.67 6.33-11 13.33-22.33 13.66-35.33 3.34-59.67 2-119 2.34-178.66.33-134.34-.34-268.33.66-402.33" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-900/10 px-6 pb-10 pt-20">
      <div className="mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link
            href="/zh"
            aria-label="3D2HOLO Home"
            className="group inline-flex items-center gap-[10px] rounded-xl transition duration-300 hover:-translate-y-[1px]"
          >
            <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl p-[2px] md:h-14 md:w-14">
              <span className="absolute -inset-[2px] rounded-[14px] bg-gradient-to-br from-cyan-300/70 via-blue-300/50 to-indigo-400/70 blur-[6px] transition duration-300 group-hover:blur-[8px]" />
              <span className="absolute inset-0 rounded-xl bg-[conic-gradient(from_180deg_at_50%_50%,#a5f3fc,#bfdbfe,#c7d2fe,#a5f3fc)]" />
              <span className="absolute inset-[1px] rounded-[10px] border border-white/85 bg-white/85 shadow-[0_8px_24px_-14px_rgba(37,99,235,0.95)] backdrop-blur-sm" />
              <Image
                src="/images/3d2holo-logo-tech.svg"
                alt="3d Hologram Generator"
                fill
                className="relative z-10 rounded-[10px] object-contain p-[2px]"
              />
            </span>
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 bg-clip-text text-[18px] font-semibold tracking-[0.12em] text-transparent [text-shadow:0_0_16px_rgba(56,189,248,0.25)] md:text-2xl">
              3D2HOLO
            </span>
          </Link>
          <p className="mb-6 mt-6 max-w-sm leading-8 text-slate-600">
            把照片变成真正的 3D
            打印——定制光栅照片打印，免费在线设计、实时预览、全球配送。
          </p>
          <div className="flex gap-4">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                title={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/[0.04] text-slate-600 transition hover:bg-cyan-700/10 hover:text-slate-900"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-6 font-bold text-slate-900">产品</h4>
          <ul className="space-y-4 text-sm text-slate-600">
            {product.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-slate-900">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-bold text-slate-900">资源</h4>
          <ul className="space-y-4 text-sm text-slate-600">
            {resources.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-slate-900">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-bold text-slate-900">法律</h4>
          <ul className="space-y-4 text-sm text-slate-600">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-slate-900">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <span className="transition hover:text-slate-900">授权声明</span>
            </li>
            <li>
              <button type="button" className="transition hover:text-slate-900">
                Cookie 设置
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-900/10 pt-10 text-xs text-slate-500 md:flex-row">
        <p>© 2026 3D2HOLO.com. 保留所有权利。</p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:hello@3d2holo.com"
            className="transition hover:text-slate-900"
          >
            联系我们
          </a>
          <span>系统状态：运行正常</span>
          <span className="flex items-center gap-1">
            <svg
              viewBox="64 64 896 896"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden
            >
              <path d="M854.4 800.9c.2-.3.5-.6.7-.9C920.6 722.1 960 621.7 960 512s-39.4-210.1-104.8-288c-.2-.3-.5-.5-.7-.8-1.1-1.3-2.1-2.5-3.2-3.7-.4-.5-.8-.9-1.2-1.4l-4.1-4.7-.1-.1c-1.5-1.7-3.1-3.4-4.6-5.1l-.1-.1c-3.2-3.4-6.4-6.8-9.7-10.1l-.1-.1-4.8-4.8-.3-.3c-1.5-1.5-3-2.9-4.5-4.3-.5-.5-1-1-1.6-1.5-1-1-2-1.9-3-2.8-.3-.3-.7-.6-1-1C736.4 109.2 629.5 64 512 64s-224.4 45.2-304.3 119.2c-.3.3-.7.6-1 1-1 .9-2 1.9-3 2.9-.5.5-1 1-1.6 1.5-1.5 1.4-3 2.9-4.5 4.3l-.3.3-4.8 4.8-.1.1c-3.3 3.3-6.5 6.7-9.7 10.1l-.1.1c-1.6 1.7-3.1 3.4-4.6 5.1l-.1.1c-1.4 1.5-2.8 3.1-4.1 4.7-.4.5-.8.9-1.2 1.4-1.1 1.2-2.1 2.5-3.2 3.7-.2.3-.5.5-.7.8C103.4 301.9 64 402.3 64 512s39.4 210.1 104.8 288c.2.3.5.6.7.9l3.1 3.7c.4.5.8.9 1.2 1.4l4.1 4.7c0 .1.1.1.1.2 1.5 1.7 3 3.4 4.6 5l.1.1c3.2 3.4 6.4 6.8 9.6 10.1l.1.1c1.6 1.6 3.1 3.2 4.7 4.7l.3.3c3.3 3.3 6.7 6.5 10.1 9.6 80.1 74 187 119.2 304.5 119.2s224.4-45.2 304.3-119.2a300 300 0 0010-9.6l.3-.3c1.6-1.6 3.2-3.1 4.7-4.7l.1-.1c3.3-3.3 6.5-6.7 9.6-10.1l.1-.1c1.5-1.7 3.1-3.3 4.6-5 0-.1.1-.1.1-.2 1.4-1.5 2.8-3.1 4.1-4.7.4-.5.8-.9 1.2-1.4a99 99 0 003.3-3.7z" />
            </svg>
            语言: 简体中文 (zh)
          </span>
        </div>
      </div>
    </footer>
  );
}
