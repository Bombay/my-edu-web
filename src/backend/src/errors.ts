export class AppError extends Error {                     
    statusCode: number;                                                                       
 
    constructor(message: string, statusCode: number) {                                        
        super(message);                                   
        this.statusCode = statusCode;                                                        
    }
}                                                                                             
 
// 자주 쓰는 에러를 미리 정의                                                                 
export class BadRequestError extends AppError {           
    constructor(message: string = '잘못된 요청입니다') {                                      
        super(message, 400);
    }                                                                                         
}                                                         
                                                                                             
export class UnauthorizedError extends AppError {                                             
    constructor(message: string = '로그인이 필요합니다') {
        super(message, 401);                                                                  
    }                                                     
}                                                                                            

export class NotFoundError extends AppError {
    constructor(message: string = '리소스를 찾을 수 없습니다') {
        super(message, 404);                                                                  
    }
}                                                                                             
                                                          
export class ConflictError extends AppError {                                                
    constructor(message: string = '이미 존재하는 리소스입니다') {
        super(message, 409);                                                                  
    }
}      