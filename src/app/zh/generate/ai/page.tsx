import GenerateInfoGrid from "@/components/generate/GenerateInfoGrid";
import ResultPanel from "@/components/generate/ResultPanel";
import UploadDropzone from "@/components/generate/UploadDropzone";
import PageHero from "@/components/PageHero";
import SubpageShell from "@/components/SubpageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "用 AI 把一张照片变成 3D 打印 | 3D2HOLO",
  description:
    "一张图片就够——AI 估算深度，把照片变成真实的 3D 打印。浏览器里免费预览，再下单定制。",
};

export default function GenerateAiPage() {
  return (
    <SubpageShell>
      <PageHero
        title="一张照片转 3D 打印"
        description="一张图片就够——AI 估算深度，把照片变成真实的 3D 打印。浏览器里免费预览，再下单定制送货上门。"
        steps={[
          "上传一张主体清晰的照片。",
          "AI 生成深度并实时预览 3D 效果。",
          "选尺寸后下单，定制光栅照片寄到你家。",
        ]}
      />
      <UploadDropzone
        label="一张照片"
        hint="点击或拖拽一张图片到此区域上传"
        multiple={false}
      />
      <ResultPanel
        title="AI 深度预览"
        emptyHint="上传一张照片后，AI 会估算深度并生成可预览的 3D 效果。"
      />
      <GenerateInfoGrid
        blocks={[
          {
            title: "What It Does",
            items: [
              "用 AI 从单张照片估计深度，做成倾斜时有立体感的真实 3D 打印。",
              "适合手里只有一张喜欢的照片、又想做成实体礼物的人。",
            ],
          },
          {
            title: "Inputs",
            items: [
              "一张清晰照片，主体与背景分离越明显越好。",
              "可选打印尺寸与观看方向。",
            ],
          },
          {
            title: "Outputs",
            items: [
              "可在浏览器预览的 3D 效果。",
              "可下单的定制光栅 3D 打印照片。",
            ],
          },
        ]}
      />
    </SubpageShell>
  );
}
