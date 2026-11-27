const faqs = [
  {
    q: "光栅照片的 3D 效果是怎么实现的？",
    a: "每张成品都使用真实的光栅镜片——一层细密的柱状微透镜。我们以 60 LPI 将你的设计的多个视角交错印刷，倾斜照片时不同视角依次可见，画面就会动起来或呈现 3D 效果。",
  },
  {
    q: "发货需要多久？",
    a: "每张成品在付款后按需生产。生产通常需要 1–3 个工作日，加上寄送时间（取决于你的地区）。我们会通过邮件发送物流信息。",
  },
  {
    q: "退换政策是什么？",
    a: "由于每张成品都为你的订单单独定制，我们不支持无理由退换。如果收到时损坏或有瑕疵，请在签收后 14 天内联系我们，我们将免费重印或退款。",
  },
  {
    q: "适合当礼物吗？",
    a: "就是为礼物设计的。上传对方喜欢的照片，免费预览 3D 效果，下单全球配送。当对方倾斜照片、画面动起来的那一刻，它就不再是一张普通打印。",
  },
  {
    q: "什么样的照片效果最好？",
    a: "主体清晰、与背景分离明显的照片——宠物照、婚纱照、宝宝照都很好。多角度序列的 3D 动态最强；单张照片也可以，深度效果更柔和。",
  },
  {
    q: "它和 3D 贴纸或光栅卡片有什么区别？",
    a: "有本质区别。那些用的是印刷视差技巧。3D2HOLO 的成品是真正的光场照片——真实微透镜片与高分辨率打印层压，画面从每个观看角度都携带深度和动态。",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="px-6 pb-6 pt-1 md:px-10 md:pb-7 md:pt-1">
      <h2 className="text-center text-3xl font-semibold text-cyan-700 md:text-4xl">
        常见问题
      </h2>
      <div className="mx-auto mt-6 max-w-3xl space-y-6">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-[24px] border border-slate-900/10 bg-white p-6"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
              >
                <path d="m7 10 5 5 5-5H7Z" fill="currentColor" />
              </svg>
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
