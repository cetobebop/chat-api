import { createServer } from 'node:http';
import { Server } from 'socket.io';

import app from './app.js';
import { connectDb } from './db.js';
import events from './events/index.js';

import router from './routes/user.js';

const server = createServer(app);

const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
      origin: "http://localhost:9000"
    }
  
} );

connectDb()
events(io)
app.use(router)

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});