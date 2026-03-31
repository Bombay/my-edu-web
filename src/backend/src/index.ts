import express, { Request, Response } from 'express';
import Database from 'better-sqlite3';

const app = express();
app.use(express.json());

const db = new Database('community.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
  `);

  app.get('/posts', (req: Request, res: Response) => {
    const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
    res.json(posts);
  });

  app.get('/posts/:id', (req: Request, res: Response) => {
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    if (!post) {
      res.status(404).json({ error: '글을 찾을 수 없습니다'});
      return;
    }
    res.json(post);
  })

  app.post('/posts', (req: Request, res: Response) => {
    const { title, content, author } = req.body;
    const result = db.prepare(
      'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)'
    ).run(title, content, author);

    const newPost = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newPost);
  });

app.delete('/posts/:id', (req: Request, res: Response) => {
  const post = db.prepare('SELECT * FROM posts WHERE id= ?').get(req.params.id);
  if (!post) {
    res.status(404).json({error: '글을 찾을 수 없습니다'});
    return;
  }
  db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
  res.json({ message: '삭제완'});
})

  app.listen(3000, () => {
    console.log('서버가 3000에서 실행 중!');
  })