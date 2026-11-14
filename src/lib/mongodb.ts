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
    globalForMongo.mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo.mongoClientPromise;
}
