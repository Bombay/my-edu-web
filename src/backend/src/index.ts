import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

interface Post {
  id: number;
  title: string;
  content: string;
}
interface User {
  name: string;
  age: number;
  email: string;
}

// const posts: Post[] =[];
// let nextId = 1;
// // 글 목록 보기
// app.get('/posts', (req: Request, res: Response) => {
//   res.json(posts);
// })
// // 글 추가하기
// app.post('/posts', (req: Request, res: Response) => {
//   const { title, content } = req.body;
//   const newPost: Post = { id: nextId++, title, content };
//   posts.push(newPost);
//   res.json(newPost);
// })

// 파일에서 데이터 읽기
  function loadPosts(): Post[] {
    if (fs.existsSync('data.json')) {                                        
      const data = fs.readFileSync('data.json', 'utf-8');
      return JSON.parse(data);                                               
    }                                                                        
    return [];
  }                                                                          
                                                            
  // 파일에 데이터 쓰기
  function savePosts(posts: Post[]) {
    fs.writeFileSync('data.json', JSON.stringify(posts, null, 2));
  }                                                                          
   
  let posts = loadPosts();                                                   
  let nextId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
                                                                             
  app.get('/posts', (req: Request, res: Response) => {
    res.json(posts);                                                         
  });                                                       

  app.post('/posts', (req: Request, res: Response) => {
    const { title, content } = req.body;
    const newPost: Post = { id: nextId++, title, content };                  
    posts.push(newPost);
    savePosts(posts);  // 파일에 저장!                                       
    res.json(newPost);                                      
  });    

app.get('/', (req: Request, res: Response) => {                                               
  res.send('Hello World!');
});      
app.get('/profile', (req: Request, res: Response) => {
  const user = { name: '정현', age: 25, email: 'junghyun@example.com' };
  res.send(`이름 : ${user.name}, 나이 : ${user.age}, 이메일 : ${user.email}`);
})                                                             
                
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중!');
});                                                                        
   