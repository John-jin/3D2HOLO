"use client";

import GenerateInfoGrid from "@/components/generate/GenerateInfoGrid";
import ResultPanel from "@/components/generate/ResultPanel";
import PageHero from "@/components/PageHero";
import SubpageShell from "@/components/SubpageShell";
import { useState } from "react";

export default function GenerateSketchfabPage() {
  const [url, setUrl] = useState("");

  return (
    <SubpageShell>
      <PageHero
        title="Sketchfab 转全息图生成器"
        description="粘贴 Sketchfab 模型链接，把社区场景变成可以下单的真实 3D 打印。"
        steps={[
          "粘贴公开的 Sketchfab 模型链接。",
          "预览多视角与动效。",
          "下单定制光栅 3D 打印。",
        ]}
      />

      <section className="rounded-[28px] border border-slate-900/10 bg-white p-5 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.12)] md:p-6">
        <h2 className="text-[15px] font-semibold text-slate-900">
          Sketchfab 链接
        </h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://sketchfab.com/models/..."
            className="h-12 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-[14px] text-slate-800 outline-none ring-cyan-500/30 placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4"
          />
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 text-[14px] font-semibold text-white"
          >
            加载模型
          </button>
        </div>
      </section>

      <ResultPanel
        title="模型预览"
        emptyHint="粘贴 Sketchfab 链接并加载后，可在此预览并生成交错结果。"
      />

      <GenerateInfoGrid
        blocks={[
          {
            title: "What It Does",
            items: [
              "从 Sketchfab 拉取模型视角，做成可下单的真实 3D 打印。",
              "不用自己准备多角度照片序列。",
            ],
          },
          {
            title: "Inputs",
            items: ["公开可访问的 Sketchfab 模型链接。"],
          },
          {
            title: "Outputs",
            items: ["在线预览 + 可定制的光栅 3D 打印。"],
          },
        ]}
      />
    </SubpageShell>
  );
}
