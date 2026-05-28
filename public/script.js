const socket = io();

const username = prompt("Enter your name") || "Anonymous";

socket.emit("join", username);

const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");
const typingDiv = document.getElementById("typing");

/* SEND MESSAGE */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = input.value.trim();

  if (msg === "") return;

  const data = {
    user: username,
    text: msg
  };

  // ADD OWN MESSAGE INSTANTLY
  addMessage(data, true);

  // SEND TO SERVER
  socket.emit("chat message", data);

  // CLEAR INPUT
  input.value = "";

  socket.emit("stop typing");
});

/* RECEIVE MESSAGE */

socket.on("chat message", (data) => {

  // DON'T DUPLICATE OWN MESSAGE
  if (data.user === username) return;

  addMessage(data, false);
});

/* TYPING */

input.addEventListener("input", () => {

  socket.emit("typing", username);

  clearTimeout(window.typingTimeout);

  window.typingTimeout = setTimeout(() => {
    socket.emit("stop typing");
  }, 1000);
});

socket.on("typing", (name) => {
  typingDiv.innerText = `${name} is typing...`;
});

socket.on("stop typing", () => {
  typingDiv.innerText = "";
});

/* MESSAGE FUNCTION */

function addMessage(data, isOwnMessage) {

  const div = document.createElement("div");

  div.classList.add("message");

  if (isOwnMessage) {
    div.classList.add("sent");
  } else {
    div.classList.add("received");
  }

  div.innerHTML = `
    <strong>${data.user}</strong><br>
    ${data.text}
  `;

  messages.appendChild(div);

  messages.scrollTop = messages.scrollHeight;
}