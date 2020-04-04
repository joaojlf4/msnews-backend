import express from 'express';
import cors from 'cors';
import routes from './routes';
import morgan from 'morgan';
import bodyParser from 'body-parser';
const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.REACT_URL,
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(morgan(":method :url :response-time :status"))
app.use(routes);

export default app;