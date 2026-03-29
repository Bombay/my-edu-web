import Database from 'better-sqlite3';

  // 데이터베이스 파일 생성 (없으면 자동 생성)
  const db = new Database('community.db');

  // 1. 테이블 만들기 (CREATE TABLE)
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  console.log('✅ posts 테이블 생성 완료!');

  // 2. 데이터 넣기 (INSERT)
  const insert = db.prepare('INSERT INTO posts (title, content) VALUES (?, ?)');
  insert.run('첫 번째 글', '안녕하세요! SQL로 저장한 글입니다.');
  insert.run('두 번째 글', '데이터베이스 정말 편하네요!');
  insert.run('세 번째 글', '검색도 빠르다고요?');

  console.log('✅ 데이터 3개 추가 완료!');

  // 3. 전체 조회 (SELECT)
  const allPosts = db.prepare('SELECT * FROM posts').all();
  console.log('\n📋 전체 글 목록:');
  console.log(allPosts);

  // 4. 조건 검색 (WHERE)
  const firstPost = db.prepare('SELECT * FROM posts WHERE id = ?').get(1);
  console.log('\n🔍 1번 글:');
  console.log(firstPost);

  // 5. 제목으로 검색 (LIKE)
  const searchResult = db.prepare('SELECT * FROM posts WHERE title LIKE ?').all('%번째%');
  console.log('\n🔍 "번째"가 들어간 글:');
  console.log(searchResult);

  // 글 하나 더 추가
  insert.run('네 번째 글', '내가 직접 추가한 글!');
  // 전체 글 개수 세기
  const count = db.prepare('SELECT COUNT(*) as total FROM posts').get();
  console.log('\n📊 전체 글 개수:', count);

  db.close();