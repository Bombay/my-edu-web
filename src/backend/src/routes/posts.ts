import { Router, Request, Response } from 'express';                                                 
  import db from '../db';   
  import { authMiddleware } from '../middleware/auth';                                                                           
                                                                                                       
  const router = Router();                                                                             
                                                                                                       
  // 글 목록                                                                                           
  router.get('/', (req: Request, res: Response) => {                                                   
      const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();                  
      res.json(posts);                                                                                 
  });                                                                                                  
                                                                                                       
  router.get('/:id', (req: Request, res: Response) => {                                                
      const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(req.params.id);                  
      if (!post) {                                                                                     
          res.status(404).json({ error: '글을 찾을 수 없습니다.'});                                    
          return;                                                                                      
      }                                                                                                
      res.json(post);                                                                                  
  });                                                                                                  
                                                                                                     
  // 글 작성
  router.post('/', authMiddleware, (req: Request, res: Response) => {
      const { title, content } = req.body;                                                     
      const result = db.prepare(                                                                       
        'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)'                                  
      ).run(title, content, req.user!.email);                                                                   
                                                                                                       
      const newPost = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);      
      res.status(201).json(newPost);                                                                   
  });                                                                                                  
                                                                                                       
  // 글 수정 (PATCH - 부분 수정)                                                                       
  router.patch('/:id', authMiddleware, (req: Request, res: Response) => {                                              
      const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);                  
      if (!post) {                                                                                     
          res.status(404).json({ error: '글을 찾을 수 없습니다'});                                     
          return;                                                                                      
      }                                                                                                
      const { title, content } = req.body;                                                             
      db.prepare(                                                                                      
          'UPDATE posts SET title = COALESCE(?, title), content = COALESCE(?, content) WHERE id = ?'   
      ).run(title, content, req.params.id);                                                            
                                                                                                       
      const updated = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);               
      res.json(updated);                                                                               
  });                                                                                                  
                                                                                                       
  // 글 삭제                                                                                           
  router.delete('/:id', authMiddleware, (req: Request, res: Response) => {                                             
      const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);                
      if (!post) {                                                                                     
        res.status(404).json({ error: '글을 찾을 수 없습니다' });                                      
        return;                                                                                        
      }                                                                                                
      db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);                                 
      res.json({ message: '삭제되었습니다' });                                                         
  });                                                                                                  
                                                                                                       
  export default router;  