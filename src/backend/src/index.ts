import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts";
import authRouter from "./routes/auth";
import boardsRouter from "./routes/boards";
import { errorMiddleware } from "./middleware/error";

const app = express();
app.use(cors());
app.use(express.json());

// 라우터 연결
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);
app.use("/api/boards", boardsRouter);

// 에러 미들웨어 (반드시 라우터보다 아래에!)
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("서버가 http://localhost:3000 에서 실행 중!");
});
