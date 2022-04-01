import 'dotenv/config';
import * as express from 'express';
const port = process.env.PORT ? process.env.PORT: 3000;
const app = express();

app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.listen( port , () =>
    console.log(`listening on port ${port}`),
);
