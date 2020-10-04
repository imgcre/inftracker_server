import Koa from 'koa';
import Router from '@koa/router';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import { AddressInfo } from 'net';
import { RegisterRoutes } from './routes';

//import './db.ts';

const app = new Koa();
const router = new Router();
RegisterRoutes(router);

app.use(logger());
app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(3000, () => {
  console.log(`App running at http://localhost:${(<AddressInfo>server.address()).port}`)
});
