type SectionBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionBadge({
  children,
  className = "",
}: SectionBadgeProps) {
  return (
    <span
      className={`section-badge inline-flex items-center gap-2 rounded-full border border-[rgba(14,116,144,0.25)] bg-white/85 px-[0.9rem] py-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0e7490] shadow-[0_20px_40px_-32px_rgba(14,116,144,0.18)] ${className}`}
    >
      {children}
    </span>
  );
}
