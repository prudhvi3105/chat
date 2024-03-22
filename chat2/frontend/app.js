const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
// Function to send a message to the ChatGPT API
async function sendMessageToAPI(message) {
    const response = await fetch("http://localhost:5123/api/chat", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: message,
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

// Function to display a message in the chat
function displayMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Event listener for the send button
sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message) {
        displayMessage(message, true);
        userInput.value = '';
        const response = await sendMessageToAPI(message);
        displayMessage(response);
    }
});