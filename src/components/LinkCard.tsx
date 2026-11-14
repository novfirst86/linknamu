import type { LinkItem } from "@/data/profile";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={`/go/${link.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full items-center justify-center rounded-2xl border border-white/70 bg-white/40 px-5 py-4 font-semibold text-stone-700 shadow-[0_4px_20px_-6px_rgb(160_80_50/0.18)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white/65 hover:text-stone-900 hover:shadow-[0_10px_28px_-8px_rgb(160_80_50/0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 active:translate-y-0"
    >
      <span className="flex items-center gap-2.5">
        <span aria-hidden="true" className="text-lg leading-none">
          {link.emoji}
        </span>
        <span>{link.label}</span>
      </span>
      <span
        aria-hidden="true"
        className="absolute right-5 text-stone-400 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-500"
      >
        ↗
      </span>
    </a>
  );
}
