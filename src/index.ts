import express from 'express';
import 'dotenv/config';
import userRouter from './api/v1/user/user.router';
import bookRouter from './api/v1/book/book.router';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
