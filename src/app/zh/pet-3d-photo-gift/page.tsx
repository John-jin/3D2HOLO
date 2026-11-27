import SimpleContentPage from "@/components/SimpleContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "个性化宠物全息照片 | 3D 宠物照片礼物与纪念 | 3D2HOLO",
  description:
    "一张最喜欢的照片就够——AI 把宠物的照片变成会动的 3D 打印。",
};

export default function PetGiftPage() {
  return (
    <SimpleContentPage
      title="让宠物立体地留在眼前"
      description="一张最喜欢的照片就够——AI 把宠物的照片变成会动的 3D 打印。倾斜时画面会动，不用屏幕、不用电池。"
      cta={{ href: "/zh/generate/ai", label: "开始制作 →" }}
    />
  );
}
