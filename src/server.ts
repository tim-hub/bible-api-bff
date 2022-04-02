import 'dotenv/config';
import * as express from 'express';
import { Request } from 'express';
import { BollsLife } from './provider/BollsLife';
import * as apicache from 'apicache';
import { createClient } from 'redis'

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'app://obsidian.md');
  next();
});

let cache;
if (process.env?.REDIS_PASSWORD && process.env?.REDIS_HOST) {
  cache = apicache.options(
    {
      redisClient: createClient({
          socket: {
            host: process.env.REDIS_HOST,
            port: process.env?.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
          },
          password: process.env.REDIS_PASSWORD,
          username: process.env?.REDIS_USERNAME ? process.env.REDIS_USERNAME : 'default',
        }
      ),
    }
  ).middleware
} else {
  cache = apicache.middleware;
}

const onlyStatus200 = (req, res) => res.statusCode === 200
const cacheSuccesses = cache('300 days', onlyStatus200)

const apiProvider = new BollsLife();

app.get('/bolls-life/:version/:book/:chapter',
  cacheSuccesses,
  async (req: Request, res) => {
    const {version, book, chapter} = req.params;
    try {
      return res.status(200).send(await apiProvider.fetchChapter(version, parseInt(book), parseInt(chapter)));
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);

app.listen(port, () =>
  console.debug(`listening on port ${port}`),
);
