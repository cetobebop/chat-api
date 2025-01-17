import { createServer } from 'node:http';
import { Server } from 'socket.io';

import app from './app.js';
import { connectDb } from './db.js';
import events from './events/index.js';
import { main } from './init/bot.js';
import {cronjob} from "./utils/cronjob.js";

import user from './models/user.js';

// user.deleteMany({nanoId: {$in: ["qk8N4Twl3n5gBuAii2i-J","qk8N4Twl3n5gBuAii2i-Q"]}}).then(res=>{
//   console.log(res)
// })

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
  console.log('server running at ' + port);
});