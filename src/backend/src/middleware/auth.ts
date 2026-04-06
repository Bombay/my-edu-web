import { Request, Response, NextFunction } from 'express';
  import jwt from 'jsonwebtoken';

  // req에 user 정보를 담기 위한 타입 확장
  declare global {
      namespace Express {
          interface Request {
              user?: { userId: number; email: string };
          }
      }
  }

  export function authMiddleware(req: Request, res: Response, next: NextFunction) {
      // 1) 헤더에서 토큰 꺼내기
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          res.status(401).json({ error: '로그인이 필요합니다' });
          return;
      }

      // "Bearer eyJhbGci..." 에서 토큰 부분만 추출
      const token = authHeader.split(' ')[1];

      // 2) 토큰 검증
      try {
          const decoded = jwt.verify(token, 'my-secret-key') as { userId: number; email: string
  };
          req.user = decoded;
          next();
      } catch {
          res.status(401).json({ error: '유효하지 않은 토큰입니다' });
      }
  }