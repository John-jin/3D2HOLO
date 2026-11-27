"use client";

export default function ResultPanel({
  title = "交错图像",
  emptyHint,
}: {
  title?: string;
  emptyHint: string;
}) {
  return (
    <section className="rounded-[28px] border border-slate-900/10 bg-white p-5 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.12)] md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled
            className="rounded-full bg-slate-900 px-4 py-2 text-[13px] font-semibold text-white opacity-40"
          >
            {title === "交错图像" ? "交错图像" : "生成预览"}
          </button>
          <button
            type="button"
            disabled
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 opacity-40"
          >
            购买成品
          </button>
          <button
            type="button"
            disabled
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-700 opacity-40"
          >
            加入购物车
          </button>
        </div>
      </div>
      <div
        className="relative mt-4 flex min-h-[280px] items-center justify-center rounded-[22px] border border-slate-200"
        style={{
          backgroundImage:
            "linear-gradient(45deg,#e2e8f0 25%,transparent 25%),linear-gradient(-45deg,#e2e8f0 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e2e8f0 75%),linear-gradient(-45deg,transparent 75%,#e2e8f0 75%)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0,0 10px,10px -10px,-10px 0",
          backgroundColor: "#f8fafc",
        }}
      >
        <p className="max-w-md px-6 text-center text-[14px] leading-7 text-slate-600">
          {emptyHint}
        </p>
      </div>
    </section>
  );
}
