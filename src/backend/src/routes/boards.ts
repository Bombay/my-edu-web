                                                                                                    
  import { Router, Request, Response } from 'express';                                                 
  import db from '../db';                                                                              
  import { authMiddleware } from '../middleware/auth';                                                 
                                                                                                       
  const router = Router();                                                                           

  // 게시판 목록
  router.get('/', (req: Request, res: Response) => {                                                   
      const boards = db.prepare('SELECT * FROM boards ORDER BY id').all();                             
      res.json(boards);                                                                                
  });                                                                                                  
                                                                                                       
  // 게시판 생성 (로그인 필수)                                                                         
  router.post('/', authMiddleware, (req: Request, res: Response) => {                                  
      const { name, description } = req.body;                                                          
                                                                                                       
      if (!name) {                                                                                     
          res.status(400).json({ error: '게시판 이름을 입력해주세요' });                               
          return;                                                                                      
      }                                                                                              
                                                                                                       
      const existing = db.prepare('SELECT id FROM boards WHERE name = ?').get(name);                   
      if (existing) {                                                                                  
          res.status(409).json({ error: '이미 존재하는 게시판 이름입니다' });                          
          return;                                                                                      
      }                                                                                                
                                                                                                       
      const result = db.prepare(                                                                       
          'INSERT INTO boards (name, description) VALUES (?, ?)'                                     
      ).run(name, description || null);
                                                                                                       
      const board = db.prepare('SELECT * FROM boards WHERE id = ?').get(result.lastInsertRowid);       
      res.status(201).json(board);                                                                     
  });                                                                                                  
                                                                                                       
  // 특정 게시판의 글 목록 (페이지네이션 포함!)                                                        
  router.get('/:id/posts', (req: Request, res: Response) => {                                          
      const boardId = req.params.id;                                                                   
                                                                                                       
      // 게시판 존재 확인                                                                              
      const board = db.prepare('SELECT * FROM boards WHERE id = ?').get(boardId);                      
      if (!board) {                                                                                    
          res.status(404).json({ error: '게시판을 찾을 수 없습니다' });                                
          return;                                                                                      
      }                                                                                                
                                                                                                       
      // 페이지네이션: ?page=1&limit=10                                                                
      const page = Number(req.query.page) || 1;                                                        
      const limit = Number(req.query.limit) || 10;                                                     
      const offset = (page - 1) * limit;                                                               
                                                                                                       
      // 전체 글 수 (총 페이지 계산용)                                                                 
      const countResult = db.prepare(                                                                  
          'SELECT COUNT(*) as total FROM posts WHERE board_id = ?'                                     
      ).get(boardId) as any;                                                                           
      const total = countResult.total;                                                                 
                                                                                                       
      // 해당 페이지의 글 목록                                                                         
      const posts = db.prepare(                                                                        
          'SELECT * FROM posts WHERE board_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'           
      ).all(boardId, limit, offset);                                                                   
                                                                                                       
      res.json({                                                                                       
          posts,                                                                                       
          pagination: {                                                                              
              page,
              limit,
              total,                                                                                   
              totalPages: Math.ceil(total / limit)                                                     
          }                                                                                            
      });                                                                                              
  });                                                                                                  
                                                                                                     
  export default router;
                          