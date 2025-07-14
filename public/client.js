const socket = io();

const roomSelect = document.getElementById('room-select');
const chat = document.getElementById('chat');
const roomInput = document.getElementById('room-input');
const joinBtn = document.getElementById('join-btn');
const roomName = document.getElementById('room-name');
const messages = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

let currentRoom = '';

joinBtn.addEventListener('click', () => {
  const room = roomInput.value.trim();
  if (room) {
    socket.emit('joinRoom', room);
    currentRoom = room;
    roomName.textContent = room;
    roomSelect.style.display = 'none';
    chat.style.display = 'block';
    messages.innerHTML = '';
  }
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = messageInput.value.trim();
  if (msg) {
    socket.emit('chatMessage', msg);
    messageInput.value = '';
  }
});

socket.on('message', (data) => {
  const div = document.createElement('div');
  div.textContent = `${data.user === 'system' ? '' : data.user + ': '}${data.text}`;
  if (data.user === 'system') div.classList.add('system');
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}); 