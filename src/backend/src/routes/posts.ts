import { Router, Request, Response, NextFunction } from "express";
import db from "../db";
import { authMiddleware } from "../middleware/auth";
import { BadRequestError, NotFoundError } from "../errors";

const router = Router();

// 글 목록 (boardId 쿼리 파라미터 있으면 필터)
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { boardId } = req.query;

    if (boardId) {
      const result = await db.query(
        "SELECT * FROM posts WHERE board_id = $1 ORDER BY created_at DESC",
        [boardId],
      );
      res.json(result.rows);
    } else {
      const result = await db.query(
        "SELECT * FROM posts ORDER BY created_at DESC",
      );
      res.json(result.rows);
    }
  } catch (err) {
    next(err);
  }
});

// 글 상세
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [
      req.params.id,
    ]);
    const post = result.rows[0];
    if (!post) {
      throw new NotFoundError("글을 찾을 수 없습니다");
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// 글 작성
router.post(
  "/",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content, board_id } = req.body;

      if (!title || !content || !board_id) {
        throw new BadRequestError("제목, 내용, 게시판을 모두 입력해주세요");
      }

      const boardResult = await db.query(
        "SELECT id FROM boards WHERE id = $1",
        [board_id],
      );
      if (boardResult.rows.length === 0) {
        throw new NotFoundError("존재하지 않는 게시판입니다");
      }

      const result = await db.query(
        "INSERT INTO posts (title, content, author, board_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, content, req.user!.email, board_id],
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      next(err);
    }
  },
);

// 글 수정
router.patch(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const existingResult = await db.query(
        "SELECT * FROM posts WHERE id = $1",
        [req.params.id],
      );
      if (existingResult.rows.length === 0) {
        throw new NotFoundError("글을 찾을 수 없습니다");
      }

      const { title, content } = req.body;
      const updated = await db.query(
        "UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3 RETURNING *",
        [title ?? null, content ?? null, req.params.id],
      );

      res.json(updated.rows[0]);
    } catch (err) {
      next(err);
    }
  },
);

// 글 삭제
router.delete(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await db.query(
        "DELETE FROM posts WHERE id = $1 RETURNING id",
        [req.params.id],
      );
      if (result.rows.length === 0) {
        throw new NotFoundError("글을 찾을 수 없습니다");
      }
      res.json({ message: "삭제되었습니다" });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
