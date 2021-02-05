import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { __prod__ } from './utils/prod';
import { apiLimiter } from './utils/limiter';
import postsRoute from './routes/posts.route';
import loginRoute from './routes/login.route';

function main() {
  const PORT = process.env.PORT || 3000;
  const mongoStore = MongoDBStore(session);

  const storeSession = new mongoStore({
    uri: process.env.DB_URI as string,
    collection: process.env.DB_SESSIONS as string,
    databaseName: process.env.DB_NAME as string,
  });

  // Catch any errors when trying to store the session
  storeSession.on('error', (error) => {
    console.log(error);
  });

  const app = express();

  app.use(
    cors({
      origin: process.env.ORIGIN as string,
    }),
  );
  app.set('trust-proxy', 1);
  app.use(
    session({
      store: storeSession,
      secret: process.env.COOKIE as string,
      name: process.env.COOKIE_NAME,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: !__prod__,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      },
    }),
  );
  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/api', apiLimiter, (_, res: express.Response) => {
    res.send('Nothing to see here.');
  });
  app.use('/api/posts', postsRoute);
  app.use('/api/login', loginRoute);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();
