import 'dotenv/config';
import * as express from 'express';
import { Request } from 'express';
import { BollsLife } from './provider/BollsLife';

const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();
const apiProvider = new BollsLife();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'app://obsidian.md');
  next();
});
app.use(express.json());
app.use(express.urlencoded({extended: false}))

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
