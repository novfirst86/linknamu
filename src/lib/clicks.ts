import { getMongoClient } from "@/lib/mongodb";

const DB_NAME = process.env.MONGODB_DB ?? "linknamu";

type ClickDoc = {
  _id: string;
  count: number;
  updatedAt: Date;
};

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
