import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {profile.image ? (
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={144}
          height={144}
          priority
          className="size-32 rounded-full object-cover object-[30%_50%] ring-4 ring-white shadow-lg sm:size-36"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex size-32 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-sky-600 text-5xl font-bold text-white ring-4 ring-white shadow-lg sm:size-36"
        >
          {profile.name.charAt(0)}
        </div>
      )}
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {profile.name}
      </h1>
      <p className="mt-2 text-base text-gray-600">{profile.bio}</p>
    </header>
  );
}
