const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);

  getResponse(input.value);
  
  input.value = '';

  // Simulasi dummy balasan bot (placeholder)
});

async function getResponse(params) {
  const result = await fetch('http://localhost:3000/api/chat', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({prompt: params})
  });

  const response = await result.json()
  
  appendMessage('bot', response.output);
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}