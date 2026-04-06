-- 게시판 테이블                                                                                                                                                             
  CREATE TABLE IF NOT EXISTS boards (                                                                                                                                          
      id INTEGER PRIMARY KEY AUTOINCREMENT,                                                                                                                                    
      name TEXT NOT NULL UNIQUE,                                                                                                                                               
      description TEXT,                                                                                                                                                        
      created_at TEXT DEFAULT (datetime('now'))                                                                                                                                
  );                                                                                                                                                                           
                                                                                                                                                                               
  -- posts 테이블에 board_id 컬럼 추가 (이미 있으면 무시)                                                                                                                      
  ALTER TABLE posts ADD COLUMN board_id INTEGER REFERENCES boards(id);  