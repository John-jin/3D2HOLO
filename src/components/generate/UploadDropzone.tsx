"use client";

import { useRef, useState } from "react";

type Props = {
  label?: string;
  accept?: string;
  multiple?: boolean;
  hint: string;
  onFiles?: (files: File[]) => void;
};

export default function UploadDropzone({
  label = "图像",
  accept = "image/*",
  multiple = true,
  hint,
  onFiles,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [names, setNames] = useState<string[]>([]);

  const take = (list: FileList | null) => {
    if (!list?.length) return;
    const files = Array.from(list);
    setNames(files.map((f) => f.name));
    onFiles?.(files);
  };

  return (
    <section className="rounded-[28px] border border-slate-900/10 bg-white p-5 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.12)] md:p-6">
      <h2 className="text-[15px] font-semibold text-slate-900">{label}</h2>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          take(e.dataTransfer.files);
        }}
        className={`mt-4 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[22px] border-2 border-dashed px-6 py-10 text-center transition ${
          dragging
            ? "border-cyan-400 bg-cyan-50/60"
            : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.55)]">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
            <path
              d="M12 16V5m0 0 4 4m-4-4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 16.5V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <p className="mt-4 text-[15px] font-medium text-slate-800">{hint}</p>
        <p className="mt-1 text-[13px] text-slate-500">上传</p>
        {names.length > 0 && (
          <p className="mt-4 max-w-md text-[13px] text-cyan-700">
            已选择 {names.length} 个文件：{names.slice(0, 3).join("、")}
            {names.length > 3 ? "…" : ""}
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => take(e.target.files)}
        />
      </div>
    </section>
  );
}
