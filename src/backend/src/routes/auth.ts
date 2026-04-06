import { Router, Request, Response, NextFunction } from 'express';
  import bcrypt from 'bcrypt';
  import db from '../db';
  import jwt from 'jsonwebtoken';
  import { BadRequestError, UnauthorizedError, ConflictError } from '../errors';

  const router = Router();

  // POST /api/auth/register
  router.post('/register', (req: Request, res: Response, next: NextFunction) => {
      try {
          const { email, nickname, password } = req.body;

          if (!email || !nickname || !password) {
              throw new BadRequestError('이메일, 닉네임, 비밀번호를 모두 입력해주세요');
          }

          if (!email.includes('@') || !email.includes('.')) {
              throw new BadRequestError('올바른 이메일 형식이 아닙니다');
          }

          if (password.length < 6) {
              throw new BadRequestError('비밀번호는 6자 이상이어야 합니다');
          }

          const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
          if (existing) {
              throw new ConflictError('이미 가입된 이메일입니다');
          }

          const passwordHash = bcrypt.hashSync(password, 10);

          const result = db.prepare(
              'INSERT INTO users (email, nickname, password_hash) VALUES (?, ?, ?)'
          ).run(email, nickname, passwordHash);

          const user = db.prepare('SELECT id, email, nickname, created_at FROM users WHERE id = ?')
              .get(result.lastInsertRowid);

          res.status(201).json(user);
      } catch (err) {
          next(err);
      }
  });

  // POST /api/auth/login
  router.post('/login', (req: Request, res: Response, next: NextFunction) => {
      try {
          const { email, password } = req.body;

          if (!email || !password) {
              throw new BadRequestError('이메일과 비밀번호를 입력해주세요');
          }

          const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
          if (!user) {
              throw new UnauthorizedError('이메일 또는 비밀번호가 틀렸습니다');
          }

          if (!bcrypt.compareSync(password, user.password_hash)) {
              throw new UnauthorizedError('이메일 또는 비밀번호가 틀렸습니다');
          }

          const token = jwt.sign(
              { userId: user.id, email: user.email },
              'my-secret-key',
              { expiresIn: '24h' }
          );

          res.json({
              token,
              user: { id: user.id, email: user.email, nickname: user.nickname }
          });
      } catch (err) {
          next(err);
      }
  });

  export default router;