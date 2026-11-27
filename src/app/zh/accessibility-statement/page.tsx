import SimpleContentPage from "@/components/SimpleContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "无障碍声明 | 3D2HOLO",
};

export default function AccessibilityPage() {
  return (
    <SimpleContentPage
      title="无障碍声明"
      description="我们致力于提升网站的可访问性。如在使用中遇到障碍，欢迎通过联系我们反馈。"
    />
  );
}
