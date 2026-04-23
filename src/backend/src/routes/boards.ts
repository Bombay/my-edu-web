import { Router, Request, Response, NextFunction } from "express";
import db from "../db";
import { authMiddleware } from "../middleware/auth";
import { BadRequestError, NotFoundError, ConflictError } from "../errors";

const router = Router();

// 게시판 목록
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.query("SELECT * FROM boards ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// 게시판 생성 (로그인 필수)
router.post(
  "/",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description } = req.body;

      if (!name) {
        throw new BadRequestError("게시판 이름을 입력해주세요");
      }

      const existingResult = await db.query(
        "SELECT id FROM boards WHERE name = $1",
        [name],
      );
      if (existingResult.rows.length > 0) {
        throw new ConflictError("이미 존재하는 게시판 이름입니다");
      }

      const result = await db.query(
        "INSERT INTO boards (name, description) VALUES ($1, $2) RETURNING *",
        [name, description || null],
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      next(err);
    }
  },
);

// 특정 게시판의 글 목록 (페이지네이션 포함)
router.get(
  "/:id/posts",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const boardId = req.params.id;

      const boardResult = await db.query(
        "SELECT * FROM boards WHERE id = $1",
        [boardId],
      );
      if (boardResult.rows.length === 0) {
        throw new NotFoundError("게시판을 찾을 수 없습니다");
      }

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const countResult = await db.query(
        "SELECT COUNT(*) as total FROM posts WHERE board_id = $1",
        [boardId],
      );
      const total = Number(countResult.rows[0].total);

      const postsResult = await db.query(
        "SELECT * FROM posts WHERE board_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
        [boardId, limit, offset],
      );

      res.json({
        posts: postsResult.rows,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
