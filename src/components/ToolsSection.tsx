import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import SectionBadge from "./SectionBadge";

const tools = [
  {
    href: "/zh/tools/hologram-video",
    title: "全息动效生成器",
    desc: "免费，无需注册。上传照片，几秒内获得可分享的全息动效视频。",
  },
  {
    href: "/zh/tools/pitch-test",
    title: "光栅间距测试工具",
    desc: "生成柱状透镜线数测试图片",
  },
  {
    href: "/zh/tools/lpi-calculator",
    title: "光栅打印 LPI 计算器",
    desc: "计算光栅打印所需的像素尺寸、单透镜周期可容纳的视图数以及推荐的光栅旋转角度。输入打印尺寸、打印机 DPI、光栅 LPI 和目标视图数。",
  },
];

export default function ToolsSection() {
  return (
    <section className="px-6 pb-6 pt-0 md:px-10 md:pb-7 md:pt-0">
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <SectionBadge>工具</SectionBadge>
        <h2 className="max-w-3xl text-3xl font-semibold text-slate-900 md:text-5xl">
          免费全息工具
        </h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-8 text-slate-600 md:text-[17px]">
          制作全息视频、校准光栅间距或计算打印像素——全部免费，无需注册。
        </p>
      </div>

      <div className="relative z-10 mt-10 grid gap-6 md:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group flex flex-col items-start gap-4 rounded-[24px] border border-slate-900/10 bg-white p-7 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-[4px] hover:border-cyan-200 hover:shadow-[0_28px_70px_-54px_rgba(8,145,178,0.3)]"
          >
            <h3 className="text-[18px] font-semibold text-slate-900">{t.title}</h3>
            <p className="text-[14px] leading-7 text-slate-600">{t.desc}</p>
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-cyan-700 transition group-hover:text-cyan-600">
              <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
