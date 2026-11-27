import type { ReactNode } from "react";

export default function SubpageShell({
  children,
  narrow = false,
}: {
  children: ReactNode;
  narrow?: boolean;
}) {
  return (
    <div className="w-full overflow-x-hidden">
      <div
        className={`mx-auto flex w-full flex-col gap-8 pb-12 pt-4 md:gap-10 md:pt-6 ${
          narrow ? "max-w-3xl" : "max-w-7xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
