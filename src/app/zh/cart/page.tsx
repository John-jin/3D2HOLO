import SubpageShell from "@/components/SubpageShell";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "购物车 | 3D2HOLO",
  description: "查看并结算你的 3D 打印订单。",
};

export default function CartPage() {
  return (
    <SubpageShell narrow>
      <div className="rounded-[28px] border border-slate-900/10 bg-white px-6 py-16 text-center shadow-[0_20px_60px_-50px_rgba(15,23,42,0.12)]">
        <h1 className="text-3xl font-semibold text-slate-900">购物车</h1>
        <p className="mt-3 text-[15px] text-slate-600">你的购物车还是空的。</p>
        <Link
          href="/zh/generate/imgs"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-6 text-[14px] font-semibold text-white"
        >
          去制作 →
        </Link>
      </div>
    </SubpageShell>
  );
}
