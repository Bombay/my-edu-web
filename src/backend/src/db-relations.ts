import Database from 'better-sqlite3';

  const db = new Database('community.db');

  // 기존 테이블 삭제 (새로 설계하니까)
  db.exec(`DROP TABLE IF EXISTS comments`);
  db.exec(`DROP TABLE IF EXISTS posts`);
  db.exec(`DROP TABLE IF EXISTS users`);

  // 1. users 테이블 (회원 명부)
  db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // 2. posts 테이블 (user_id로 작성자 연결)
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

  console.log('✅ users, posts 테이블 생성 완료!');

  // 3. 유저 추가                                                                                                                                        
  const insertUser = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  insertUser.run('김철수', 'chulsoo@email.com');
  insertUser.run('이영희', 'younghee@email.com');

  console.log('✅ 유저 2명 추가!');

  // 4. 글 추가 (user_id로 작성자 연결)
  const insertPost = db.prepare('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)');
  insertPost.run('첫 번째 글', '안녕하세요!', 1);       // 김철수의 글
  insertPost.run('두 번째 글', 'DB 재밌네요!', 1);      // 김철수의 글
  insertPost.run('세 번째 글', '반갑습니다!', 2);        // 이영희의 글

  console.log('✅ 글 3개 추가!');

  // 5. 확인해보기
  const users = db.prepare('SELECT * FROM users').all();
  console.log('\n👤 유저 목록:', users);

  const posts = db.prepare('SELECT * FROM posts').all();
  console.log('\n📋 글 목록:', posts);

  // 6. JOIN 맛보기 - 글과 작성자를 한번에 조회
  const postsWithAuthor = db.prepare(`
    SELECT posts.title, posts.content, users.name AS author
    FROM posts
    JOIN users ON posts.user_id = users.id
  `).all();

  console.log('\n📋 글 + 작성자:');
  console.log(postsWithAuthor);


  db.exec(`
    CREATE TABLE comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        post_id INTEGET NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    )
  `)

  const insertComment = db.prepare('INSERT INTO comments (content, user_id, post_id) VALUES (?, ?, ?)');
  insertComment.run('댓글 1빠', 1, 1);
  insertComment.run('댓글 없어요?', 2, 1);

  const comments = db.prepare("SELECT * FROM comments").all();
  console.log('\n 댓글 목록', comments);


  db.close();
  