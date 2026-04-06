import { Request, Response, NextFunction } from 'express';                                    
import { AppError } from '../errors';                     
                                                                                                
export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    // 우리가 만든 에러 (AppError)인 경우                                                     
    if (err instanceof AppError) {                                                            
        res.status(err.statusCode).json({ error: err.message });
        return;                                                                               
    }                                                                                         
                                                                                            
    // 예상 못한 에러 (버그, DB 문제 등)                                                      
    console.error('예상치 못한 에러:', err);              
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다' });                         
}                                          