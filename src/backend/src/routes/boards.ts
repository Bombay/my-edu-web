import { Router, Request, Response, NextFunction } from 'express';                            
import db from '../db';
import { authMiddleware } from '../middleware/auth';                                          
import { BadRequestError, NotFoundError, ConflictError } from '../errors';
                                                                                              
const router = Router();                                                                      
                                                                                              
// 게시판 목록                                            
router.get('/', (req: Request, res: Response) => {                                           
    const boards = db.prepare('SELECT * FROM boards ORDER BY id').all();
    res.json(boards);                                                                         
});
                                                                                              
// 게시판 생성 (로그인 필수)                                                                  
router.post('/', authMiddleware, (req: Request, res: Response, next: NextFunction) => {      
    try {                                                                                     
        const { name, description } = req.body;           
                                                                                             
        if (!name) {                                                                          
            throw new BadRequestError('게시판 이름을 입력해주세요');
        }                                                                                     
                                                          
        const existing = db.prepare('SELECT id FROM boards WHERE name = ?').get(name);       
        if (existing) {
            throw new ConflictError('이미 존재하는 게시판 이름입니다');
        }                                                                                     
 
        const result = db.prepare(                                                            
            'INSERT INTO boards (name, description) VALUES (?, ?)'
        ).run(name, description || null);                                                    
                                                                                              
        const board = db.prepare('SELECT * FROM boards WHERE id = ?').get(result.lastInsertRowid);                                                              
        res.status(201).json(board);                      
    } catch (err) {                                                                          
        next(err);
    }                                                                                         
});
                                                                                              
// 특정 게시판의 글 목록 (페이지네이션 포함!)                                                 
router.get('/:id/posts', (req: Request, res: Response, next: NextFunction) => {              
    try {                                                                                     
        const boardId = req.params.id;                    
                                                                                             
        const board = db.prepare('SELECT * FROM boards WHERE id = ?').get(boardId);           
        if (!board) {
            throw new NotFoundError('게시판을 찾을 수 없습니다');                             
        }                                                 
                                                                                             
        const page = Number(req.query.page) || 1;                                             
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;                                                    
                                                          
        const countResult = db.prepare(                                                       
            'SELECT COUNT(*) as total FROM posts WHERE board_id = ?'
        ).get(boardId) as any;                                                                
        const total = countResult.total;                  
                                                                                              
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
    } catch (err) {
        next(err);
    }
});

export default router;