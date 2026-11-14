import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-4 py-10 sm:items-center sm:py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/80 bg-white/60 px-6 py-10 shadow-xl shadow-sky-200/50 backdrop-blur-lg sm:px-8">
        <ProfileHeader profile={profile} />
        <ul className="mt-8 flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.id}>
              <LinkCard link={link} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
