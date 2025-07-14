const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    socket.room = room;
    socket.emit('message', { user: 'system', text: `Joined room: ${room}` });
  });

  socket.on('chatMessage', (msg) => {
    if (socket.room) {
      io.to(socket.room).emit('message', { user: socket.id, text: msg });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 