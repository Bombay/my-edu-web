import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase 등 클라우드 PG는 SSL 필수
  ssl: { rejectUnauthorized: false },
});

// 연결 확인 (선택)
pool
  .query("SELECT 1")
  .then(() => {
    console.log("PostgreSQL 연결 성공!");
  })
  .catch((err) => {
    console.error("PostgreSQL 연결 실패:", err.message);
  });

export default pool;
