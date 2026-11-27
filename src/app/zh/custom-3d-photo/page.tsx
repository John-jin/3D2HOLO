import SimpleContentPage from "@/components/SimpleContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "定制 3D 照片打印与全息图片：把照片变成真正的 3D 打印 | 3D2HOLO",
  description: "上传多角度序列或单张照片，浏览器里免费设计。",
};

export default function Custom3dPhotoPage() {
  return (
    <SimpleContentPage
      title="把任意照片变成定制 3D 照片打印或全息图片"
      description="上传多角度序列或单张照片，浏览器里免费设计，实时预览后再下单。"
      cta={{ href: "/zh/generate/imgs", label: "开始制作 →" }}
    />
  );
}
