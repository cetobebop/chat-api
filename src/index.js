import { createServer } from 'node:http';
import { Server } from 'socket.io';

import app from './app.js';
import { connectDb } from './db.js';
import events from './events/index.js';
import { main } from './init/bot.js';
import {cronjob} from "./utils/cronjob.js";


const server = createServer(app);
const port = process.env.PORT || 3000

const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
      origin: "*"
  }
  
} );



connectDb()
events(io)

cronjob()

main()

server.listen(port, () => {
  console.log('server running at http://localhost:3000');
});