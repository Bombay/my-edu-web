import Database from 'better-sqlite3';                                                               
  import fs from 'fs';                                                                                 
  import path from 'path';                                                                           
                                                                                                       
  const db = new Database('community.db');                                                             
                                                                                                       
  // WAL 모드: 읽기/쓰기 성능 향상                                                                     
  db.pragma('journal_mode = WAL');                                                                     
  // 외래 키 제약 활성화                                                                               
  db.pragma('foreign_keys = ON');                                                                      
                                                                                                       
  // 마이그레이션 파일들을 순서대로 실행                                                               
  const migrationsDir = path.join(__dirname, 'migrations');                                            
  if (fs.existsSync(migrationsDir)) {                                                                  
    const files = fs.readdirSync(migrationsDir)                                                        
      .filter(f => f.endsWith('.sql'))                                                                 
      .sort();                                                                                         
                                                                                                       
    for (const file of files) {                                                                        
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');                            
      try {                                                                                                                                                                
          db.exec(sql);                                                                                                                                                    
      } catch (err: any) {                                                                                                                                                 
          // "duplicate column" 같은 이미 적용된 마이그레이션은 무시                                                                                                       
          if (!err.message.includes('duplicate column')) {                                                                                                                 
              throw err;                                                                                                                                                   
          }                                                                                                                                                                
      }                                                                                          
    }                                                                                                  
  }                                                                                                  

  export default db;