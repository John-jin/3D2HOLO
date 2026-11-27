import GenerateInfoGrid from "@/components/generate/GenerateInfoGrid";
import ResultPanel from "@/components/generate/ResultPanel";
import UploadDropzone from "@/components/generate/UploadDropzone";
import PageHero from "@/components/PageHero";
import SubpageShell from "@/components/SubpageShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "把 3D 模型变成动态 3D 打印 | 3D2HOLO",
  description:
    "上传 GLB 或 OBJ——内置相机渲染每一个视角，做成模型的真实 3D 打印。",
};

export default function Generate3dPage() {
  return (
    <SubpageShell>
      <PageHero
        title="把 3D 模型变成动态 3D 打印"
        description="上传 GLB 或 OBJ——内置相机渲染每一个视角，做成模型的真实 3D 打印。浏览器里免费设计，下单全球配送。"
        steps={[
          "上传 GLB / OBJ 等 3D 模型文件。",
          "调整相机与视角，实时预览动效。",
          "下单定制真实光栅 3D 打印。",
        ]}
      />
      <UploadDropzone
        label="3D 模型"
        accept=".glb,.gltf,.obj,model/gltf-binary,model/gltf+json"
        hint="点击或拖拽 3D 模型到此区域上传（GLB / OBJ）"
        multiple={false}
      />
      <ResultPanel
        title="模型预览"
        emptyHint="上传 3D 模型后，可在此预览多视角渲染与交错结果。"
      />
      <GenerateInfoGrid
        blocks={[
          {
            title: "What It Does",
            items: [
              "把数字 3D 模型变成手里能倾斜观看的实体光栅打印。",
              "内置相机自动采集多视角，做成动态 3D 效果。",
            ],
          },
          {
            title: "Inputs",
            items: ["GLB / OBJ 等常见模型格式。", "可选相机轨道与打印尺寸。"],
          },
          {
            title: "Outputs",
            items: [
              "多视角交错预览。",
              "可购买的定制 3D 打印成品。",
            ],
          },
        ]}
      />
    </SubpageShell>
  );
}
