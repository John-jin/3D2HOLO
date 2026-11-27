import SimpleContentPage from "@/components/SimpleContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "粉丝定制光栅海报与小卡：让喜欢的角色动起来 | 3D2HOLO",
  description:
    "动漫画面、偶像照片和游戏原画，加上真实动效——为粉丝和收藏家。",
};

export default function FansPage() {
  return (
    <SimpleContentPage
      title="你喜欢的角色，动起来"
      description="动漫画面、偶像照片和游戏原画，加上真实动效——做成可收藏的光栅海报与小卡。"
      cta={{ href: "/zh/generate/imgs", label: "开始制作 →" }}
    />
  );
}
