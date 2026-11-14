import type { NextRequest } from "next/server";
import { links } from "@/data/profile";
import { recordClick } from "@/lib/clicks";

// 링크 카드는 /go/[id]를 거쳐 이동한다: 클릭 수를 기록한 뒤 실제 URL로 리다이렉트.
export async function GET(_req: NextRequest, ctx: RouteContext<"/go/[id]">) {
  const { id } = await ctx.params;
  const link = links.find((item) => item.id === id);

  if (!link) {
    return new Response("Not Found", { status: 404 });
  }

  await recordClick(link.id);

  return new Response(null, {
    status: 302,
    headers: {
      Location: link.url,
      "Cache-Control": "no-store",
    },
  });
}
