import UploadDropzone from "@/components/generate/UploadDropzone";
import PageHero from "@/components/PageHero";
import SubpageShell from "@/components/SubpageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "全息动效视频生成器 — 让任意照片动起来 | 3D2HOLO",
  description: "免费，无需注册。上传照片，几秒内获得可分享的全息动效视频。",
};

export default function HologramVideoPage() {
  return (
    <SubpageShell>
      <PageHero
        title="全息动效视频生成器 — 让任意照片动起来"
        description="免费，无需注册。上传照片，几秒内获得可分享的全息动效视频。"
      />
      <UploadDropzone
        label="照片"
        hint="点击或拖拽图片到此区域，生成全息动效视频"
        multiple={false}
      />
      <p className="text-center text-[14px] text-slate-500">
        上传后将在此生成可预览、可下载的动效视频（本地预览版）。
      </p>
    </SubpageShell>
  );
}
