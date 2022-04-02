import 'dotenv/config';
import * as express from 'express';
import { Request } from 'express';
import { BollsLife } from './provider/BollsLife';
import compression from 'compression';

const port = 3000;
const app = express();

app.use(compression())
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'app://obsidian.md');
  next();
});

const apiProvider = new BollsLife();

app.get('/bolls-life/:version/:book/:chapter',
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
