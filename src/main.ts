import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/posts.route';

function main() {
  const PORT = Number(process.env.PORT) || 3000;

  const app = express();

  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (_, res: express.Response) => {
    res.send('Nothing to see here.');
  });
  app.use('/posts', router);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();
