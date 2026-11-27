import Link from "next/link";
import HoloPreview from "./HoloPreview";
import SectionBadge from "./SectionBadge";

const bullets = [
  "真实微透镜光场片，出货前逐张检查",
  "尺寸自定：最大 16×11 英寸",
  "线上生成免费——只为打印付费",
];

export default function ProductSection() {
  return (
    <section className="relative px-6 py-6 md:px-10 md:py-7">
      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,42%)]">
        <div className="overflow-hidden py-0 md:px-0">
          <SectionBadge>实物产品</SectionBadge>
          <h2 className="mt-5 text-3xl font-semibold text-slate-900 md:text-5xl">
            拿在手里才会动的真实照片
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-8 text-slate-600 md:text-[17px]">
            每一单都是真正的光场照片——真实微透镜片与高分辨率打印层压而成，每个角度都有光。倾斜时画面会动——不用屏幕、不用电池。
          </p>
          <div className="mt-8 space-y-4">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="mt-1 h-5 w-5 shrink-0 text-cyan-600"
                >
                  <path
                    d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.48 7.83-5.3 6.15a1 1 0 0 1-1.47.05l-2.18-2.18a1 1 0 0 1 1.41-1.41l1.42 1.42 4.58-5.32a1 1 0 0 1 1.54 1.29Z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-[15px] leading-7 text-slate-700">{b}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/zh/generate/3d"
              className="inline-flex min-h-[56px] items-center justify-center rounded-2xl bg-slate-950 px-7 text-[15px] font-semibold text-white transition hover:-translate-y-[1px] hover:bg-slate-800"
            >
              用 3D 模型定制
            </Link>
            <Link
              href="/zh/generate/ai"
              className="inline-flex min-h-[56px] items-center justify-center rounded-2xl border border-slate-900/10 bg-white px-7 text-[15px] font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              用一张照片定制
            </Link>
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <HoloPreview
            alt="Hologram simulation preview"
            fallbackSrc="/images/home-preview/preview_1-fallback.webp"
            videoSrc="/images/home-preview/preview-sequence.webm"
            spriteSheetSrc="/images/home-preview/sprite-sheet.webp"
            frameCount={60}
            spriteColumns={10}
            spriteRows={6}
            fps={25}
            hint="左右倾斜设备或移动鼠标预览"
            className="aspect-[2/1] w-full max-w-[48rem]"
          />
        </div>
      </div>
    </section>
  );
}
