import { getMongoClient } from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DB ?? "linknamu";

type ClickDoc = {
  _id: string;
  count: number;
  updatedAt: Date;
};

/**
 * 여러 링크의 클릭 수를 한 번의 쿼리로 가져온다. 기록이 없는 링크는 0.
 * DB 설정이 없거나 실패하면 null을 반환한다.
 */
export async function getClickCounts(
  linkIds: string[],
): Promise<Record<string, number> | null> {
  const clientPromise = getMongoClient();
  if (!clientPromise) return null;

  try {
    const client = await clientPromise;
    const docs = await client
      .db(DB_NAME)
      .collection<ClickDoc>("clicks")
      .find({ _id: { $in: linkIds } }, { projection: { count: 1 } })
      .toArray();

    const counts = Object.fromEntries(linkIds.map((id) => [id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;
    return counts;
  } catch (error) {
    console.error("[clicks] 클릭 수 조회 실패:", error);
    return null;
  }
}

/** 링크 클릭 수를 1 올린다. DB 설정이 없거나 실패해도 예외를 던지지 않는다. */
export async function recordClick(linkId: string): Promise<void> {
  const clientPromise = getMongoClient();
  if (!clientPromise) return;

  try {
    const client = await clientPromise;
    await client
      .db(DB_NAME)
      .collection<ClickDoc>("clicks")
      .updateOne(
        { _id: linkId },
        { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
        { upsert: true },
      );
  } catch (error) {
    console.error("[clicks] 클릭 수 기록 실패:", error);
  }
}
