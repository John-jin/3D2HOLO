import SimpleContentPage from "@/components/SimpleContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "测试素材 | 3D2HOLO",
  description: "测试用图片和模型，方便校准与试用工作流。",
};

const materials = [
  {
    title: "多角度照片序列",
    desc: "用于照片转 3D 打印流程的示例序列。",
  },
  {
    title: "单张人像样例",
    desc: "适合 AI 深度与单张转 3D 打印试用。",
  },
  {
    title: "示例 3D 模型",
    desc: "GLB 样例，用于模型转 3D 打印。",
  },
];

export default function TestMaterialsPage() {
  return (
    <SimpleContentPage
      title="测试素材"
      description="测试用图片和模型，方便你校准光栅流程、试用制作工具。"
      cta={{ href: "/zh/generate/imgs", label: "去制作页试用 →" }}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {materials.map((m) => (
          <article
            key={m.title}
            className="rounded-[24px] border border-slate-900/10 bg-white p-5 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.18)]"
          >
            <h2 className="text-[16px] font-semibold text-slate-900">
              {m.title}
            </h2>
            <p className="mt-2 text-[14px] leading-7 text-slate-600">{m.desc}</p>
          </article>
        ))}
      </div>
    </SimpleContentPage>
  );
}
