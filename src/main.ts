import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/posts.route';

function main() {
  const { PORT } = process.env;

  const app = express();

  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use('/posts', router);

  app.listen(Number(PORT), () => {
    console.log(`Server is running on http://localhost:${Number(PORT)}`);
  });
}

main();
