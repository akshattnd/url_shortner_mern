import express from 'express';
import type  {Application, Request, Response } from 'express'
import  userRouter from './routes/user.routes.js';
import urlrouter from "./routes/url.routes.js"
import { authMiddlware } from './middleware/auth.middleware.js';
const app:Application = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(authMiddlware)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});
app.use("/user", userRouter)
app.use("/url",urlrouter)
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
