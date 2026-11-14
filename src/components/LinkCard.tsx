import type { LinkItem } from "@/data/profile";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={`/go/${link.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 font-semibold text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400 hover:text-sky-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 active:translate-y-0"
    >
      <span>{link.label}</span>
      <span
        aria-hidden="true"
        className="text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-sky-500"
      >
        ↗
      </span>
    </a>
  );
}
