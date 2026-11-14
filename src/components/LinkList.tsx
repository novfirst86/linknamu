"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 보여 준다.
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<Counts>) : null))
      .then((data) => {
        // 응답이 오기 전에 눌린 클릭(+1)은 이미 서버 값에 반영됐을 수 있으므로 서버 값을 기준으로 한다.
        if (data) setCounts(data);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error("[clicks] 클릭 수 불러오기 실패:", error);
      });

    return () => controller.abort();
  }, []);

  // 클릭 수 증가는 /go/[id]가 서버에서 처리하고, 화면 숫자는 바로 1 올려 준다.
  const handleClick = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="flex flex-col gap-3.5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={counts[link.id] ?? 0}
            onOpen={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
