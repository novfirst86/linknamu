import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// 개발 모드의 HMR에서 연결이 계속 늘어나지 않도록 전역에 캐시한다.
const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

/** MONGODB_URI가 없으면 null을 반환한다. */
export function getMongoClient(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!globalForMongo.mongoClientPromise) {
    // DB가 응답하지 않아도 링크 이동이 오래 막히지 않도록 연결 대기 시간을 짧게 둔다(기본 30초).
    const promise = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }).connect();
    // 연결에 실패하면 캐시를 비워, 다음 요청에서 다시 연결을 시도한다.
    promise.catch(() => {
      if (globalForMongo.mongoClientPromise === promise) {
        globalForMongo.mongoClientPromise = undefined;
      }
    });
    globalForMongo.mongoClientPromise = promise;
  }
  return globalForMongo.mongoClientPromise;
}
