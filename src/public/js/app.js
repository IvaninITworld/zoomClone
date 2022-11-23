const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
  console.log("Connected to Server!");
}
socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

// 서버가 잘 열였으면 보내!
// setTimeout(() => {
//   socket.send("Hello from the browser!");
// }, 10000);

function handleSubmit(event) {
  // 초기회 되는 걸 막아주는 작업
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
