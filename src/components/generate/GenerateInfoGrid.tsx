type Block = {
  title: string;
  items: string[];
};

export default function GenerateInfoGrid({ blocks }: { blocks: Block[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blocks.map((b) => (
        <section
          key={b.title}
          className="rounded-[24px] border border-slate-900/10 bg-white/80 p-5 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.18)]"
        >
          <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-500">
            {b.title}
          </h2>
          <ul className="mt-3 space-y-2 text-[14px] leading-7 text-slate-600">
            {b.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
