import express from 'express';
import errorHandler from './errors/handler.js';
import cors from 'cors';
import * as http from 'http';

import 'express-async-errors';

import routes from './routes.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errorHandler);

const server = http.createServer(app);

server.listen(process.env.PORT || 3333);
