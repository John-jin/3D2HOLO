import SimpleContentPage from "@/components/SimpleContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务条款 | 3D2HOLO",
};

export default function TermsPage() {
  return (
    <SimpleContentPage
      title="服务条款"
      description="使用 3D2HOLO 网站与服务即表示你同意相关服务条款。正式法律文本将在此页面完整呈现；当前为站点结构占位。"
    />
  );
}
