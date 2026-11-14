import Image from "next/image";
import type { Profile } from "@/data/profile";

// 따뜻한 톤의 겹 그림자: 가까운 짙은 그림자 + 멀리 퍼지는 옅은 그림자로 입체감을 준다.
const avatarShadow =
  "shadow-[0_2px_6px_rgb(120_60_30/0.12),0_18px_40px_-8px_rgb(190_90_60/0.35)]";

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
          className={`size-28 rounded-full object-cover object-[30%_50%] ring-4 ring-white/90 sm:size-32 ${avatarShadow}`}
        />
      ) : (
        <div
          aria-hidden="true"
          className={`flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-rose-400 text-4xl font-bold text-white ring-4 ring-white/90 sm:size-32 ${avatarShadow}`}
        >
          {profile.name.charAt(0)}
        </div>
      )}
      <h1 className="mt-7 text-2xl font-bold tracking-tight text-stone-800">
        {profile.name}
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-stone-500">{profile.bio}</p>
    </header>
  );
}
