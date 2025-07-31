const jsonServer = require('json-server');
const auth = require('json-server-auth');
const { v4: uuidv4 } = require('uuid');
import { Request, Response, NextFunction } from 'express';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
server.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST' && req.body && !req.body.id) {
    req.body.id = uuidv4();
  }
  next();
});
server.use(auth);
server.use(router);

server.listen(5001, '0.0.0.0', () => {
  console.log('JSON Server is running on port 5001');
});
