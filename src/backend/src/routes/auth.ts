import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import db from "../db";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthorizedError, ConflictError } from "../errors";

const router = Router();

// POST /api/auth/register
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, nickname, password } = req.body;

      if (!email || !nickname || !password) {
        throw new BadRequestError(
          "이메일, 닉네임, 비밀번호를 모두 입력해주세요",
        );
      }

      if (!email.includes("@") || !email.includes(".")) {
        throw new BadRequestError("올바른 이메일 형식이 아닙니다");
      }

      if (password.length < 6) {
        throw new BadRequestError("비밀번호는 6자 이상이어야 합니다");
      }

      const existingResult = await db.query(
        "SELECT id FROM users WHERE email = $1",
        [email],
      );
      if (existingResult.rows.length > 0) {
        throw new ConflictError("이미 가입된 이메일입니다");
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      const result = await db.query(
        "INSERT INTO users (email, nickname, password_hash) VALUES ($1, $2, $3) RETURNING id, email, nickname, created_at",
        [email, nickname, passwordHash],
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      next(err);
    }
  },
);

// POST /api/auth/login
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new BadRequestError("이메일과 비밀번호를 입력해주세요");
      }

      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      const user = result.rows[0];
      if (!user) {
        throw new UnauthorizedError("이메일 또는 비밀번호가 틀렸습니다");
      }

      if (!bcrypt.compareSync(password, user.password_hash)) {
        throw new UnauthorizedError("이메일 또는 비밀번호가 틀렸습니다");
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" },
      );

      res.json({
        token,
        user: { id: user.id, email: user.email, nickname: user.nickname },
      });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
