import express from 'express';
import type  {Application, Request, Response } from 'express'
import  userRouter from './routes/user.routes.js';
const app:Application = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});
app.use("/user", userRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
