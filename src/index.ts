import express from 'express';
import 'dotenv/config';
import { userRouter } from './api/v1/user/';
import { bookRouter } from './api/v1/book/';
import { authMiddlware, authRouter } from './api/v1/auth/';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  authMiddlware.required.unless({
    path: [
      '/api/v1/auth/login',
      '/api/v1/auth/register',
      '/api/v1/auth/reset-password',
    ],
  }),
);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
