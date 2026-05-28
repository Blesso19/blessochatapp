const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = input.value.trim();

  if (msg === "") return;

  const div = document.createElement("div");

  div.classList.add("message");

  div.innerText = msg;

  messages.appendChild(div);

  messages.scrollTop = messages.scrollHeight;

  input.value = "";
});