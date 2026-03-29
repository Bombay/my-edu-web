import express, { Request, Response } from 'express';
const app = express();

interface User {
  name: string;
  age: number;
  email: string;
}

app.get('/', (req: Request, res: Response) => {                                               
  res.send('Hello World!');
});      
app.get('/about', (req: Request, res: Response) => {
  res.send('이것은 나의 첫 번째 서버입니다!');
});
app.get('/users', (req: Request, res: Response) => {
  res.send('사용자 목록 페이지');
});   
app.get('/hello', (req: Request, res: Response) => {
  res.send('안녕하세요!');
});  
app.get('/profile', (req: Request, res: Response) => {
  const user = { name: '정현', age: 25, email: 'junghyun@example.com' };
  res.send(`이름 : ${user.name}, 나이 : ${user.age}, 이메일 : ${user.email}`);
})                                                             
                
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중!');
});                                                                        
   