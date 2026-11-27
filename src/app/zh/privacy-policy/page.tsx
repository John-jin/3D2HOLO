import SimpleContentPage from "@/components/SimpleContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策 | 3D2HOLO",
};

export default function PrivacyPage() {
  return (
    <SimpleContentPage
      title="隐私政策"
      description="我们如何收集、使用与保护你的信息。正式隐私政策文本将在此呈现；当前为站点结构占位。"
    />
  );
}
