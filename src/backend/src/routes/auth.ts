import { Router, Request, Response } from 'express';                                                 
  import bcrypt from 'bcrypt';                                                                         
  import db from '../db';                                                                              
  import jwt from 'jsonwebtoken';                                                                     
                                                                                                       
  const router = Router();                                                                             
                                                                                                       
  // POST /api/auth/register                                                                           
  router.post('/register', (req: Request, res: Response) => {                                          
      const { email, nickname, password } = req.body;                                                  
                                                                                                       
      // --- 입력 검증 (문지기 역할) ---                                                               
                                                                                                       
      // 1) 필수 항목이 다 있는지                                                                      
      if (!email || !nickname || !password) {                                                          
          res.status(400).json({ error: '이메일, 닉네임, 비밀번호를 모두 입력해주세요' });             
          return;                                                                                      
      }                                                                                                
                                                                                                       
      // 2) 이메일 형식이 맞는지 (간단한 검사)                                                         
      if (!email.includes('@') || !email.includes('.')) {                                              
          res.status(400).json({ error: '올바른 이메일 형식이 아닙니다' });                            
          return;                                                                                      
      }                                                                                                
                                                                                                       
      // 3) 비밀번호가 너무 짧지 않은지                                                                
      if (password.length < 6) {                                                                       
          res.status(400).json({ error: '비밀번호는 6자 이상이어야 합니다' });                         
          return;                                                                                      
      }                                                                                                
                                                                                                       
      // 4) 이미 가입된 이메일인지                                                                     
      const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);                  
      if (existing) {                                                                                  
          res.status(409).json({ error: '이미 가입된 이메일입니다' });                                 
          return;                                                                                      
      }                                                                                                
                                                                                                       
      // --- 검증 통과! 회원 등록 ---                                                                  
                                                                                                       
      // 비밀번호 해싱 (아까 실험한 그것!)                                                             
      const passwordHash = bcrypt.hashSync(password, 10);                                              
                                                                                                       
      const result = db.prepare(                                                                       
          'INSERT INTO users (email, nickname, password_hash) VALUES (?, ?, ?)'                        
      ).run(email, nickname, passwordHash);                                                            
                                                                                                       
      // 응답 (비밀번호는 절대 응답에 포함하지 않는다!)                                                
      const user = db.prepare('SELECT id, email, nickname, created_at FROM users WHERE id = ?')        
          .get(result.lastInsertRowid);                                                                
                                                                                                       
      res.status(201).json(user);                                                                      
  });      
  
  // POST /api/auth/login                                                                              
  router.post('/login', (req: Request, res: Response) => {                                             
    const { email, password } = req.body;                                                            
                                                                                                     
    // 1) 필수 항목 체크                                                                             
    if (!email || !password) {                                                                       
        res.status(400).json({ error: '이메일과 비밀번호를 입력해주세요' });                         
        return;                                                                                      
    }                                                                                                
                                                                                                     
    // 2) 이메일로 유저 찾기                                                                         
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;                
    if (!user) {                                                                                     
        res.status(401).json({ error: '이메일 또는 비밀번호가 틀렸습니다' });                        
        return;                                                                                      
    }                                                                                                
                                                                                                     
    // 3) 비밀번호 비교 (챕터 10에서 배운 compareSync!)                                              
    if (!bcrypt.compareSync(password, user.password_hash)) {                                         
        res.status(401).json({ error: '이메일 또는 비밀번호가 틀렸습니다' });                        
        return;                                                                                      
    }                                                                                                
                                                                                                     
    // 4) JWT 발급 (팔찌 만들기!)                                                                    
    const token = jwt.sign(                                                                          
        { userId: user.id, email: user.email },                                                      
        'my-secret-key',                                                                             
        { expiresIn: '24h' }                                                                         
    );                                                                                               
                                                                                                     
    res.json({                                                                                       
        token,                                                                                     
        user: { id: user.id, email: user.email, nickname: user.nickname }                            
    });                                                                                              
});    
                                                                                                     
  export default router;