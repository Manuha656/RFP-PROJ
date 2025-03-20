const chatButton = document.querySelector('.chatbox__button');
const chatContent = document.querySelector('.chatbox__support');
const icons = {
    isClicked: '<img src="./images/icons/chatbox-icon.svg" />',
    isNotClicked: '<img src="./images/icons/chatbox-icon.svg" />'
}
const chatbox = new InteractiveChatbox(chatButton, chatContent, icons);
chatbox.display();
chatbox.toggleIcon(false, chatButton);


async function sendMessage() {
    let userMessage = document.getElementById("user-input").value;
    if (!userMessage.trim()) return;

    let response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
    });

    let data = await response.json();
    document.getElementById("chat-output").innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    document.getElementById("chat-output").innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;

    document.getElementById("user-input").value = "";
}