export default function PageHero({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps?: string[];
}) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-[15px] leading-8 text-slate-600 md:text-[17px]">
        {description}
      </p>
      {steps && steps.length > 0 && (
        <ol className="mx-auto mt-6 max-w-xl space-y-2 text-left text-[14px] leading-7 text-slate-600 md:text-[15px]">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[12px] font-semibold text-white">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}
    </header>
  );
}
