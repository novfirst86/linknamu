import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-4 py-8 sm:items-center sm:py-12">
      {/* 스마트폰 화면처럼 보이는 반투명 박스 */}
      <div className="relative flex w-full max-w-[400px] flex-col rounded-[2.5rem] border border-white/80 bg-white/35 px-6 pb-12 pt-14 shadow-[0_30px_80px_-20px_rgb(160_80_50/0.35)] ring-1 ring-orange-900/5 backdrop-blur-xl sm:min-h-[780px] sm:px-8">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-4 h-1.5 w-20 -translate-x-1/2 rounded-full bg-stone-800/10"
        />
        {/* 프로필 + 링크 묶음을 박스 세로 중앙보다 살짝 위(시각적 중심)에 둔다 */}
        <div className="flex flex-1 flex-col justify-center gap-12 py-6 sm:pb-16">
          <ProfileHeader profile={profile} />
          <LinkList links={links} />
        </div>
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-stone-800/15"
        />
      </div>
    </main>
  );
}
