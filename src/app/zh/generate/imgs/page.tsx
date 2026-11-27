import ImgsStudio from "@/components/generate/ImgsStudio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "在线把照片变成 3D 全息图片 | 3D2HOLO",
  description:
    "上传你的照片，做成真正的 3D 打印照片。浏览器内免费设计，实时预览 3D 动态效果，下单定制打印送货上门。",
};

export default function GenerateImgsPage() {
  return (
    <div className="w-full">
      {/* SEO / a11y copy — visually hidden like live site */}
      <section className="sr-only">
        <h1>在线把照片变成 3D 全息图片</h1>
        <p>
          上传你的照片，做成真正的 3D
          打印照片。浏览器内免费设计，实时预览 3D
          动态效果，下单定制打印送货上门。
        </p>
        <ol>
          <li>上传你的照片（多角度序列或单张）。</li>
          <li>免费设计：选尺寸、深度和视角，浏览器里实时预览 3D 动态效果。</li>
          <li>下单订购真实的光栅 3D 打印照片，送货上门。</li>
        </ol>
      </section>

      <ImgsStudio />
    </div>
  );
}
