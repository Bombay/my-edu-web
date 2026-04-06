import { Router, Request, Response, NextFunction } from 'express';                            
  import db from '../db';                                                                       
  import { authMiddleware } from '../middleware/auth';                                          
  import { BadRequestError, NotFoundError } from '../errors';                                   
                                                                                                
  const router = Router();                                                                      
                                                                                                
  // 글 목록                                                                                    
  router.get('/', (req: Request, res: Response) => {
      const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();           
      res.json(posts);                                      
  });                                                                                           
   
  // 글 상세                                                                                    
  router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
      try {                                                                                    
          const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
          if (!post) {                                                                          
              throw new NotFoundError('글을 찾을 수 없습니다');
          }                                                                                     
          res.json(post);                                   
      } catch (err) {                                                                          
          next(err);                                                                            
      }
  });                                                                                           
                                                            
  // 글 작성                                                                                   
  router.post('/', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
      try {
          const { title, content, board_id } = req.body;
                                                                                                
          if (!title || !content || !board_id) {
              throw new BadRequestError('제목, 내용, 게시판을 모두 입력해주세요');              
          }                                                 
                                                                                                
          const board = db.prepare('SELECT id FROM boards WHERE id = ?').get(board_id);
          if (!board) {                                                                         
              throw new NotFoundError('존재하지 않는 게시판입니다');
          }                                                                                    
                                                                                                
          const result = db.prepare(
              'INSERT INTO posts (title, content, author, board_id) VALUES (?, ?, ?, ?)'        
          ).run(title, content, req.user!.email, board_id); 
                                                                                                
          const newPost = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);                                                              
          res.status(201).json(newPost);                                                        
      } catch (err) {                                                                          
          next(err);                                                                           
      }
  });

  // 글 수정
  router.patch('/:id', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
      try {                                                                                     
          const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
          if (!post) {                                                                          
              throw new NotFoundError('글을 찾을 수 없습니다');
          }                                                                                     
          const { title, content } = req.body;
          db.prepare(                                                                           
              'UPDATE posts SET title = COALESCE(?, title), content = COALESCE(?, content) WHERE id = ?'                                                                                      
          ).run(title, content, req.params.id);
                                                                                                
          const updated = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);    
          res.json(updated);                                                                   
      } catch (err) {                                                                           
          next(err);                                        
      }                                                                                        
  });

  // 글 삭제
  router.delete('/:id', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
      try {                                                                                     
          const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
          if (!post) {                                                                          
              throw new NotFoundError('글을 찾을 수 없습니다');
          }                                                                                     
          db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
          res.json({ message: '삭제되었습니다' });                                              
      } catch (err) {                                       
          next(err);                                                                           
      }                                                                                         
  });
                                                                                                
  export default router;   