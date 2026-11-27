import PageHero from "@/components/PageHero";
import SubpageShell from "@/components/SubpageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "柱状透镜线数测试工具 | 3D2HOLO",
  description: "生成柱状透镜线数测试图片，校准你的光栅材料。",
};

export default function PitchTestPage() {
  return (
    <SubpageShell narrow>
      <PageHero
        title="柱状透镜线数测试工具"
        description="生成柱状透镜线数测试图片，帮助你校准光栅 LPI 与打印对齐。"
      />
      <form className="space-y-4 rounded-[28px] border border-slate-900/10 bg-white p-6 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.12)]">
        <label className="block text-[14px] font-medium text-slate-700">
          目标 LPI
          <input
            type="number"
            defaultValue={60}
            className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20"
          />
        </label>
        <label className="block text-[14px] font-medium text-slate-700">
          打印 DPI
          <input
            type="number"
            defaultValue={600}
            className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20"
          />
        </label>
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-slate-900 text-[14px] font-semibold text-white"
        >
          生成测试图
        </button>
      </form>
    </SubpageShell>
  );
}
