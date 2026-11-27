const items = [
  {
    title: "每件成品都按你的订单单独定制",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-cyan-700">
        <path
          d="m12 2 9 5-9 5-9-5 9-5Zm0 12 9-5 2 1.1L12 16 1 10.1l2-1.1 9 5Zm0 6 9-5 2 1.1L12 22 1 16.1l2-1.1 9 5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "按需生产，通常 1–3 个工作日",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-cyan-700">
        <path
          d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 10.6V7h-2v7h5v-2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "每单通过邮件发送物流信息",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-cyan-700">
        <path
          d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm1.4 2-.4.35L12 13.2 18.999 8.35 18.6 8H5.4ZM19 16V9.55l-6.4 4.55a1 1 0 0 1-1.2 0L5 9.55V16h14Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    title: "损坏或瑕疵？14 天内免费重印或退款",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-cyan-700">
        <path
          d="M12 2 4 5v6c0 5.25 3.4 10.24 8 11 4.6-.76 8-5.75 8-11V5l-8-3Zm4.4 8.6-5.6 5.6-3.2-3.2 1.4-1.4 1.8 1.8 4.2-4.2 1.4 1.4Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function TrustBar() {
  return (
    <section className="px-6 py-2 md:px-10 md:py-3">
      <div className="grid gap-5 rounded-[24px] border border-slate-900/10 bg-white px-6 py-5 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.12)] sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0">{item.icon}</span>
            <p className="text-[13.5px] leading-6 text-slate-600">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
