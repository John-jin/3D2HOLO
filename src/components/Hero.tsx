"use client";

import Image from "next/image";
import Link from "next/link";
import HeroDepthText from "./HeroDepthText";

const tags = ["3D 宠物照片", "婚纱照片", "宝宝与家庭", "一张照片的礼物"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-6 md:px-10 md:py-7">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-start">
          <div className="space-y-6">
            <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[0.98] text-slate-900 md:text-6xl lg:text-7xl">
              把你的照片，变成
              <HeroDepthText text="会动的 3D 实物照片" />
            </h1>
            <p className="max-w-3xl text-[16px] leading-8 text-slate-600 md:text-[18px]">
              浏览器里免费设计，实时预览 3D
              效果，然后下单定制真实的光栅照片——尺寸自选，配送到家。
            </p>
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-900/10 bg-white px-4 py-1.5 text-[13px] text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/zh/generate/imgs"
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 text-[15px] font-semibold text-white transition hover:-translate-y-[1px] hover:bg-slate-800"
              >
                开始定制
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-4 w-4 rtl:-scale-x-100"
                >
                  <path
                    d="M5 12h14m-5-5 5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </Link>
              <Link
                href="#faq"
                className="inline-flex min-h-[56px] items-center justify-center rounded-2xl border border-slate-900/10 bg-white px-7 text-[15px] font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                如何购买
              </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/images/hero.jpg"
            alt="会动的 3D 实物照片"
            width={1920}
            height={1280}
            priority
            className="h-auto w-full rounded-[24px] border border-slate-900/10 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
