import PageHero from "@/components/PageHero";
import SubpageShell from "@/components/SubpageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "光栅打印 LPI 计算器 | 3D2HOLO",
  description:
    "计算光栅打印所需的像素尺寸、单透镜周期可容纳的视图数以及推荐的光栅旋转角度。",
};

export default function LpiCalculatorPage() {
  return (
    <SubpageShell narrow>
      <PageHero
        title="光栅打印 LPI 计算器"
        description="计算光栅打印所需的像素尺寸、单透镜周期可容纳的视图数以及推荐的光栅旋转角度。输入打印尺寸、打印机 DPI、光栅 LPI 和目标视图数。"
      />
      <form className="grid gap-4 rounded-[28px] border border-slate-900/10 bg-white p-6 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.12)] sm:grid-cols-2">
        {[
          ["打印宽度 (in)", "8"],
          ["打印高度 (in)", "10"],
          ["打印机 DPI", "600"],
          ["光栅 LPI", "60"],
          ["目标视图数", "12"],
        ].map(([label, value]) => (
          <label key={label} className="block text-[14px] font-medium text-slate-700">
            {label}
            <input
              type="number"
              defaultValue={value}
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-cyan-300 focus:ring-4 focus:ring-cyan-500/20"
            />
          </label>
        ))}
        <button
          type="button"
          className="inline-flex h-11 items-center justify-center rounded-full bg-slate-900 text-[14px] font-semibold text-white sm:col-span-2"
        >
          计算
        </button>
      </form>
    </SubpageShell>
  );
}
