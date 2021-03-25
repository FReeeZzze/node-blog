import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import logger from 'morgan';
import header from './middlewares/header'

const PORT = config.get('port') || 5000;
const DB = config.get('db');
const mongoUri = config.get('mongoUri');

import PostController from './controllers/PostController';
const Post = new PostController();

const dev = process.env.NODE_ENV !== 'production';
const app = express();

// middleware
app.use(logger(dev ? 'dev' : 'production'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('uploads'));
app.use(header);

// routes
app.get('/posts', Post.index);
app.post('/posts', Post.create);
app.get('/posts/:id', Post.read);
app.delete('/posts/:id', Post.delete);
app.patch('/posts/:id', Post.update);

async function startServer() {
  try {
    // подключение к базе MongoDB
    await mongoose.connect(
      `${mongoUri}/${DB}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          throw Error(err.message);
        } else {
          console.log(`Подключен к базе Mongodb: ${DB}`);
        }
      }
    );
    // запуск сервера
    app.listen(PORT, () => {
      console.log(`> Сервер стартовал на http://localhost:${PORT}`);
    });
  }catch(e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

startServer();
