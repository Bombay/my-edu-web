import Database from 'better-sqlite3';                    
                                                                                                       
  const db = new Database('community.db');
                                                                                                       
  // 기존 테이블 초기화                                     
  db.exec(`DROP TABLE IF EXISTS comments`);
  db.exec(`DROP TABLE IF EXISTS posts`);
  db.exec(`DROP TABLE IF EXISTS users`);
                                                                                                       
  // 테이블 생성
  db.exec(`                                                                                            
    CREATE TABLE users (                                    
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT DEFAULT (datetime('now'))
    )                                                                                                  
  `);
                                                                                                       
  db.exec(`                                                 
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)                                                       
    )
  `);                                                                                                  
                                                            
  db.exec(`
    CREATE TABLE comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      post_id INTEGER NOT NULL,                                                                        
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id),                                                      
      FOREIGN KEY (post_id) REFERENCES posts(id)            
    )
  `);
                                                                                                       
  // 샘플 데이터 넣기
  const insertUser = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');                      
  insertUser.run('김철수', 'chulsoo@email.com');            
  insertUser.run('이영희', 'younghee@email.com');                                                      
  insertUser.run('박민수', 'minsoo@email.com');
                                                                                                       
  const insertPost = db.prepare('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)');
  insertPost.run('맛집 추천', '강남 파스타 맛집 알려드려요', 1);                                       
  insertPost.run('오늘 날씨', '비가 오네요', 1);                                                       
  insertPost.run('질문있어요', 'SQL이 뭔가요?', 2);                                                    
  insertPost.run('안녕하세요', '첫 글입니다!', 3);                                                     
  insertPost.run('두번째 글', '점점 익숙해지네요', 3);                                                 
                                                                                                       
  const insertComment = db.prepare('INSERT INTO comments (content, user_id, post_id) VALUES (?, ?, ?)');                                                                                                
  insertComment.run('맛집 정보 감사해요!', 2, 1);                                                      
  insertComment.run('저도 가봤어요', 3, 1);                                                            
  insertComment.run('우산 챙기세요~', 2, 2);                                                           
  insertComment.run('SQL은 데이터베이스 언어예요', 1, 3);                                              
                                                                                                       
  console.log('✅ 데이터 준비 완료!\n');                                                               
                                                            
 // ========== 여기서부터 SQL 심화 ==========                                                         
                                                            
  // 1. JOIN - 글과 작성자를 함께 조회                                                                 
  console.log('📋 1. JOIN - 글 + 작성자');
  const postsWithAuthor = db.prepare(`                                                                 
    SELECT posts.title, posts.content, users.name AS author 
    FROM posts                                                                                         
    JOIN users ON posts.user_id = users.id                  
  `).all();
  console.log(postsWithAuthor);
                                                                                                       
  // 2. WHERE 조건 심화
  console.log('\n🔍 2. WHERE - 김철수의 글만');                                                        
  const chulsoosPosts = db.prepare(`                        
    SELECT posts.title, users.name AS author                                                           
    FROM posts
    JOIN users ON posts.user_id = users.id                                                             
    WHERE users.name = ?                                    
  `).all('김철수');                                                                                    
  console.log(chulsoosPosts);
                                                                                                       
  // 3. ORDER BY - 정렬                                     
  console.log('\n📊 3. ORDER BY - 최신 글 순서');
  const sortedPosts = db.prepare(`                                                                     
    SELECT title, created_at FROM posts
    ORDER BY created_at DESC                                                                           
  `).all();                                                 
  console.log(sortedPosts);
                                                                                                       
  // 4. COUNT - 개수 세기
  console.log('\n📊 4. COUNT - 전체 글 수');                                                           
  const totalPosts = db.prepare('SELECT COUNT(*) AS total FROM posts').get();                          
  console.log(totalPosts);
                                                                                                       
  // 5. GROUP BY - 유저별 글 개수                                                                      
  console.log('\n📊 5. GROUP BY - 유저별 글 개수');
  const postsByUser = db.prepare(`                                                                     
    SELECT users.name, COUNT(posts.id) AS post_count        
    FROM users                                                                                         
    JOIN posts ON users.id = posts.user_id
    GROUP BY users.id                                                                                  
    ORDER BY post_count DESC                                
  `).all();
  console.log(postsByUser);                                                                            
   
  // 6. JOIN 여러 테이블 - 댓글 + 작성자 + 원글 제목                                                   
  console.log('\n💬 6. 댓글 + 작성자 + 원글');              
  const commentsDetail = db.prepare(`                                                                  
    SELECT comments.content AS comment,                     
           users.name AS commenter,                                                                    
           posts.title AS post_title                                                                   
    FROM comments
    JOIN users ON comments.user_id = users.id                                                          
    JOIN posts ON comments.post_id = posts.id               
  `).all();
  console.log(commentsDetail);
      
  
const commentOverTwo = db.prepare(`
    SELECT posts.title, COUNT(comments.id) AS comment_count                                              
  FROM posts                                                                                           
  JOIN comments ON posts.id = comments.post_id                                                         
  GROUP BY posts.id                                                                                    
  HAVING comment_count >= 2 
    `).all();
    console.log(commentOverTwo);

  db.close();
                 