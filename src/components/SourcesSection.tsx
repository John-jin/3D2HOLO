import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import SectionBadge from "./SectionBadge";

const sources = [
  {
    n: "01",
    href: "/zh/generate/imgs",
    title: "照片序列",
    desc: "把多角度拍摄的照片变成倾斜时画面会动的真实 3D 打印。",
    cta: "从照片开始",
    iconWrap:
      "bg-cyan-600/10 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7">
        <path
          d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v8.8l3.6-3.6a1 1 0 0 1 1.41 0l2.36 2.35 3.36-4.03a1 1 0 0 1 1.53-.02L19 11.8V6H5Zm14 12v-3.37l-2.48-2.96-3.33 4a1 1 0 0 1-1.49.08l-2.39-2.39L5 18h14Zm-3.5-9.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    n: "02",
    href: "/zh/generate/3d",
    title: "3D 模型文件",
    desc: "上传 GLB 或 OBJ——内置相机渲染每一个视角，做成模型的真实 3D 打印。",
    cta: "从模型开始",
    iconWrap:
      "bg-blue-600/10 text-blue-700 group-hover:bg-blue-600 group-hover:text-white",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7">
        <path
          d="M12 2.8 20.5 7v10L12 21.2 3.5 17V7L12 2.8Zm0 2.3L5.5 8.2v7.6L12 19l6.5-3.2V8.2L12 5.1Zm0 2.4 4.8 2.4v4.8L12 17.1l-4.8-2.4V9.9L12 7.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    n: "03",
    href: "/zh/generate/ai",
    title: "一张照片生成 AI 深度",
    desc: "一张图片就够——AI 估算深度，把照片变成真实的 3D 打印。",
    cta: "从一张照片开始",
    iconWrap:
      "bg-fuchsia-600/10 text-fuchsia-700 group-hover:bg-fuchsia-600 group-hover:text-white",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7">
        <path
          d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm-2.2 4.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Zm4.4 0a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM9.2 14.2c.9 1.2 2 1.8 2.8 1.8s1.9-.6 2.8-1.8l1.5 1.1C15 16.8 13.6 17.8 12 17.8s-3-.9-4.1-2.5l1.3-1.1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    n: "04",
    href: "/zh/generate/sketchfab",
    title: "Sketchfab 链接",
    desc: "粘贴模型链接，把社区场景变成可以下单的真实 3D 打印。",
    cta: "从链接开始",
    iconWrap:
      "bg-amber-600/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7">
        <path
          d="M10.2 13.8 13.8 10.2M8.5 11.2a3 3 0 0 1 0-4.2l1.7-1.7a3 3 0 0 1 4.2 0M15.5 12.8a3 3 0 0 1 0 4.2l-1.7 1.7a3 3 0 0 1-4.2 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function SourcesSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-6 pt-0 md:px-10 md:pb-7 md:pt-0">
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <SectionBadge>制作</SectionBadge>
        <h2 className="max-w-3xl text-3xl font-semibold text-slate-900 md:text-5xl">
          从任何素材开始
        </h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-8 text-slate-600 md:text-[17px]">
          上传照片序列、3D 模型、AI 深度图或 Sketchfab
          场景——我们把它变成真正的 3D 打印，送货上门。
        </p>
      </div>

      <div className="relative z-10 mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sources.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group relative block overflow-hidden rounded-[30px] border border-slate-900/10 bg-white p-8 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-[4px] hover:bg-slate-50 hover:shadow-[0_28px_70px_-54px_rgba(15,23,42,0.18)]"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-colors duration-300 ${s.iconWrap}`}
            >
              {s.icon}
            </div>
            <div className="pointer-events-none absolute end-6 top-5 text-5xl font-black text-slate-900/5">
              {s.n}
            </div>
            <h3 className="mt-6 text-[19px] font-semibold leading-7 text-slate-900">
              {s.title}
            </h3>
            <p className="mt-3 text-[15px] leading-8 text-slate-600">{s.desc}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-cyan-700 transition group-hover:text-cyan-600">
              {s.cta}
              <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
