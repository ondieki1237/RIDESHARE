document.getElementById('sendButton').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('messageInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();

    if (messageText !== '') {
        appendMessage('user', messageText);
        input.value = '';

        // Simulate receiving a message (You can replace this with actual server interaction)
        setTimeout(() => {
            appendMessage('other', 'This is a reply message!');
        }, 1000);
    }
}

function appendMessage(sender, message) {
    const chatWindow = document.getElementById('chat-window');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;

    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
