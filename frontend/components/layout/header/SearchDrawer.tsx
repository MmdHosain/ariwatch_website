"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchDrawer({
  isOpen,
  onClose,
  lang,
  dict,
  isFa,
}: {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  dict: any;
  isFa: boolean;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  if (!isOpen) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    onClose();
    router.push(`/${lang}/watches${trimmed ? `?q=${encodeURIComponent(trimmed)}` : ""}`);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={dict.header.search}
        className="w-full max-w-3xl bg-white border border-gray-200 p-6 md:p-8 shadow-2xl"
        dir={isFa ? "rtl" : "ltr"}
        onClick={event => event.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-ariwatch-gray">{dict.header.search}</span>
          <button type="button" onClick={onClose} aria-label="Close search" className="text-2xl leading-none text-gray-500 hover:text-black">×</button>
        </div>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            autoFocus
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={dict.header.searchPlaceholder || "Search models, colours or watch types"}
            className="flex-1 border border-gray-300 px-4 py-3 text-sm outline-none focus:border-ariwatch-black"
          />
          <button type="submit" className="bg-ariwatch-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-ariwatch-red transition-colors">
            {dict.header.search}
          </button>
        </form>
      </div>
    </div>
  );
}
