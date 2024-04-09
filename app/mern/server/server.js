import express from "express";
import cors from "cors";
import donations from "./routes/donation_record.js";
import campaigns from "./routes/campaign_record.js";
import users from "./routes/campaign_record.js";
import campaign_messages from "./routes/message_record.js";

import http from 'http';
import { Server } from'socket.io'; 
import redis from 'redis';

const PORT = process.env.PORT || 3000;
const app = express();

 
app.use(cors());
app.use(express.json());
app.use("/api/campaigns", campaigns);
app.use("/api/users", users);
app.use("/api/campaign_messages", campaign_messages);
app.use("/api/donations", donations);


const my_redis_client = redis.createClient({
    socket: {
        host: 'redisdblink',
        port: 6379
    }
});



(async () => {
  await my_redis_client.connect();
  console.log('Connected to Redis');

})();

// start the Express server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});




const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

let messageCount = 0;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    const message = {
      id: `message-${messageCount++}`,
      content: data.content,
      sender: data.sender,
    };

    my_redis_client.publish('group_chat', JSON.stringify(message));
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});