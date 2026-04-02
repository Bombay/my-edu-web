import express from 'express';                                                                       
  import postsRouter from './routes/posts';   
  import authRouter from'./routes/auth';                                                         
                                                                                                       
  const app = express();                                                                               
  app.use(express.json());                                                                             
                                                                                                       
  // posts 라우터 연결                                                                                 
  app.use('/api/posts', postsRouter);   
  app.use('/api/auth', authRouter);                                                               
                                                                                                       
  app.listen(3000, () => {                                                                             
    console.log('서버가 http://localhost:3000 에서 실행 중!');                                         
  });                                                                                                  
         