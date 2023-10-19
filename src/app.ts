import express from 'express';
import 'dotenv/config';
import userRouter from './api/v1/user/user.router';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
