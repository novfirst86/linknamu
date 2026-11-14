import { connection } from "next/server";
import { links } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";

// 모든 링크의 현재 클릭 수를 { [linkId]: count } 형태로 한 번에 돌려준다.
export async function GET() {
  // 빌드 시 미리 렌더링되지 않고, 요청마다 최신 값을 읽도록 한다.
  await connection();

  const counts = await getClickCounts(links.map((link) => link.id));

  if (!counts) {
    return Response.json(
      { error: "클릭 수를 불러올 수 없습니다." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  return Response.json(counts, { headers: { "Cache-Control": "no-store" } });
}
