const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function sendMessage() {
  const message = userInput.value;
  const reply = handleWeatherQuestion(message);
  addMessage('user', message);
  addMessage('bot', reply);
  userInput.value = '';
}

function addMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.innerText = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getReply(message) {
  let reply = '';
  const lowerCaseMessage = message.toLowerCase();

  if (lowerCaseMessage.includes('sun') || lowerCaseMessage.includes('hot') || lowerCaseMessage.includes('warm')) {
    reply = 'You should wear a t-shirt and shorts.';
  } else if (lowerCaseMessage.includes('rain') || lowerCaseMessage.includes('drizzle') || lowerCaseMessage.includes('showers')) {
    reply = 'You should wear rain boots and a raincoat.';
  } else if (lowerCaseMessage.includes('cloud') || lowerCaseMessage.includes('overcast') || lowerCaseMessage.includes('partly cloudy')) {
    reply = 'You should wear a light jacket.';
  } else if (lowerCaseMessage.includes('wind') || lowerCaseMessage.includes('breezy') || lowerCaseMessage.includes('gusty')) {
    reply = 'You should wear a windbreaker.';
  } else if (lowerCaseMessage.includes('snow') || lowerCaseMessage.includes('blizzard') || lowerCaseMessage.includes('flurries')) {
    reply = 'You should wear a heavy coat, gloves, and boots.';
  } else if (lowerCaseMessage.includes('cold') || lowerCaseMessage.includes('chilly') || lowerCaseMessage.includes('freezing')) {
    reply = 'You should wear a warm coat and gloves.';
  } else if (lowerCaseMessage.includes('fog') || lowerCaseMessage.includes('hazy')) {
    reply = 'You should wear something warm and keep visibility in mind.';
  } else if (lowerCaseMessage.includes('humid') || lowerCaseMessage.includes('sticky')) {
    reply = 'You should wear lightweight and breathable clothing.';
  } else if (lowerCaseMessage.includes('storm') || lowerCaseMessage.includes('thunder') || lowerCaseMessage.includes('lightning')) {
    reply = 'You should stay indoors and keep safe.';
  } else if (lowerCaseMessage.includes('mild') || lowerCaseMessage.includes('temperate')) {
    reply = 'You can wear something casual, like jeans and a t-shirt.';
  } else if (lowerCaseMessage.includes('drizzle') || lowerCaseMessage.includes('sleet')) {
    reply = 'You might want to carry an umbrella and wear waterproof clothing.';
  } else {
    reply = 'What is the weather like?';
  }
  return reply;
}

function handleWeatherQuestion(message) {
  let reply = '';
  if (message.toLowerCase().includes('hi') || message.toLowerCase().includes('hello')) {
    reply = 'Hello! What is the weather like?';
  } else {
    reply = getReply(message);
  }
  return reply;
}
