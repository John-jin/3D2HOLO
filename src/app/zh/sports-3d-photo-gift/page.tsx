import SimpleContentPage from "@/components/SimpleContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "会随走动而变化的海报：运动 & NBA 定制光栅海报 | 3D2HOLO",
  description: "走动时会变化的海报——球馆效果，用你自己的照片。",
};

export default function SportsGiftPage() {
  return (
    <SimpleContentPage
      title="那个瞬间，像直播一样动起来"
      description="走动时会变化的海报——球馆效果，用你自己的运动或 NBA 照片定制。"
      cta={{ href: "/zh/generate/imgs", label: "开始制作 →" }}
    />
  );
}
